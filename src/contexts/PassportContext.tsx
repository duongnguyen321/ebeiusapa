import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';

export type PassportRole = 'anh' | 'em' | null;

export interface PassportMemory {
	id: string;
	note: string;
	rating?: number;
	timestamp: number;
}

export interface PassportState {
	role: PassportRole;
	unlockedStamps: string[];
	completedQuests: string[];
	memories: PassportMemory[];
	theme: 'pink' | 'blue';
}

interface PassportContextType {
	role: PassportRole;
	theme: 'pink' | 'blue';
	unlockedStamps: string[];
	completedQuests: string[];
	memories: PassportMemory[];
	setRole: (role: PassportRole) => void;
	completeQuest: (questId: string) => void;
	unlockStamp: (stampId: string) => void;
	addMemory: (note: string, rating?: number) => void;
	isQuestCompleted: (questId: string) => boolean;
	isStampUnlocked: (stampId: string) => boolean;
	resetPassport: () => void;
}

const STORAGE_KEY = 'sapa_passport_data_v1';

const defaultState: PassportState = {
	role: null,
	unlockedStamps: [],
	completedQuests: [],
	memories: [],
	theme: 'pink',
};

const PassportContext = createContext<PassportContextType | null>(null);

export function PassportProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<PassportState>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
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
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state]);

	const setRole = useCallback((role: PassportRole) => {
		setState((prev) => ({
			...prev,
			role,
			theme: role === 'anh' ? 'blue' : 'pink',
		}));
	}, []);

	const completeQuest = useCallback((questId: string) => {
		setState((prev) => ({
			...prev,
			completedQuests: prev.completedQuests.includes(questId)
				? prev.completedQuests
				: [...prev.completedQuests, questId],
		}));
	}, []);

	const unlockStamp = useCallback((stampId: string) => {
		setState((prev) => ({
			...prev,
			unlockedStamps: prev.unlockedStamps.includes(stampId)
				? prev.unlockedStamps
				: [...prev.unlockedStamps, stampId],
		}));
	}, []);

	const addMemory = useCallback((note: string, rating?: number) => {
		const memory: PassportMemory = {
			id: `memory_${Date.now()}`,
			note,
			rating,
			timestamp: Date.now(),
		};
		setState((prev) => ({
			...prev,
			memories: [...prev.memories, memory],
		}));
	}, []);

	const isQuestCompleted = useCallback(
		(questId: string) => state.completedQuests.includes(questId),
		[state.completedQuests]
	);

	const isStampUnlocked = useCallback(
		(stampId: string) => state.unlockedStamps.includes(stampId),
		[state.unlockedStamps]
	);

	const resetPassport = useCallback(() => {
		setState(defaultState);
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	return (
		<PassportContext.Provider
			value={{
				role: state.role,
				theme: state.theme,
				unlockedStamps: state.unlockedStamps,
				completedQuests: state.completedQuests,
				memories: state.memories,
				setRole,
				completeQuest,
				unlockStamp,
				addMemory,
				isQuestCompleted,
				isStampUnlocked,
				resetPassport,
			}}
		>
			{children}
		</PassportContext.Provider>
	);
}

export function usePassport() {
	const context = useContext(PassportContext);
	if (!context) {
		throw new Error('usePassport must be used within a PassportProvider');
	}
	return context;
}
