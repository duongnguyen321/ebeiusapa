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
	funnyMoments,
	memoryCapsules,
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
	answerQuiz: (quizId: string, isCorrect: boolean) => void;
	redeemVoucher: (voucherId: string, password: string) => boolean;
	resetInteraction: () => void;
}

// ==================== CONSTANTS ====================
const SPAWN_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours
const EGG_TTL_MS = 60 * 1000; // 1 minute
const WRONG_ANSWER_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const QUIZ_CHANCE = 0.9; // 90% quiz, 10% funny/memory
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
	const [lastInteractionTime, setLastInteractionTime] = useState(() =>
		loadFromStorage(STORAGE_KEYS.lastInteraction, Date.now())
	);
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

		// Auto-hide after TTL
		const timeout = setTimeout(() => {
			setIsEggVisible(false);
		}, EGG_TTL_MS);

		setEggTimeoutId(timeout);
	}, [isEggVisible, generateRandomPosition]);

	// Hide egg
	const hideEgg = useCallback(() => {
		setIsEggVisible(false);
		if (eggTimeoutId) {
			clearTimeout(eggTimeoutId);
			setEggTimeoutId(null);
		}
	}, [eggTimeoutId]);

	// Get today's quiz or random unanswered quiz
	const getAvailableQuiz = useCallback((): QuizData | null => {
		const today = new Date().toISOString().split('T')[0];

		// First try today's quiz
		const todayQuiz = quizData.find(
			(q) => q.date === today && !answeredQuizIds.includes(q.id)
		);
		if (todayQuiz) return todayQuiz;

		// Then try any unanswered quiz
		const unansweredQuizzes = quizData.filter(
			(q) => !answeredQuizIds.includes(q.id)
		);
		if (unansweredQuizzes.length > 0) {
			return unansweredQuizzes[
				Math.floor(Math.random() * unansweredQuizzes.length)
			];
		}

		return null;
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

	// Answer quiz
	const answerQuiz = useCallback(
		(quizId: string, isCorrect: boolean) => {
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
				setLastInteractionTime(Date.now() - SPAWN_COOLDOWN_MS + WRONG_ANSWER_COOLDOWN_MS);
			}

			closeContentModal();
		},
		[closeContentModal]
	);

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
		unlockedVouchers,
		usedVoucherIds,
		lastInteractionTime,
		answeredQuizIds,
		isOnCooldown,
		spawnEgg,
		hideEgg,
		clickEgg,
		closeContentModal,
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
