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
import type {
	DailyQuest,
	QuestProgress,
	QuestStatus,
	DailyQuestState,
	MoodType,
} from '@/types/quest';
import { allDailyQuests, getQuestsForDay } from '@/data/dailyQuests';
import { useMood } from './MoodContext';

// ============================================
// CONTEXT TYPE
// ============================================

interface DailyQuestContextType {
	// Current state
	currentDayId: number;
	questProgress: Record<string, QuestProgress>;

	// Available quests (filtered by day, time, mood)
	availableQuests: DailyQuest[];
	completedQuests: DailyQuest[];
	expiredQuests: DailyQuest[];

	// Actions
	setCurrentDay: (dayId: number) => void;
	completeQuest: (questId: string, journalEntry?: string) => void;
	expireQuest: (questId: string) => void;
	getQuestStatus: (questId: string) => QuestStatus;
	resetQuests: () => void;
}

// ============================================
// DEFAULT STATE
// ============================================

const defaultState: DailyQuestState = {
	progress: {},
	currentDayId: 1,
};

// ============================================
// CONTEXT
// ============================================

const DailyQuestContext = createContext<DailyQuestContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function DailyQuestProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<DailyQuestState>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEYS.DAILY_QUEST.PROGRESS);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch {
			// Ignore parse errors
		}
		return defaultState;
	});

	const { currentMood } = useMood();

	// Persist to localStorage
	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.DAILY_QUEST.PROGRESS,
			JSON.stringify(state)
		);
	}, [state]);

	// Get quest status helper
	const getQuestStatus = useCallback(
		(questId: string): QuestStatus => {
			const progress = state.progress[questId];
			if (!progress) return 'available';
			return progress.status;
		},
		[state.progress]
	);

	// Set current day
	const setCurrentDay = useCallback((dayId: number) => {
		setState((prev) => ({
			...prev,
			currentDayId: dayId,
		}));
	}, []);

	// Complete a quest
	const completeQuest = useCallback(
		(questId: string, journalEntry?: string) => {
			setState((prev) => ({
				...prev,
				progress: {
					...prev.progress,
					[questId]: {
						questId,
						status: 'completed',
						completedAt: Date.now(),
						journalEntry,
					},
				},
			}));
		},
		[]
	);

	// Expire a quest
	const expireQuest = useCallback((questId: string) => {
		setState((prev) => ({
			...prev,
			progress: {
				...prev.progress,
				[questId]: {
					questId,
					status: 'expired',
				},
			},
		}));
	}, []);

	// Reset all quests
	const resetQuests = useCallback(() => {
		setState(defaultState);
		localStorage.removeItem(STORAGE_KEYS.DAILY_QUEST.PROGRESS);
	}, []);

	// Filter quests based on mood
	const filterByMood = useCallback(
		(quest: DailyQuest): boolean => {
			if (!quest.allowedMoods) return true;
			if (!currentMood) return true;
			return quest.allowedMoods.includes(currentMood);
		},
		[currentMood]
	);

	// Computed values
	const { availableQuests, completedQuests, expiredQuests } = useMemo(() => {
		const dayQuests = getQuestsForDay(state.currentDayId);

		const available: DailyQuest[] = [];
		const completed: DailyQuest[] = [];
		const expired: DailyQuest[] = [];

		dayQuests.forEach((quest) => {
			const status = getQuestStatus(quest.id);
			const moodAllowed = filterByMood(quest);

			if (status === 'completed') {
				completed.push(quest);
			} else if (status === 'expired') {
				expired.push(quest);
			} else if (moodAllowed) {
				available.push(quest);
			}
		});

		return { availableQuests: available, completedQuests: completed, expiredQuests: expired };
	}, [state.currentDayId, state.progress, getQuestStatus, filterByMood]);

	return (
		<DailyQuestContext.Provider
			value={{
				currentDayId: state.currentDayId,
				questProgress: state.progress,
				availableQuests,
				completedQuests,
				expiredQuests,
				setCurrentDay,
				completeQuest,
				expireQuest,
				getQuestStatus,
				resetQuests,
			}}
		>
			{children}
		</DailyQuestContext.Provider>
	);
}

// ============================================
// HOOK
// ============================================

export function useDailyQuest() {
	const context = useContext(DailyQuestContext);
	if (!context) {
		throw new Error('useDailyQuest must be used within a DailyQuestProvider');
	}
	return context;
}
