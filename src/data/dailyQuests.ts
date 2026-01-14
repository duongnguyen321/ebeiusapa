import type { DailyQuest } from '@/types/quest';
import { VOUCHER_IDS } from '@/data/vouchers';

// ============================================
// DAY 1 QUESTS - Hibernation (2-3 quests)
// ============================================

export const day1Quests: DailyQuest[] = [
	{
		id: 'day1_photo_checkin',
		dayId: 1,
		triggerType: 'activity',
		triggerAfterActivity: 'day1_checkin',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Nhiếp Ảnh Gia Tại Gia',
		titleEm: 'Nàng Thơ Đầu Tiên',
		descriptionAnh: 'Chụp cho Em một tấm ảnh với phòng mới. Góc nào đẹp nhất?',
		descriptionEm: 'Tạo dáng thoải mái trong không gian mới. Anh sẽ lưu lại khoảnh khắc này!',
		rewardAnh: VOUCHER_IDS.MASSAGE_FOOT,
		rewardEm: VOUCHER_IDS.LAP_PILLOW,
	},
	{
		id: 'day1_journal_firstnight',
		dayId: 1,
		triggerType: 'time',
		triggerTime: '21:00',
		expiresAt: 'end_of_day',
		questType: 'journal',
		titleAnh: 'Nhật Ký Đêm Đầu',
		titleEm: 'Cảm Xúc Đêm Đầu',
		descriptionAnh: 'Ghi lại cảm xúc của Anh về ngày đầu tiên bên Em ở Sapa.',
		descriptionEm: 'Em thấy thế nào? Ghi lại để sau này đọc lại nhé!',
		rewardAnh: VOUCHER_IDS.MORNING_KISS,
		rewardEm: VOUCHER_IDS.STORY_TIME,
	},
	{
		id: 'day1_sensual_night',
		dayId: 1,
		triggerType: 'time',
		triggerTime: '22:00',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Sưởi Ấm Đêm Đông',
		titleEm: 'Được Sưởi Ấm',
		descriptionAnh: 'Massage nhẹ nhàng vai và gáy Em trong 10 phút để Em thư giãn.',
		descriptionEm: 'Nằm xuống và thư giãn. Anh sẽ xoa dịu mọi mệt mỏi của Em.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.HAIR_WASH,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
	},
];

// ============================================
// DAY 2 QUESTS - Birthday (4-5 quests)
// ============================================

export const day2Quests: DailyQuest[] = [
	{
		id: 'day2_photo_birthday',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '08:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Khoảnh Khắc Sinh Nhật',
		titleEm: 'Công Chúa Tuổi Mới',
		descriptionAnh: 'Chụp cho Em selfie đầu tiên trong ngày sinh nhật. Cười thật xinh nhé!',
		descriptionEm: 'Tạo dáng như công chúa nào! Đây là ngày đặc biệt của chúng mình.',
		rewardAnh: VOUCHER_IDS.FRENCH_KISS,
		rewardEm: VOUCHER_IDS.BIRTHDAY_WISH,
	},
	{
		id: 'day2_service_breakfast',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '09:00',
		expiresAt: 'next_activity',
		questType: 'service',
		titleAnh: 'Bồi Bàn Hoàng Gia',
		titleEm: 'Được Phục Vụ',
		descriptionAnh: 'Phục vụ bữa sáng cho Em như hoàng hậu. Gắp thức ăn, rót nước.',
		descriptionEm: 'Ngồi thưởng thức, Anh sẽ lo mọi thứ cho sinh nhật của Em.',
		rewardAnh: VOUCHER_IDS.FEED_ME,
		rewardEm: VOUCHER_IDS.LAP_PILLOW,
	},
	{
		id: 'day2_journal_birthday',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '14:00',
		expiresAt: 'next_activity',
		questType: 'journal',
		titleAnh: 'Lời Chúc Từ Tim',
		titleEm: 'Nhận Lời Chúc',
		descriptionAnh: 'Viết một lời chúc sinh nhật thật lãng mạn cho Em.',
		descriptionEm: 'Đọc lời chúc từ Anh và cảm nhận tình yêu.',
		rewardAnh: VOUCHER_IDS.HUG_KOALA,
		rewardEm: VOUCHER_IDS.COMPLIMENT_3,
	},
	{
		id: 'day2_photo_sunset',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '17:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Hoàng Hôn Sinh Nhật',
		titleEm: 'Nàng Thơ Hoàng Hôn',
		descriptionAnh: 'Chụp cho Em một tấm ảnh với ánh hoàng hôn Sapa.',
		descriptionEm: 'Đứng trước khung cảnh hoàng hôn, để Anh ghi lại vẻ đẹp của Em.',
		rewardAnh: VOUCHER_IDS.HICKEY_MARK,
		rewardEm: VOUCHER_IDS.HAND_HOLD,
	},
	{
		id: 'day2_sensual_birthday',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '22:00',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Quà Sinh Nhật Đặc Biệt',
		titleEm: 'Nhận Quà Đặc Biệt',
		descriptionAnh: 'Massage toàn thân cho Em 30 phút, kèm nến thơm và nhạc chill.',
		descriptionEm: 'Thư giãn và tận hưởng quà sinh nhật đặc biệt từ Anh.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.STRIP_SHOW,
		rewardEm: VOUCHER_IDS.CUDDLE_NIGHT,
	},
];

// ============================================
// DAY 3 QUESTS - Adventure (4-5 quests)
// ============================================

export const day3Quests: DailyQuest[] = [
	{
		id: 'day3_photo_fansipan',
		dayId: 3,
		triggerType: 'activity',
		triggerAfterActivity: 'day3_fansipan',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Nóc Nhà Đông Dương',
		titleEm: 'Công Chúa Đỉnh Fansipan',
		descriptionAnh: 'Chụp cho Em một tấm ảnh tại nóc nhà Đông Dương.',
		descriptionEm: 'Tạo dáng như nữ hoàng chinh phục đỉnh cao nào!',
		rewardAnh: VOUCHER_IDS.HUG_KOALA,
		rewardEm: VOUCHER_IDS.PIGGYBACK,
	},
	{
		id: 'day3_service_warm',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '11:00',
		expiresAt: 'next_activity',
		questType: 'service',
		titleAnh: 'Hiệp Sĩ Giữ Ấm',
		titleEm: 'Được Giữ Ấm',
		descriptionAnh: 'Xoa tay cho Em ấm, quàng khăn lại, chỉnh áo.',
		descriptionEm: 'Để Anh chăm sóc Em giữa cái lạnh Sapa.',
		rewardAnh: VOUCHER_IDS.TEA_SERVICE,
		rewardEm: VOUCHER_IDS.TEA_SERVICE,
	},
	{
		id: 'day3_journal_adventure',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '15:00',
		expiresAt: 'next_activity',
		questType: 'journal',
		titleAnh: 'Nhật Ký Phiêu Lưu',
		titleEm: 'Ghi Lại Hành Trình',
		descriptionAnh: 'Ghi lại những khoảnh khắc đáng nhớ trong ngày phiêu lưu.',
		descriptionEm: 'Viết ra cảm xúc của Em về ngày thám hiểm hôm nay.',
		rewardAnh: VOUCHER_IDS.GAZE_TEMPLE,
		rewardEm: VOUCHER_IDS.STORY_TIME,
	},
	{
		id: 'day3_photo_catcat',
		dayId: 3,
		triggerType: 'activity',
		triggerAfterActivity: 'day3_catcat',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Làng Cát Cát Thơ Mộng',
		titleEm: 'Nàng Thơ Bản Làng',
		descriptionAnh: 'Chụp cho Em giữa khung cảnh bản làng truyền thống.',
		descriptionEm: 'Hóa thân thành cô gái dân tộc xinh đẹp.',
		rewardAnh: VOUCHER_IDS.MASSAGE_BACK,
		rewardEm: VOUCHER_IDS.MASSAGE_BACK,
	},
	{
		id: 'day3_sensual_adventure',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '22:00',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Phần Thưởng Thám Hiểm',
		titleEm: 'Tận Hưởng Thành Quả',
		descriptionAnh: 'Sau một ngày phiêu lưu, massage chân và bắp chuối cho Em.',
		descriptionEm: 'Nằm xuống và để Anh xoa dịu đôi chân mệt mỏi.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.NAKED_CUDDLE,
		rewardEm: VOUCHER_IDS.CUDDLE_NIGHT,
	},
];

// ============================================
// DAY 4 QUESTS - Farewell (2 quests)
// ============================================

export const day4Quests: DailyQuest[] = [
	{
		id: 'day4_journal_farewell',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '09:00',
		expiresAt: 'next_activity',
		questType: 'journal',
		titleAnh: 'Lời Tạm Biệt Sapa',
		titleEm: 'Ký Ức Sương Mù',
		descriptionAnh: 'Viết về chuyến đi và những kỷ niệm đẹp với Em.',
		descriptionEm: 'Ghi lại những điều Em sẽ nhớ mãi về chuyến đi này.',
		rewardAnh: VOUCHER_IDS.NEXT_TRIP,
		rewardEm: VOUCHER_IDS.NEXT_TRIP,
	},
	{
		id: 'day4_photo_farewell',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '12:00',
		expiresAt: 'end_of_day',
		questType: 'photo',
		titleAnh: 'Tấm Hình Cuối Hành Trình',
		titleEm: 'Khoảnh Khắc Cuối',
		descriptionAnh: 'Chụp selfie cùng Em trước khi rời Sapa.',
		descriptionEm: 'Cười thật tươi cho tấm ảnh kỷ niệm cuối cùng ở Sapa.',
		rewardAnh: VOUCHER_IDS.HOME_DINNER,
		rewardEm: VOUCHER_IDS.HOME_DINNER,
	},
];

// ============================================
// COMBINED & HELPERS
// ============================================

export const allDailyQuests: DailyQuest[] = [
	...day1Quests,
	...day2Quests,
	...day3Quests,
	...day4Quests,
];

export function getQuestsForDay(dayId: number): DailyQuest[] {
	return allDailyQuests.filter((quest) => quest.dayId === dayId);
}

export function getQuestById(questId: string): DailyQuest | undefined {
	return allDailyQuests.find((quest) => quest.id === questId);
}
