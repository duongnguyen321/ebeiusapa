import { useState, useEffect, useCallback, useMemo } from 'react';
import {
	LiquidTask,
	liquidTasksAnh,
	liquidRewardsEm,
	LIQUID_THEMES,
	TimeOfDay,
	LiquidTheme,
} from '@/data/liquidLuck';

import { STORAGE_KEYS } from '@/config/storage';

// const STORAGE_KEY = 'sapa_liquid_luck_v1'; // Removed


interface LiquidLuckState {
	role: 'anh' | 'em' | null;
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
			return JSON.parse(stored);
		}
	} catch (e) {
		console.warn('Failed to load liquid luck state:', e);
	}
	return {
		role: null,
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
	const [state, setState] = useState<LiquidLuckState>(loadState);
	const [currentTask, setCurrentTask] = useState<LiquidTask | null>(null);
	const [isMixing, setIsMixing] = useState(false);
	const [isRevealing, setIsRevealing] = useState(false);

	// Persist state changes
	useEffect(() => {
		saveState(state);
	}, [state]);

	const theme: LiquidTheme | null = useMemo(() => {
		if (!state.role) return null;
		return LIQUID_THEMES[state.role];
	}, [state.role]);

	const setRole = useCallback((role: 'anh' | 'em') => {
		setState((prev) => ({
			...prev,
			role,
		}));
	}, []);

	const resetRole = useCallback(() => {
		setState({
			role: null,
			history: [],
			lastDrawAt: 0,
		});
		setCurrentTask(null);
		setIsMixing(false);
		setIsRevealing(false);
	}, []);

	// Get filtered task pool based on role and time of day
	const getFilteredPool = useCallback((): LiquidTask[] => {
		const timeOfDay = getTimeOfDay();
		const pool = state.role === 'anh' ? liquidTasksAnh : liquidRewardsEm;

		// Filter by time of day (if specified)
		return pool.filter((task) => {
			// If no timeOfDay restriction, allow all
			if (!task.timeOfDay || task.timeOfDay.length === 0) return true;
			return task.timeOfDay.includes(timeOfDay);
		});
	}, [state.role]);

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

		// Rigged logic:
		// Anh: 70% dare, 30% double trouble (spicy)
		// Em: 70% reward, 30% lucky (spicy)
		const random = Math.random();
		const isSpicyRoll = random > 0.7;
		const timeOfDay = getTimeOfDay();
		const isLateNight = timeOfDay === 'late_night';

		// Higher spicy chance at late_night
		const spicyChance = isLateNight ? 0.5 : 0.3;

		let weightedPool: LiquidTask[];

		if (state.role === 'anh') {
			// Anh gets mostly dares
			if (Math.random() < spicyChance) {
				// Pick spicy tasks if available
				const spicyTasks = availablePool.filter((t) => t.type === 'spicy');
				weightedPool = spicyTasks.length > 0 ? spicyTasks : availablePool;
			} else {
				// Regular dares
				const dareTasks = availablePool.filter((t) => t.type === 'dare');
				weightedPool = dareTasks.length > 0 ? dareTasks : availablePool;
			}
		} else {
			// Em gets mostly rewards
			if (Math.random() < spicyChance) {
				// Pick spicy tasks if available
				const spicyTasks = availablePool.filter((t) => t.type === 'spicy');
				weightedPool = spicyTasks.length > 0 ? spicyTasks : availablePool;
			} else {
				// Regular rewards
				const rewardTasks = availablePool.filter((t) => t.type === 'reward');
				weightedPool = rewardTasks.length > 0 ? rewardTasks : availablePool;
			}
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
	}, [getFilteredPool, state.role, state.history]);

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
		role: state.role,
		theme,
		currentTask,
		isMixing,
		isRevealing,
		setRole,
		resetRole,
		startMixing,
		completeMixing,
		closeReveal,
		getTimeOfDay,
	};
}
