import type { VoucherId } from '@/data/vouchers';

// ============================================
// GLOBAL ROLE TYPES
// ============================================

export type GlobalRole = 'anh' | 'em';

export interface GlobalRoleState {
	role: GlobalRole | null;
	selectedAt: number | null;
}

// ============================================
// MOOD TYPES
// ============================================

export type MoodType = 'romantic' | 'naughty' | 'playful';

export interface MoodState {
	currentMood: MoodType | null;
	lastCheckedDate: string | null; // "2026-01-15" format for daily reset
}

// ============================================
// QUEST TYPES
// ============================================

export type QuestType = 'photo' | 'journal' | 'service' | 'sensual';
export type QuestStatus = 'locked' | 'available' | 'completed' | 'expired';

export interface DailyQuest {
	id: string;
	dayId: number;

	// Timing
	triggerType: 'time' | 'activity';
	triggerTime?: string; // "14:00" for time-based
	triggerAfterActivity?: string; // Reference to TimelineItem
	expiresAt: 'next_activity' | 'end_of_day';

	// Content
	questType: QuestType;
	titleAnh: string;
	titleEm: string;
	descriptionAnh: string;
	descriptionEm: string;

	// Filtering
	allowedMoods?: MoodType[]; // null = all moods
	minSpicyLevel?: 1 | 2 | 3;
	timeRestriction?: 'after_20:00' | 'private_room';

	// Reward - using VoucherId from central registry
	rewardAnh: VoucherId; // Voucher when Anh completes quest
	rewardEm: VoucherId; // Voucher when Em completes quest
}

export interface QuestProgress {
	questId: string;
	status: QuestStatus;
	completedAt?: number;
	journalEntry?: string; // For journal quests
	voiceNoteId?: string; // For voice notes
}

export interface DailyQuestState {
	progress: Record<string, QuestProgress>;
	currentDayId: number;
}
