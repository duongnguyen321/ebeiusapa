import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface SurpriseState {
	unlockedLetters: number[];
	scratchCardUsedDates: string[];
	birthdayCelebrationShown: boolean;
	secretNotesUnlocked: string[];
}

interface SurpriseContextType extends SurpriseState {
	unlockLetter: (index: number) => void;
	markScratchCardUsed: (date: string) => void;
	markBirthdayCelebrationShown: () => void;
	unlockSecretNote: (id: string) => void;
	isLetterUnlocked: (index: number) => boolean;
	canScratchToday: () => boolean;
	isSecretNoteUnlocked: (id: string) => boolean;
	getLetterUnlockTime: (index: number) => Date;
	canUnlockLetter: (index: number) => boolean;
}

const STORAGE_KEY = 'sapa-surprise-state';

// Letters unlock at 8:00 AM each day
const LETTER_UNLOCK_TIMES = [
	new Date('2026-01-15T08:00:00+07:00'), // Day 1
	new Date('2026-01-16T08:00:00+07:00'), // Day 2 (Birthday!)
	new Date('2026-01-17T08:00:00+07:00'), // Day 3
	new Date('2026-01-18T08:00:00+07:00'), // Day 4
];

const SurpriseContext = createContext<SurpriseContextType | null>(null);

function loadState(): SurpriseState {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.warn('Failed to load surprise state:', e);
	}
	return {
		unlockedLetters: [],
		scratchCardUsedDates: [],
		birthdayCelebrationShown: false,
		secretNotesUnlocked: [],
	};
}

function saveState(state: SurpriseState) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.warn('Failed to save surprise state:', e);
	}
}

export function SurpriseProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<SurpriseState>(loadState);

	// Persist state changes
	useEffect(() => {
		saveState(state);
	}, [state]);

	const unlockLetter = (index: number) => {
		if (!state.unlockedLetters.includes(index)) {
			setState((prev) => ({
				...prev,
				unlockedLetters: [...prev.unlockedLetters, index],
			}));
		}
	};

	const markScratchCardUsed = (date: string) => {
		if (!state.scratchCardUsedDates.includes(date)) {
			setState((prev) => ({
				...prev,
				scratchCardUsedDates: [...prev.scratchCardUsedDates, date],
			}));
		}
	};

	const markBirthdayCelebrationShown = () => {
		setState((prev) => ({
			...prev,
			birthdayCelebrationShown: true,
		}));
	};

	const unlockSecretNote = (id: string) => {
		if (!state.secretNotesUnlocked.includes(id)) {
			setState((prev) => ({
				...prev,
				secretNotesUnlocked: [...prev.secretNotesUnlocked, id],
			}));
		}
	};

	const isLetterUnlocked = (index: number) => {
		return state.unlockedLetters.includes(index);
	};

	const canScratchToday = () => {
		const today = new Date().toISOString().split('T')[0];
		return !state.scratchCardUsedDates.includes(today);
	};

	const isSecretNoteUnlocked = (id: string) => {
		return state.secretNotesUnlocked.includes(id);
	};

	const getLetterUnlockTime = (index: number) => {
		return LETTER_UNLOCK_TIMES[index] || new Date(0);
	};

	const canUnlockLetter = (index: number) => {
		const now = new Date();
		return now >= LETTER_UNLOCK_TIMES[index];
	};

	const value: SurpriseContextType = {
		...state,
		unlockLetter,
		markScratchCardUsed,
		markBirthdayCelebrationShown,
		unlockSecretNote,
		isLetterUnlocked,
		canScratchToday,
		isSecretNoteUnlocked,
		getLetterUnlockTime,
		canUnlockLetter,
	};

	return (
		<SurpriseContext.Provider value={value}>
			{children}
		</SurpriseContext.Provider>
	);
}

export function useSurprise() {
	const context = useContext(SurpriseContext);
	if (!context) {
		throw new Error('useSurprise must be used within a SurpriseProvider');
	}
	return context;
}
