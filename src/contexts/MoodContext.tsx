import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
	useMemo,
} from 'react';
import { STORAGE_KEYS } from '@/config/storage';
import type { MoodType, MoodState } from '@/types/quest';

// ============================================
// CONTEXT TYPE
// ============================================

interface MoodContextType {
	currentMood: MoodType | null;
	lastCheckedDate: string | null;
	setMood: (mood: MoodType) => void;
	shouldShowMoodCheckin: boolean;
	clearMood: () => void;
}

// ============================================
// HELPERS
// ============================================

function getTodayDateString(): string {
	return new Date().toISOString().split('T')[0]; // "2026-01-15"
}

// ============================================
// DEFAULT STATE
// ============================================

const defaultState: MoodState = {
	currentMood: null,
	lastCheckedDate: null,
};

// ============================================
// CONTEXT
// ============================================

const MoodContext = createContext<MoodContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function MoodProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<MoodState>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEYS.MOOD.STATE);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch {
			// Ignore parse errors
		}
		return defaultState;
	});

	// Persist to localStorage
	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.MOOD.STATE, JSON.stringify(state));
	}, [state]);

	const setMood = useCallback((mood: MoodType) => {
		const today = getTodayDateString();
		setState({
			currentMood: mood,
			lastCheckedDate: today,
		});
	}, []);

	const clearMood = useCallback(() => {
		setState(defaultState);
	}, []);

	// Check if user needs to do mood check-in today
	const shouldShowMoodCheckin = useMemo(() => {
		const today = getTodayDateString();
		return state.lastCheckedDate !== today;
	}, [state.lastCheckedDate]);

	return (
		<MoodContext.Provider
			value={{
				currentMood: state.currentMood,
				lastCheckedDate: state.lastCheckedDate,
				setMood,
				shouldShowMoodCheckin,
				clearMood,
			}}
		>
			{children}
		</MoodContext.Provider>
	);
}

// ============================================
// HOOK
// ============================================

export function useMood() {
	const context = useContext(MoodContext);
	if (!context) {
		throw new Error('useMood must be used within a MoodProvider');
	}
	return context;
}
