import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
import {
	quizData,
	getRandomFunnyMoment,
	getRandomMemoryCapsule,
	type QuizData,
	type FunnyMomentData,
	type MemoryCapsuleData,
	type VoucherReward,
} from '@/data/easterEggs';

// ==================== TYPES ====================
type EggContentType = 'quiz' | 'funny' | 'memory';

interface EggContent {
	type: EggContentType;
	quiz?: QuizData;
	funny?: FunnyMomentData;
	memory?: MemoryCapsuleData;
}

interface EasterEggState {
	// Egg visibility & position
	isEggVisible: boolean;
	eggPosition: { top: number; left: number };

	// Content when egg is clicked
	currentContent: EggContent | null;
	showContentModal: boolean;

	// Voucher Redeem Modal State (Global)
	redeemVoucherState: VoucherReward | null;

	// Wallet state
	unlockedVouchers: VoucherReward[];
	usedVoucherIds: string[];

	// Cooldown & tracking
	lastInteractionTime: number;
	answeredQuizIds: string[];
	isOnCooldown: boolean;
}

interface EasterEggContextType extends EasterEggState {
	// Actions
	spawnEgg: () => void;
	hideEgg: () => void;
	clickEgg: () => void;
	closeContentModal: () => void;
	openRedeemModal: (voucher: VoucherReward) => void;
	closeRedeemModal: () => void;
	answerQuiz: (quizId: string, isCorrect: boolean) => void;
	redeemVoucher: (voucherId: string, password: string) => boolean;
	resetInteraction: () => void;
}

// ==================== CONSTANTS ====================
const IS_DEV = import.meta.env.DEV;

// Development vs Production timing
const SPAWN_COOLDOWN_MS = IS_DEV ? 5 * 1000 : 90 * 1000; // 5s (Dev) vs 1.5mins (Prod)
const WRONG_ANSWER_COOLDOWN_MS = IS_DEV ? 10 * 1000 : 120 * 1000; // 10s (Dev) vs 2m (Prod) // Changed to 2m as requested

const QUIZ_CHANCE = 0.5; // 50% quiz, 50% funny/memory
const REDEEM_PASSWORD = '16012005';

const STORAGE_KEYS = {
	lastInteraction: 'easter_egg_last_interaction',
	unlockedVouchers: 'easter_egg_unlocked_vouchers',
	usedVouchers: 'easter_egg_used_vouchers',
	answeredQuizzes: 'easter_egg_answered_quizzes',
};

// ==================== CONTEXT ====================
const EasterEggContext = createContext<EasterEggContextType | null>(null);

export function useEasterEgg() {
	const context = useContext(EasterEggContext);
	if (!context) {
		throw new Error('useEasterEgg must be used within an EasterEggProvider');
	}
	return context;
}

// ==================== PROVIDER ====================
export function EasterEggProvider({ children }: { children: React.ReactNode }) {
	// Load persisted state
	const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
		try {
			const stored = localStorage.getItem(key);
			return stored ? JSON.parse(stored) : defaultValue;
		} catch {
			return defaultValue;
		}
	};

	const [isEggVisible, setIsEggVisible] = useState(false);
	const [eggPosition, setEggPosition] = useState({ top: 50, left: 50 });
	const [currentContent, setCurrentContent] = useState<EggContent | null>(null);
	const [showContentModal, setShowContentModal] = useState(false);

	// Redeem Modal State
	const [redeemVoucherState, setRedeemVoucherState] =
		useState<VoucherReward | null>(null);

	const [lastInteractionTime, setLastInteractionTime] = useState(() => {
		const stored = loadFromStorage(STORAGE_KEYS.lastInteraction, Date.now());
		const timeSince = Date.now() - stored;

		// If user was offline for a long time (> cooldown),
		// reset time to give a 10s grace period before spawning
		// instead of spawning instantly on mount.
		if (timeSince > SPAWN_COOLDOWN_MS) {
			return Date.now() - SPAWN_COOLDOWN_MS + 10000;
		}
		return stored;
	});
	const [unlockedVouchers, setUnlockedVouchers] = useState<VoucherReward[]>(
		() => loadFromStorage(STORAGE_KEYS.unlockedVouchers, [])
	);
	const [usedVoucherIds, setUsedVoucherIds] = useState<string[]>(() =>
		loadFromStorage(STORAGE_KEYS.usedVouchers, [])
	);
	const [answeredQuizIds, setAnsweredQuizIds] = useState<string[]>(() =>
		loadFromStorage(STORAGE_KEYS.answeredQuizzes, [])
	);
	const [eggTimeoutId, setEggTimeoutId] = useState<NodeJS.Timeout | null>(null);

	// Persist state changes
	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.lastInteraction,
			JSON.stringify(lastInteractionTime)
		);
	}, [lastInteractionTime]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.unlockedVouchers,
			JSON.stringify(unlockedVouchers)
		);
	}, [unlockedVouchers]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.usedVouchers,
			JSON.stringify(usedVoucherIds)
		);
	}, [usedVoucherIds]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.answeredQuizzes,
			JSON.stringify(answeredQuizIds)
		);
	}, [answeredQuizIds]);

	// Check if on cooldown
	const isOnCooldown = useMemo(() => {
		const timeSinceLastInteraction = Date.now() - lastInteractionTime;
		return timeSinceLastInteraction < SPAWN_COOLDOWN_MS;
	}, [lastInteractionTime]);

	// Generate random position (avoiding header and navbar)
	const generateRandomPosition = useCallback(() => {
		const top = 15 + Math.random() * 60; // 15% - 75% from top
		const left = 10 + Math.random() * 80; // 10% - 90% from left
		return { top, left };
	}, []);

	// Spawn egg
	const spawnEgg = useCallback(() => {
		if (isEggVisible) return;

		setEggPosition(generateRandomPosition());
		setIsEggVisible(true);
		// Removed auto-hide TTL
	}, [isEggVisible, generateRandomPosition]);

	// Hide egg
	const hideEgg = useCallback(() => {
		setIsEggVisible(false);
	}, []);

	// Get today's quiz or random unanswered quiz (past or generic only)
	const getAvailableQuiz = useCallback((): QuizData | null => {
		const today = new Date().toISOString().split('T')[0];

		// 1. Filter out FUTURE quizzes (strict date check)
		// We only want quizzes where date is undefined (generic) OR date <= today
		const validQuizzes = quizData.filter((q) => {
			if (!q.date) return true; // Generic quiz -> OK
			return q.date <= today; // Past or Today -> OK
		});

		// 2. Filter out already answered ones
		const unansweredValidQuizzes = validQuizzes.filter(
			(q) => !answeredQuizIds.includes(q.id)
		);

		if (unansweredValidQuizzes.length === 0) return null;

		// 3. Priority: Today's Quiz
		const todayQuiz = unansweredValidQuizzes.find((q) => q.date === today);
		if (todayQuiz) return todayQuiz;

		// 4. Fallback: Any other valid (past/generic) quiz
		return unansweredValidQuizzes[
			Math.floor(Math.random() * unansweredValidQuizzes.length)
		];
	}, [answeredQuizIds]);

	// Click egg - determine content
	const clickEgg = useCallback(() => {
		hideEgg();

		const random = Math.random();

		if (random < QUIZ_CHANCE) {
			// 90% - Quiz
			const quiz = getAvailableQuiz();
			if (quiz) {
				setCurrentContent({ type: 'quiz', quiz });
				setShowContentModal(true);
				return;
			}
		}

		// 10% or no quiz available - Funny/Memory
		if (Math.random() < 0.5) {
			setCurrentContent({ type: 'funny', funny: getRandomFunnyMoment() });
		} else {
			setCurrentContent({ type: 'memory', memory: getRandomMemoryCapsule() });
		}
		setShowContentModal(true);
	}, [hideEgg, getAvailableQuiz]);

	// Close content modal
	const closeContentModal = useCallback(() => {
		setShowContentModal(false);
		setCurrentContent(null);
		setLastInteractionTime(Date.now());
	}, []);

	// Global Redeem Modal Actions
	const openRedeemModal = useCallback((voucher: VoucherReward) => {
		setRedeemVoucherState(voucher);
	}, []);

	const closeRedeemModal = useCallback(() => {
		setRedeemVoucherState(null);
	}, []);

	// Answer quiz
	const answerQuiz = useCallback((quizId: string, isCorrect: boolean) => {
		setAnsweredQuizIds((prev) => [...prev, quizId]);

		if (isCorrect) {
			// Add reward to wallet
			const quiz = quizData.find((q) => q.id === quizId);
			if (quiz?.reward) {
				setUnlockedVouchers((prev) => {
					// Don't add duplicate
					if (prev.some((v) => v.id === quiz.reward.id)) return prev;
					return [...prev, { ...quiz.reward, isRedeemed: true }];
				});
			}
		} else {
			// Wrong answer - set cooldown
			setLastInteractionTime(
				Date.now() - SPAWN_COOLDOWN_MS + WRONG_ANSWER_COOLDOWN_MS
			);
		}

		// Removed closeContentModal to allow manual closing
	}, []);

	// Redeem voucher
	const redeemVoucher = useCallback(
		(voucherId: string, password: string): boolean => {
			if (password !== REDEEM_PASSWORD) return false;

			setUsedVoucherIds((prev) => {
				if (prev.includes(voucherId)) return prev;
				return [...prev, voucherId];
			});

			return true;
		},
		[]
	);

	// Reset interaction (for testing)
	const resetInteraction = useCallback(() => {
		setLastInteractionTime(Date.now() - SPAWN_COOLDOWN_MS - 1000);
	}, []);

	// Spawn timer - check every minute
	useEffect(() => {
		const checkAndSpawn = () => {
			const timeSinceLastInteraction = Date.now() - lastInteractionTime;
			if (timeSinceLastInteraction >= SPAWN_COOLDOWN_MS && !isEggVisible) {
				spawnEgg();
			}
		};

		// Initial check
		checkAndSpawn();

		// Check every minute
		const interval = setInterval(checkAndSpawn, 60 * 1000);

		return () => clearInterval(interval);
	}, [lastInteractionTime, isEggVisible, spawnEgg]);

	const value: EasterEggContextType = {
		isEggVisible,
		eggPosition,
		currentContent,
		showContentModal,
		redeemVoucherState,
		unlockedVouchers,
		usedVoucherIds,
		lastInteractionTime,
		answeredQuizIds,
		isOnCooldown,
		spawnEgg,
		hideEgg,
		clickEgg,
		closeContentModal,
		openRedeemModal,
		closeRedeemModal,
		answerQuiz,
		redeemVoucher,
		resetInteraction,
	};

	return (
		<EasterEggContext.Provider value={value}>
			{children}
		</EasterEggContext.Provider>
	);
}
