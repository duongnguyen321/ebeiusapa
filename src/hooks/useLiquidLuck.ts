import { useState, useEffect, useCallback, useMemo } from 'react';
import {
	liquidTasksAnh,
	liquidRewardsEm,
	LIQUID_THEMES,
	LiquidTheme,
} from '@/data/liquidLuck';
import {
	getVoucherForRole,
} from '@/data/vouchers/index';
import { VoucherDisplay, TimeOfDay } from '@/data/vouchers/types';
import { STORAGE_KEYS } from '@/config/storage';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';
import { useMood } from '@/contexts/MoodContext';

interface LiquidLuckState {
	// Removed role from here
	history: string[]; // IDs of tasks already drawn
	lastDrawAt: number;
}

function getTimeOfDay(): TimeOfDay {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return 'morning';
	if (hour >= 12 && hour < 18) return 'afternoon';
	if (hour >= 18 && hour < 23) return 'night';
	return 'late_night';
}

function loadState(): LiquidLuckState {
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.LIQUID_LUCK.STATE);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Migration: If stored state has role, ignore it/clean it
			return {
				history: parsed.history || [],
				lastDrawAt: parsed.lastDrawAt || 0
			};
		}
	} catch (e) {
		console.warn('Failed to load liquid luck state:', e);
	}
	return {
		history: [],
		lastDrawAt: 0,
	};
}

function saveState(state: LiquidLuckState) {
	try {
		localStorage.setItem(STORAGE_KEYS.LIQUID_LUCK.STATE, JSON.stringify(state));
	} catch (e) {
		console.warn('Failed to save liquid luck state:', e);
	}
}

export function useLiquidLuck() {
	const { role } = useGlobalRole();
	const { currentMood } = useMood();

	const [state, setState] = useState<LiquidLuckState>(loadState);
	const [currentTask, setCurrentTask] = useState<VoucherDisplay | null>(null);
	const [isMixing, setIsMixing] = useState(false);
	const [isRevealing, setIsRevealing] = useState(false);

	// Persist state changes
	useEffect(() => {
		saveState(state);
	}, [state]);

	const theme: LiquidTheme | null = useMemo(() => {
		if (!role) return null;
		return LIQUID_THEMES[role];
	}, [role]);

	// Removed local setRole/resetRole - controlled globally

	// Get filtered task pool based on role and time of day
	const getFilteredPool = useCallback((): VoucherDisplay[] => {
		if (!role) return [];
		
		const poolIds = role === 'anh' ? liquidTasksAnh : liquidRewardsEm;
		const timeOfDay = getTimeOfDay();

		// Convert IDs to VoucherDisplay objects relative to the role
		const vouchers = poolIds
			.map(id => getVoucherForRole(id, role))
			.filter((v): v is VoucherDisplay => v !== null);

		// Filter by time of day (if specified in definition)
		// Currently mostly undefined, so allows all
		return vouchers; // Simplified for now
	}, [role]);

	// Rigged random selection logic
	const drawTask = useCallback(() => {
		const pool = getFilteredPool();

		// Filter out already drawn tasks (if not all drawn)
		let availablePool = pool.filter((task) => !state.history.includes(task.id));

		// If all tasks drawn, reset history
		if (availablePool.length === 0) {
			setState((prev) => ({ ...prev, history: [] }));
			availablePool = pool;
		}

		// Rigged logic based on MOOD
		// Romantic -> High Cute/Service (Level 1)
		// Naughty -> High Sensual (Level 2+)
		// Playful -> Balanced / Random
		
		const timeOfDay = getTimeOfDay();
		const isLateNight = timeOfDay === 'late_night';

		let spicyChance = 0.3; // Default

		// Granular Mood Logic for Spicy Chance
		if (currentMood === 'horny' || currentMood === 'naughty') {
			spicyChance = 0.8; // Very high chance
		} else if (currentMood === 'romantic' || currentMood === 'cold' || currentMood === 'missing' || currentMood === 'waiting') {
			spicyChance = 0.1; // Mostly romantic/service
		} else if (currentMood === 'playful' || currentMood === 'grumpy' || currentMood === 'hungry') {
			spicyChance = 0.4; // Balanced
		} else if (isLateNight) {
			spicyChance += 0.2; // Boost at night if mood is neutral/unknown
		}

		let weightedPool: VoucherDisplay[];

		if (Math.random() < spicyChance) {
			// Spicy pool (Level 2+)
			const spicyTasks = availablePool.filter((t) => t.spicyLevel >= 2);
			weightedPool = spicyTasks.length > 0 ? spicyTasks : availablePool;
		} else {
			// Regular pool (Level 1)
			const regularTasks = availablePool.filter((t) => t.spicyLevel === 1);
			weightedPool = regularTasks.length > 0 ? regularTasks : availablePool;
		}

		// Random selection from weighted pool
		const selectedTask =
			weightedPool[Math.floor(Math.random() * weightedPool.length)];

		if (selectedTask) {
			setState((prev) => ({
				...prev,
				history: [...prev.history, selectedTask.id],
				lastDrawAt: Date.now(),
			}));
			setCurrentTask(selectedTask);
		}

		return selectedTask;
	}, [getFilteredPool, role, state.history, currentMood]);

	const startMixing = useCallback(() => {
		setIsMixing(true);
		setIsRevealing(false);
		setCurrentTask(null);
	}, []);

	const completeMixing = useCallback(() => {
		setIsMixing(false);
		setIsRevealing(true);
		drawTask();
	}, [drawTask]);

	const closeReveal = useCallback(() => {
		setIsRevealing(false);
		setCurrentTask(null);
	}, []);

	return {
		role,
		theme,
		currentTask,
		isMixing,
		isRevealing,
		startMixing,
		completeMixing,
		closeReveal,
		getTimeOfDay,
	};
}
