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
} from '@/data/easterEggs';
import type { VoucherReward } from '@/types/game';
import { isRestricted } from '@/lib/restriction';
import { createVoucherReward } from '@/data/vouchers';
import type { GlobalRole } from '@/types/quest';
import { useGlobalRole } from './GlobalRoleContext';
import { useMood } from './MoodContext';

// ==================== TYPES ====================
type EggContentType = 'quiz' | 'funny' | 'memory' | 'liquid_luck';

interface EggContent {
	type: EggContentType;
	quiz?: QuizData;
	funny?: FunnyMomentData;
	memory?: MemoryCapsuleData;
	// No data needed for liquid luck, just the type
}

// ==================== CONSTANTS ====================
// (Moved CONSTLANTS from below if needed, or just let them be)
// Actually, CONSTANTS are at line 140.
// I will just remove the ghost block.

// ==================== CONTENT SELECTION LOGIC ====================
const getEggProbabilities = (mood: string | null) => {
	switch (mood) {
		// Playful Group
		case 'playful':
		case 'hungry':
		case 'chill':
		case 'grumpy':
			return { quiz: 0.3, liquid: 0.4, funny: 0.2, memory: 0.1 };

		// Naughty Group
		case 'naughty':
		case 'horny':
			return { quiz: 0.1, liquid: 0.6, funny: 0.2, memory: 0.1 };

		// Romantic Group
		case 'romantic':
		case 'happy':
		case 'missing':
		case 'waiting':
		case 'cold':
			return { quiz: 0.4, liquid: 0.1, funny: 0.1, memory: 0.4 };

		default: // null or unknown
			return { quiz: 0.5, liquid: 0.1, funny: 0.2, memory: 0.2 };
	}
};

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
	unlockVoucher: (voucher: VoucherReward) => void;
	resetInteraction: () => void;
}

// ==================== CONSTANTS ====================
const IS_DEV = import.meta.env.DEV;

// Development vs Production timing
const SPAWN_COOLDOWN_MS = IS_DEV ? 5 * 1000 : 90 * 1000; // 5s (Dev) vs 1.5mins (Prod)
const WRONG_ANSWER_COOLDOWN_MS = IS_DEV ? 10 * 1000 : 120 * 1000; // 10s (Dev) vs 2m (Prod) // Changed to 2m as requested

const QUIZ_CHANCE = 0.5; // 50% quiz, 50% funny/memory
const REDEEM_PASSWORD = '16012005';

import { STORAGE_KEYS } from '@/config/storage'; // Import centralized keys

// REMOVED local STORAGE_KEYS definition

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
	const { currentMood } = useMood();

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
		const stored = loadFromStorage(
			STORAGE_KEYS.EASTER_EGG.LAST_INTERACTION,
			Date.now()
		);

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
		() => loadFromStorage(STORAGE_KEYS.EASTER_EGG.UNLOCKED_VOUCHERS, [])
	);
	const [usedVoucherIds, setUsedVoucherIds] = useState<string[]>(() =>
		loadFromStorage(STORAGE_KEYS.EASTER_EGG.USED_VOUCHERS, [])
	);
	const [answeredQuizIds, setAnsweredQuizIds] = useState<string[]>(() =>
		loadFromStorage(STORAGE_KEYS.EASTER_EGG.ANSWERED_QUIZZES, [])
	);

	// Persist state changes
	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.EASTER_EGG.LAST_INTERACTION,
			JSON.stringify(lastInteractionTime)
		);
	}, [lastInteractionTime]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.EASTER_EGG.UNLOCKED_VOUCHERS,
			JSON.stringify(unlockedVouchers)
		);
	}, [unlockedVouchers]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.EASTER_EGG.USED_VOUCHERS,
			JSON.stringify(usedVoucherIds)
		);
	}, [usedVoucherIds]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.EASTER_EGG.ANSWERED_QUIZZES,
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
		if (isRestricted()) return; // Restriction check

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
		const probs = getEggProbabilities(currentMood);

		// Cumulative probability thresholds
		const quizThreshold = probs.quiz;
		const liquidThreshold = quizThreshold + probs.liquid;
		const funnyThreshold = liquidThreshold + probs.funny;

		// 1. Try Quiz (Priority if available)
		if (random < quizThreshold) {
			const quiz = getAvailableQuiz();
			if (quiz) {
				setCurrentContent({ type: 'quiz', quiz });
				setShowContentModal(true);
				return;
			}
			// Fallthrough: If quiz selected but none available, treat as non-quiz roll
		}

		// 2. Try Liquid Luck
		// Note check against threshold OR fallback from quiz
		if (random < liquidThreshold || random < quizThreshold) {
			// If we fell through quiz (random < quizThreshold but no quiz), we come here.
			// But we need to be careful not to over-index Liquid Luck.
			// Actually, if no quiz, we should re-roll or redistribute.
			// Simple fallback: If no quiz, try Liquid Luck.
			setCurrentContent({ type: 'liquid_luck' });
			setShowContentModal(true);
			return;
		}

		// 3. Try Funny / Memory
		if (random < funnyThreshold) {
			setCurrentContent({ type: 'funny', funny: getRandomFunnyMoment() });
		} else {
			setCurrentContent({ type: 'memory', memory: getRandomMemoryCapsule() });
		}
		setShowContentModal(true);
	}, [hideEgg, getAvailableQuiz, currentMood]);

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
	const { role } = useGlobalRole();

	const answerQuiz = useCallback((quizId: string, isCorrect: boolean) => {
		setAnsweredQuizIds((prev) => [...prev, quizId]);

		if (isCorrect) {
			// Add reward to wallet
			const quiz = quizData.find((q) => q.id === quizId);
			if (quiz) {
				// Get current role from context
				const currentRole = role || 'em';
				const rewardId = currentRole === 'anh' ? quiz.rewardAnh : quiz.rewardEm;

				const voucher = createVoucherReward(rewardId, currentRole);

				if (voucher) {
					setUnlockedVouchers((prev) => {
						// Don't add duplicate
						if (prev.some((v) => v.id === voucher.id)) return prev;
						return [...prev, { ...voucher, isRedeemed: true }];
					});
				}
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

			// CRITICAL FIX: Also update the unlockedVouchers list to reflect 'isUsed'
			// This ensures localStorage 'egg_unlocked_vouchers' shows the change
			setUnlockedVouchers((prev) =>
				prev.map((v) =>
					v.id === voucherId ? { ...v, isUsed: true, usedAt: Date.now() } : v
				)
			);

			return true;
		},
		[]
	);

	// Reset interaction (for testing)
	const resetInteraction = useCallback(() => {
		setLastInteractionTime(Date.now() - SPAWN_COOLDOWN_MS - 1000);
	}, []);

	// Unlock voucher manually (e.g. from Passport)
	const unlockVoucher = useCallback((voucher: VoucherReward) => {
		setUnlockedVouchers((prev) => {
			if (prev.some((v) => v.id === voucher.id)) return prev;
			return [...prev, { ...voucher, isRedeemed: true }]; // Mark as collected/redeemed
		});
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

	const value = useMemo<EasterEggContextType>(
		() => ({
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
			unlockVoucher,
			resetInteraction,
		}),
		[
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
			unlockVoucher,
			resetInteraction,
		]
	);

	return (
		<EasterEggContext.Provider value={value}>
			{children}
		</EasterEggContext.Provider>
	);
}
