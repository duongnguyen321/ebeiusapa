import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import { useGlobalRole } from './GlobalRoleContext';

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

import { STORAGE_KEYS } from '@/config/storage';

// const STORAGE_KEY = 'sapa_passport_data_v1'; // Removed


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
			const saved = localStorage.getItem(STORAGE_KEYS.PASSPORT.DATA);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch {
			// Ignore parse errors
		}
		return defaultState;
	});

	// Consumer of Global Role
	const { role: globalRole, setRole: setGlobalRole } = useGlobalRole();

	useEffect(() => {
		const stateToSave = {
			unlockedStamps: state.unlockedStamps,
			completedQuests: state.completedQuests,
			memories: state.memories,
		};
		localStorage.setItem(STORAGE_KEYS.PASSPORT.DATA, JSON.stringify(stateToSave));
	}, [state]);

	const setRole = useCallback((role: PassportRole) => {
		if (role) {
			setGlobalRole(role);
		}
	}, [setGlobalRole]);

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
		localStorage.removeItem(STORAGE_KEYS.PASSPORT.DATA);
	}, []);

	// Derived state
	const currentRole = globalRole;
	const currentTheme = currentRole === 'anh' ? 'blue' : 'pink';

	return (
		<PassportContext.Provider
			value={{
				role: currentRole as PassportRole,
				theme: currentTheme,
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
