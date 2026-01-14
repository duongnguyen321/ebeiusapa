/**
 * Centralized configuration for storage keys
 * Used to avoid magic strings and ensure consistency across the app
 */
export const PREFIX_STORAGE_VERSION = 'sapa_V2';

export const STORAGE_KEYS = {
  TRIP: {
    UNLOCKED: `${PREFIX_STORAGE_VERSION}_trip_unlocked`,
  },
  BUDGET: {
    STATE: `${PREFIX_STORAGE_VERSION}_budget_state`,
  },
  PASSPORT: {
    DATA: `${PREFIX_STORAGE_VERSION}_passport_data`,
  },
  SURPRISE: {
    STATE: `${PREFIX_STORAGE_VERSION}_surprise-state`,
  },
  LIQUID_LUCK: {
    STATE: `${PREFIX_STORAGE_VERSION}_liquid_luck`,
  },
  NOTIFICATIONS: {
    SCHEDULED: `${PREFIX_STORAGE_VERSION}_notifications_scheduled`,
  },
  PACKING_LIST: {
    CHECKED: `${PREFIX_STORAGE_VERSION}_packing_list_checked`,
  },
  EASTER_EGG: {
    LAST_INTERACTION: `${PREFIX_STORAGE_VERSION}_easter_egg_last_interaction`,
    UNLOCKED_VOUCHERS: `${PREFIX_STORAGE_VERSION}_easter_egg_unlocked_vouchers`,
    USED_VOUCHERS: `${PREFIX_STORAGE_VERSION}_easter_egg_used_vouchers`,
    ANSWERED_QUIZZES: `${PREFIX_STORAGE_VERSION}_easter_egg_answered_quizzes`,
  },
  GLOBAL_ROLE: {
    STATE: `${PREFIX_STORAGE_VERSION}_global_role`,
  },
  MOOD: {
    STATE: `${PREFIX_STORAGE_VERSION}_mood_state`,
    LAST_DATE: `${PREFIX_STORAGE_VERSION}_mood_last_date`,
  },
  DAILY_QUEST: {
    PROGRESS: `${PREFIX_STORAGE_VERSION}_daily_quest_progress`,
  },
} as const;

export const CACHE_KEYS = {
  PRECACHE: `${PREFIX_STORAGE_VERSION}_precache`,
  PAGES: `${PREFIX_STORAGE_VERSION}_pages`,
  APP_DATA: `${PREFIX_STORAGE_VERSION}_app-data`,
  EASTER_EGG_IMAGES: `easter-egg-images`,
  GOOGLE_FONTS: `google-fonts-cache`,
} as const;
