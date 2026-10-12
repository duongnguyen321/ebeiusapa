import type { DailyQuest } from '@/types/quest';
import { VOUCHER_IDS } from '@/data/vouchers';

// ============================================
// DAY 1 QUESTS - Khởi hành & Nghỉ ngơi Sapa
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
		titleAnh: 'Nhật Ký Đêm Đầu Phố Núi',
		titleEm: 'Cảm Xúc Đêm Đầu Sapa',
		descriptionAnh: 'Ghi lại cảm xúc của Anh về ngày đầu tiên hai đứa đặt chân đến Sapa.',
		descriptionEm: 'Em thấy thế nào sau ngày đầu dạo phố đêm? Ghi lại để sau này đọc lại nhé!',
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
		descriptionAnh: 'Massage nhẹ nhàng vai và gáy Em trong 10 phút để Em thư giãn sau chặng xe.',
		descriptionEm: 'Nằm xuống và thư giãn. Anh sẽ xoa dịu mọi mệt mỏi của Em.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.HAIR_WASH,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
	},
];

// ============================================
// DAY 2 QUESTS - Fansipan & Mật Pet
// ============================================

export const day2Quests: DailyQuest[] = [
	{
		id: 'day2_photo_fansipan',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '11:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Nóc Nhà Đông Dương',
		titleEm: 'Nữ Hoàng Đỉnh Fansipan',
		descriptionAnh: 'Chụp cho Em một tấm ảnh kỷ niệm tuyệt đẹp tại cột mốc 3.143m Fansipan.',
		descriptionEm: 'Tạo dáng kiêu hãnh trên đỉnh mây ngàn, ghi dấu khoảnh khắc cùng Anh.',
		rewardAnh: VOUCHER_IDS.HUG_KOALA,
		rewardEm: VOUCHER_IDS.PIGGYBACK,
	},
	{
		id: 'day2_service_warm',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '12:00',
		expiresAt: 'next_activity',
		questType: 'service',
		titleAnh: 'Hiệp Sĩ Giữ Ấm',
		titleEm: 'Được Giữ Ấm',
		descriptionAnh: 'Xoa tay ủ ấm cho Em, quàng lại khăn và chỉnh áo khoác giữa cái lạnh đỉnh núi.',
		descriptionEm: 'Để Anh chăm sóc và che chở cho Em giữa gió lạnh mây ngàn.',
		rewardAnh: VOUCHER_IDS.TEA_SERVICE,
		rewardEm: VOUCHER_IDS.HAND_HOLD,
	},
	{
		id: 'day2_photo_matpet',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '16:30',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Khoảnh Khắc Cùng Thú Cưng',
		titleEm: 'Bé Yêu Thú Cưng',
		descriptionAnh: 'Bắt trọn nụ cười rạng rỡ của Em khi ôm các bé cún đáng yêu tại Mật Pet.',
		descriptionEm: 'Cười thật tươi bên các bé thú cưng để Anh lưu giữ tấm hình siêu cute.',
		rewardAnh: VOUCHER_IDS.COMPLIMENT_3,
		rewardEm: VOUCHER_IDS.HEAD_PAT,
	},
	{
		id: 'day2_sensual_massage',
		dayId: 2,
		triggerType: 'time',
		triggerTime: '22:30',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Xoa Dịu Đôi Chân',
		titleEm: 'Thư Giãn Sau Chuyến Đi',
		descriptionAnh: 'Massage bắp chân và lòng bàn chân cho Em sau ngày dài leo bậc thang Fansipan.',
		descriptionEm: 'Thả lỏng cơ thể, tận hưởng bàn tay ấm áp của Anh chăm sóc đôi chân.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.NAKED_CUDDLE,
		rewardEm: VOUCHER_IDS.CUDDLE_NIGHT,
	},
];

// ============================================
// DAY 3 QUESTS - Bản Cát Cát & Đón Giao Thừa
// ============================================

export const day3Quests: DailyQuest[] = [
	{
		id: 'day3_photo_catcat',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '13:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Nàng Thơ Bản Làng',
		titleEm: 'Sơn Nữ Cát Cát',
		descriptionAnh: 'Chụp cho Em bộ ảnh váy thổ cẩm rực rỡ bên dòng suối Tiên Sa Cát Cát.',
		descriptionEm: 'Hóa thân thành cô gái dân tộc duyên dáng, xoay tà váy giữa cảnh sắc Tây Bắc.',
		rewardAnh: VOUCHER_IDS.MASSAGE_BACK,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
	},
	{
		id: 'day3_service_tea',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '18:00',
		expiresAt: 'next_activity',
		questType: 'service',
		titleAnh: 'Trà Thảo Mộc Phục Vụ',
		titleEm: 'Thưởng Thức Trà Thơm',
		descriptionAnh: 'Pha cho Em tách trà nóng sau khi tắm lá thuốc Dao Đỏ để Em hồi phục sinh lực.',
		descriptionEm: 'Nhâm nhi ngụm trà ấm nóng từ tay Anh người yêu chu đáo.',
		rewardAnh: VOUCHER_IDS.GAZE_TEMPLE,
		rewardEm: VOUCHER_IDS.FEED_ME,
	},
	{
		id: 'day3_journal_fireworks',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '23:30',
		expiresAt: 'end_of_day',
		questType: 'journal',
		titleAnh: 'Lời Chúc Đêm Giao Thừa',
		titleEm: 'Ước Nguyện Năm Mới',
		descriptionAnh: 'Viết lời chúc ngọt ngào nhất gửi đến Em trong thời khắc giao thừa pháo hoa rực sáng.',
		descriptionEm: 'Ghi lại điều ước chân thành nhất của Em cho tương lai chung đôi của hai đứa.',
		rewardAnh: VOUCHER_IDS.HICKEY_MARK,
		rewardEm: VOUCHER_IDS.KISS_LOCK,
	},
	{
		id: 'day3_sensual_countdown',
		dayId: 3,
		triggerType: 'time',
		triggerTime: '23:50',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Nụ Hôn Giao Thừa',
		titleEm: 'Được Ôm Ấm Áp',
		descriptionAnh: 'Ôm Em thật chặt từ phía sau, thì thầm lời yêu và trao Em nụ hôn sâu nồng nàn.',
		descriptionEm: 'Tựa vào lồng ngực ấm áp của Anh, cùng nhau đếm ngược bước sang trang mới.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.STRIP_SHOW,
		rewardEm: VOUCHER_IDS.RIDE_FACE,
	},
];

// ============================================
// DAY 4 QUESTS - Cầu Kính, Hàm Rồng & Đồ Nướng
// ============================================

export const day4Quests: DailyQuest[] = [
	{
		id: 'day4_photo_cloudview',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '13:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Góc Cafe Triệu View',
		titleEm: 'Nàng Thơ Bên Tách Cafe',
		descriptionAnh: 'Chụp ảnh Em thảnh thơi nhâm nhi cafe với hậu cảnh biển mây bao la.',
		descriptionEm: 'Tạo dáng tự nhiên với ly cafe nóng, ánh mắt nhìn xa xăm thưởng ngoạn mây trời.',
		rewardAnh: VOUCHER_IDS.GAZE_TEMPLE,
		rewardEm: VOUCHER_IDS.COMPLIMENT_3,
	},
	{
		id: 'day4_bridge_brave',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '15:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Bàn Tay Che Chở',
		titleEm: 'Cô Gái Can Đảm',
		descriptionAnh: 'Nắm chặt tay Em bước qua Cầu kính Rồng Mây và lưu lại khoảnh khắc dũng cảm của hai đứa.',
		descriptionEm: 'Nắm lấy tay Anh bước qua cầu kính trong suốt, ghi dấu kỷ niệm không thể quên.',
		rewardAnh: VOUCHER_IDS.HAND_HOLD,
		rewardEm: VOUCHER_IDS.PIGGYBACK,
	},
	{
		id: 'day4_journal_nature',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '21:00',
		expiresAt: 'end_of_day',
		questType: 'journal',
		titleAnh: 'Hương Vị Than Hồng',
		titleEm: 'Kỷ Niệm Phố Nướng',
		descriptionAnh: 'Ghi lại cảm xúc về bữa tiệc đồ nướng Sapa bên Em giữa sương lạnh đêm phố núi.',
		descriptionEm: 'Viết về món ăn nướng Em thích nhất và cảm giác ấm áp khi được Anh chăm sóc.',
		rewardAnh: VOUCHER_IDS.ORAL_SLOW,
		rewardEm: VOUCHER_IDS.FEED_ME,
	},
	{
		id: 'day4_service_backrub',
		dayId: 4,
		triggerType: 'time',
		triggerTime: '23:45',
		expiresAt: 'end_of_day',
		questType: 'service',
		titleAnh: 'Chăm Sóc Tận Tụy',
		titleEm: 'Thư Thái Toàn Thân',
		descriptionAnh: 'Dùng dụng cụ kỳ lưng vừa mua tại chợ, nhẹ nhàng kỳ lưng và massage cho Em.',
		descriptionEm: 'Thả lỏng hoàn toàn trong làn nước ấm, đón nhận sự ân cần của Anh.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.BATH_SERVICE,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
	},
];

// ============================================
// DAY 5 QUESTS - Xuất Cảnh Hà Khẩu
// ============================================

export const day5Quests: DailyQuest[] = [
	{
		id: 'day5_photo_border',
		dayId: 5,
		triggerType: 'time',
		triggerTime: '17:45',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Dấu Mốc Cửa Khẩu',
		titleEm: 'Check-in Biên Giới',
		descriptionAnh: 'Chụp cho Em tấm ảnh check-in đánh dấu thời khắc hai đứa bước qua biên giới sang Hà Khẩu.',
		descriptionEm: 'Cầm sổ thông hành xinh xắn, cười tươi ghi dấu chuyến du ngoạn nước bạn cùng Anh.',
		rewardAnh: VOUCHER_IDS.TOTAL_CONTROL,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
	},
	{
		id: 'day5_journal_hakhau',
		dayId: 5,
		triggerType: 'time',
		triggerTime: '21:30',
		expiresAt: 'end_of_day',
		questType: 'journal',
		titleAnh: 'Trải Nghiệm Nước Bạn',
		titleEm: 'Đêm Đầu Hà Khẩu',
		descriptionAnh: 'Ghi lại ấn tượng đầu tiên về đường phố, Chợ Tết và món lẩu đêm Hà Khẩu.',
		descriptionEm: 'Cảm nhận của Em khi lần đầu sang Hà Khẩu cùng Anh? Viết lại vài dòng đáng nhớ nhé!',
		rewardAnh: VOUCHER_IDS.STORY_TIME,
		rewardEm: VOUCHER_IDS.COMPLIMENT_3,
	},
	{
		id: 'day5_sensual_hotel',
		dayId: 5,
		triggerType: 'time',
		triggerTime: '23:30',
		expiresAt: 'end_of_day',
		questType: 'sensual',
		titleAnh: 'Đêm Ấm Căn Hộ Mới',
		titleEm: 'Hơi Ấm Xứ Người',
		descriptionAnh: 'Ôm chặt Em trong căn hộ Hà Khẩu, cùng Em nhâm nhi đồ ăn vặt và trao nhau những vuốt ve ngọt ngào.',
		descriptionEm: 'Nép mình vào lòng Anh ấm áp giữa thành phố xa lạ, tận hưởng tình yêu trọn vẹn.',
		allowedMoods: ['romantic', 'naughty'],
		timeRestriction: 'after_20:00',
		rewardAnh: VOUCHER_IDS.COWGIRL_RIDE,
		rewardEm: VOUCHER_IDS.CUDDLE_NIGHT,
	},
];

// ============================================
// DAY 6 QUESTS - Tạm Biệt & Về Hà Nội
// ============================================

export const day6Quests: DailyQuest[] = [
	{
		id: 'day6_photo_farewell',
		dayId: 6,
		triggerType: 'time',
		triggerTime: '14:00',
		expiresAt: 'next_activity',
		questType: 'photo',
		titleAnh: 'Tấm Hình Đầy Ắp Quà',
		titleEm: 'Thu Hoạch Sau Chuyến Đi',
		descriptionAnh: 'Chụp cho Em bức ảnh cùng những túi quà ăn vặt Trung Quốc siêu ngon trước khi về.',
		descriptionEm: 'Khoe chiến lợi phẩm đồ ăn vặt và nụ cười mãn nguyện bên Anh.',
		rewardAnh: VOUCHER_IDS.COOK_REQUEST,
		rewardEm: VOUCHER_IDS.NEXT_TRIP,
	},
	{
		id: 'day6_journal_farewell',
		dayId: 6,
		triggerType: 'time',
		triggerTime: '17:00',
		expiresAt: 'end_of_day',
		questType: 'journal',
		titleAnh: 'Khép Lại Tour Du Hí',
		titleEm: 'Hẹn Chuyến Đi Kế Tiếp',
		descriptionAnh: 'Viết lời cảm ơn và tâm tình gửi Em trên chuyến xe khách trở về Hà Nội.',
		descriptionEm: 'Viết lại điều Em cảm thấy trân trọng và hạnh phúc nhất sau 6 ngày 5 đêm vừa qua.',
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
	...day5Quests,
	...day6Quests,
];

export function getQuestsForDay(dayId: number): DailyQuest[] {
	return allDailyQuests.filter((quest) => quest.dayId === dayId);
}

export function getQuestById(questId: string): DailyQuest | undefined {
	return allDailyQuests.find((quest) => quest.id === questId);
}
