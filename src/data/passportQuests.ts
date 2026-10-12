// Quest data for the Love Passport feature
// Aligned with 6-day 5-night Sapa - Lao Cai - Ha Khau journey
import type { VoucherId } from './vouchers';
import { VOUCHER_IDS } from './vouchers';

export interface PassportQuest {
	id: string;
	dayId: number;
	time: string;
	titleAnh: string;
	titleEm: string;
	descriptionAnh: string;
	descriptionEm: string;
	code: string;
	rewardAnh: VoucherId;
	rewardEm: VoucherId;
	stampId?: string;
}

export const passportQuests: PassportQuest[] = [
	// ==================== DAY 1: HÀ NỘI - SAPA ====================
	{
		id: 'day1_departure',
		dayId: 1,
		time: '07:00',
		titleAnh: 'Chuyến Xe Tình Yêu',
		titleEm: 'Công Chúa Lên Xe',
		descriptionAnh: 'Đưa Em lên xe cabin đôi đúng giờ, chuẩn bị sẵn gối mềm và giữ ấm cho Em suốt chuyến đi.',
		descriptionEm: 'Tựa vào vai Anh, ngắm nhìn cảnh đèo núi Tây Bắc lướt qua khung cửa sổ.',
		code: 'CABIN',
		rewardAnh: VOUCHER_IDS.MASSAGE_BACK,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
		stampId: 'stamp_departure',
	},
	{
		id: 'day1_checkin',
		dayId: 1,
		time: '11:30',
		titleAnh: 'Quản Gia Tận Tụy',
		titleEm: 'Nữ Hoàng Nhận Phòng',
		descriptionAnh: 'Xách toàn bộ hành lý lên phòng, kiểm tra hệ thống sưởi và nước nóng cho Em.',
		descriptionEm: 'Ngồi thư giãn ngắm phòng mới, kiểm tra độ ấm và chấm điểm sự chu đáo của Anh.',
		code: 'ARRIVED',
		rewardAnh: VOUCHER_IDS.CAT_ROLEPLAY,
		rewardEm: VOUCHER_IDS.LAP_PILLOW,
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_hibernate',
		dayId: 1,
		time: '12:00',
		titleAnh: 'Gấu Ngủ Đông',
		titleEm: 'Bé Koala',
		descriptionAnh: 'Kéo rèm, bật sưởi ấm, ôm Em vào lòng ngủ một giấc thật sâu sau chặng đường dài.',
		descriptionEm: 'Biến thành bé Koala ôm chặt lấy Anh, ngủ say giữa tiết trời se lạnh Sapa.',
		code: 'REST',
		rewardAnh: VOUCHER_IDS.NAKED_CUDDLE,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
		stampId: 'stamp_rest',
	},
	{
		id: 'day1_thangco',
		dayId: 1,
		time: '16:15',
		titleAnh: 'Thực Thần Phố Núi',
		titleEm: 'Nếm Thử Đặc Sản',
		descriptionAnh: 'Đưa Em đi ăn lẩu Thắng cố nóng hổi, nhúng rau gắp thịt chăm sóc Em chu đáo.',
		descriptionEm: 'Thưởng thức hương vị ẩm thực Tây Bắc độc đáo và đánh giá độ ngon của món ăn.',
		code: 'HOTPOT',
		rewardAnh: VOUCHER_IDS.ORAL_SLOW,
		rewardEm: VOUCHER_IDS.BATH_SERVICE,
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_church',
		dayId: 1,
		time: '18:00',
		titleAnh: 'Phó Nháy Nhà Thờ Đá',
		titleEm: 'Nàng Thơ Quảng Trường',
		descriptionAnh: 'Chụp cho Em bộ ảnh lung linh bên Nhà thờ đá cổ kính và quảng trường trung tâm.',
		descriptionEm: 'Tạo dáng sang chảnh giữa thị trấn mờ sương, bắt Anh chụp đến khi thật ưng ý.',
		code: 'SAPA',
		rewardAnh: VOUCHER_IDS.FRENCH_KISS,
		rewardEm: VOUCHER_IDS.POSE_CHOICE,
		stampId: 'stamp_church',
	},

	// ==================== DAY 2: FANSIPAN & TRẢI NGHIỆM ====================
	{
		id: 'day2_fansipan',
		dayId: 2,
		time: '11:20',
		titleAnh: 'Chinh Phục Nóc Nhà Đông Dương',
		titleEm: 'Nữ Hoàng Đỉnh Fansipan',
		descriptionAnh: 'Dẫn Em chạm tay vào cột mốc 3.143m Fansipan, che chở và sưởi ấm bàn tay Em giữa gió lạnh.',
		descriptionEm: 'Đứng hiên ngang trên đỉnh cao nhất Đông Dương, lưu lại khoảnh khắc kiêu hãnh bên Anh.',
		code: 'SUMMIT',
		rewardAnh: VOUCHER_IDS.HUG_KOALA,
		rewardEm: VOUCHER_IDS.PIGGYBACK,
		stampId: 'stamp_peak',
	},
	{
		id: 'day2_buffet',
		dayId: 2,
		time: '13:10',
		titleAnh: 'Chăm Sóc Nàng Thơ',
		titleEm: 'Thực Thần Đại Ngàn',
		descriptionAnh: 'Lấy đồ ăn buffet, bóc tôm và chuẩn bị nước ấm chu đáo cho Em.',
		descriptionEm: 'Tận hưởng bữa trưa buffet no nê sau hành trình leo núi Fansipan.',
		code: 'BUFFET',
		rewardAnh: VOUCHER_IDS.FEED_ME,
		rewardEm: VOUCHER_IDS.TEA_SERVICE,
		stampId: 'stamp_buffet',
	},
	{
		id: 'day2_matpet',
		dayId: 2,
		time: '16:10',
		titleAnh: 'Bạn Thân Của Thú Cưng',
		titleEm: 'Cô Chủ Nhỏ Mật Pet',
		descriptionAnh: 'Chụp lại những khoảnh khắc đáng yêu của Em khi vui đùa cùng các bé thú cưng Mật Pet.',
		descriptionEm: 'Vuốt ve và ôm các bé cún ngoan ngoãn, khoe nụ cười tỏa nắng.',
		code: 'PET',
		rewardAnh: VOUCHER_IDS.COMPLIMENT_3,
		rewardEm: VOUCHER_IDS.HEAD_PAT,
		stampId: 'stamp_pet',
	},
	{
		id: 'day2_coaster',
		dayId: 2,
		time: '17:25',
		titleAnh: 'Tay Lái Vững Vàng',
		titleEm: 'Cặp Đôi Cảm Giác Mạnh',
		descriptionAnh: 'Cùng Em vi vu trên đường ray tàu hỏa trượt núi, bảo vệ Em an toàn tuyệt đối.',
		descriptionEm: 'Hét thật to giải tỏa căng thẳng và cười sảng khoái suốt đường trượt núi.',
		code: 'SLIDE',
		rewardAnh: VOUCHER_IDS.BLINDFOLD_LEAD,
		rewardEm: VOUCHER_IDS.BODY_LICK,
		stampId: 'stamp_slide',
	},
	{
		id: 'day2_nightmarket',
		dayId: 2,
		time: '22:00',
		titleAnh: 'Người Hộ Tống Chợ Đêm',
		titleEm: 'Bé Yêu Mê Ăn Vặt',
		descriptionAnh: 'Dắt tay Em qua các sạp đồ nướng chợ đêm, mua hạt dẻ và đồ ăn vặt cho Em gặm.',
		descriptionEm: 'Thưởng thức các xiên que nướng thơm phức và hạt dẻ Sapa nóng hổi.',
		code: 'MARKET',
		rewardAnh: VOUCHER_IDS.NECK_KISS,
		rewardEm: VOUCHER_IDS.HAND_HOLD,
		stampId: 'stamp_market',
	},

	// ==================== DAY 3: CÁT CÁT & GIAO THỪA ====================
	{
		id: 'day3_catcat',
		dayId: 3,
		time: '12:20',
		titleAnh: 'Chàng Trai Vùng Cao',
		titleEm: 'Sơn Nữ Bản Cát Cát',
		descriptionAnh: 'Giúp Em chọn bộ váy thổ cẩm đẹp nhất và theo chân nâng váy cho Em chụp ảnh khắp bản.',
		descriptionEm: 'Hóa thân thành sơn nữ xinh đẹp, tạo dáng bên suối Tiên Sa và guồng nước cổ.',
		code: 'CATCAT',
		rewardAnh: VOUCHER_IDS.SEXY_POSE,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
		stampId: 'stamp_catcat',
	},
	{
		id: 'day3_spa',
		dayId: 3,
		time: '17:05',
		titleAnh: 'Chăm Sóc Toàn Diện',
		titleEm: 'Quý Cô Thảo Dược',
		descriptionAnh: 'Canh chừng bồn tắm lá thuốc Dao Đỏ ấm áp, rót nước thảo mộc cho Em thư giãn.',
		descriptionEm: 'Ngâm bồn gỗ thư thái, tận hưởng cảm giác khoan khoái sau khi gội đầu dưỡng sinh.',
		code: 'HERBAL',
		rewardAnh: VOUCHER_IDS.STRIP_SHOW,
		rewardEm: VOUCHER_IDS.FINGER_PLAY,
		stampId: 'stamp_spa',
	},
	{
		id: 'day3_salmon',
		dayId: 3,
		time: '19:25',
		titleAnh: 'Chủ Xị Đại Tiệc',
		titleEm: 'Thực Thần Sành Điệu',
		descriptionAnh: 'Gọi nồi lẩu Cá Hồi & Cá Tầm đầy đặn, rót chút rượu ngô cùng nâng ly với Em.',
		descriptionEm: 'Thưởng thức từng miếng cá tầm béo giòn và nước lẩu chua cay tuyệt hảo.',
		code: 'FEAST',
		rewardAnh: VOUCHER_IDS.ORAL_DEEP,
		rewardEm: VOUCHER_IDS.FEED_ME,
		stampId: 'stamp_feast',
	},
	{
		id: 'day3_countdown',
		dayId: 3,
		time: '23:30',
		titleAnh: 'Khoảnh Khắc Giao Thừa',
		titleEm: 'Ước Nguyện Đầu Năm',
		descriptionAnh: 'Châm que pháo hoa sáng rực rỡ, ôm Em từ phía sau và trao Em nụ hôn giao thừa nồng nàn.',
		descriptionEm: 'Ngắm pháo hoa lung linh, nhắm mắt ước nguyện cho tình yêu hai đứa mãi bền chặt.',
		code: 'COUNTDOWN',
		rewardAnh: VOUCHER_IDS.COWGIRL_RIDE,
		rewardEm: VOUCHER_IDS.KISS_LOCK,
		stampId: 'stamp_countdown',
	},

	// ==================== DAY 4: THIÊN NHIÊN & ẨM THỰC ====================
	{
		id: 'day4_cloud',
		dayId: 4,
		time: '12:30',
		titleAnh: 'Thợ Săn Mây',
		titleEm: 'Nàng Thơ Giữa Mây',
		descriptionAnh: 'Bắt trọn khoảnh khắc Em nâng tách cafe thơm ngát với hậu cảnh biển mây ngập tràn.',
		descriptionEm: 'Thả hồn theo mây trời, thưởng thức đồ uống ngon giữa khung cảnh triệu view.',
		code: 'CLOUDS',
		rewardAnh: VOUCHER_IDS.GAZE_TEMPLE,
		rewardEm: VOUCHER_IDS.MORNING_WOOD,
		stampId: 'stamp_clouds',
	},
	{
		id: 'day4_bridge',
		dayId: 4,
		time: '14:50',
		titleAnh: 'Điểm Tựa Vững Chắc',
		titleEm: 'Dũng Khí Trên Không',
		descriptionAnh: 'Nắm chặt tay Em bước qua Cầu kính Rồng Mây, làm chỗ dựa tin cậy cho Em.',
		descriptionEm: 'Vượt qua nỗi sợ độ cao, tự tin sải bước trên cầu kính ngắm thung lũng sâu hun hút.',
		code: 'BRIDGE',
		rewardAnh: VOUCHER_IDS.HAND_HOLD,
		rewardEm: VOUCHER_IDS.PIGGYBACK,
		stampId: 'stamp_bridge',
	},
	{
		id: 'day4_hamrong',
		dayId: 4,
		time: '16:05',
		titleAnh: 'Người Dẫn Đường Núi Mây',
		titleEm: 'Thiên Thần Sân Mây',
		descriptionAnh: 'Cầm nước, đỡ tay Em leo lên Sân Mây Núi Hàm Rồng ngắm toàn cảnh thị trấn Sapa.',
		descriptionEm: 'Đứng từ đỉnh núi nhìn xuống Sapa thu nhỏ trong tầm mắt và chụp ảnh kỷ niệm.',
		code: 'HAMRONG',
		rewardAnh: VOUCHER_IDS.ORAL_SLOW,
		rewardEm: VOUCHER_IDS.LAP_PILLOW,
		stampId: 'stamp_hamrong',
	},
	{
		id: 'day4_bbq',
		dayId: 4,
		time: '19:55',
		titleAnh: 'Bếp Trưởng Than Hồng',
		titleEm: 'Cô Nàng Mê Đồ Nướng',
		descriptionAnh: 'Nướng chín đều từng xiên thịt, cắt nhỏ gắp vào bát cho nàng thơ thưởng thức.',
		descriptionEm: 'Ăn thỏa thích các món nướng đặc sắc Tây Bắc bên ánh than hồng rực rỡ.',
		code: 'BBQ',
		rewardAnh: VOUCHER_IDS.HICKEY_MARK,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
		stampId: 'stamp_bbq',
	},
	{
		id: 'day4_backrub',
		dayId: 4,
		time: '23:45',
		titleAnh: 'Chuyên Viên Kỳ Lưng',
		titleEm: 'Thư Giãn Toàn Diện',
		descriptionAnh: 'Dùng dụng cụ mới mua tại chợ, nhẹ nhàng kỳ lưng và massage thư giãn cho Em trong bồn tắm.',
		descriptionEm: 'Thả lỏng cơ thể, tận hưởng sự chăm sóc ngọt ngào và chu đáo của Anh.',
		code: 'LOVE',
		rewardAnh: VOUCHER_IDS.SHOWER_SEX,
		rewardEm: VOUCHER_IDS.BATH_SERVICE,
		stampId: 'stamp_backrub',
	},

	// ==================== DAY 5: XUẤT CẢNH HÀ KHẨU ====================
	{
		id: 'day5_farewell_sapa',
		dayId: 5,
		time: '12:00',
		titleAnh: 'Người Gom Kỷ Niệm',
		titleEm: 'Nữ Hoàng Mua Sắm',
		descriptionAnh: 'Xách túi đồ lưu niệm cho Em tại chợ trung tâm Sapa trước khi xuống xe về Lào Cai.',
		descriptionEm: 'Lựa chọn những món đồ thủ công ý nghĩa nhất để lưu giữ kỷ niệm về Sapa.',
		code: 'GIFT',
		rewardAnh: VOUCHER_IDS.COMPLIMENT_3,
		rewardEm: VOUCHER_IDS.HEAD_PAT,
		stampId: 'stamp_gift',
	},
	{
		id: 'day5_border',
		dayId: 5,
		time: '17:30',
		titleAnh: 'Thủ Lĩnh Xuất Ngoại',
		titleEm: 'Du Khách Xinh Đẹp',
		descriptionAnh: 'Cầm sổ thông hành, hướng dẫn Em làm thủ tục xuất nhập cảnh qua Cửa khẩu quốc tế thuận lợi.',
		descriptionEm: 'Hào hứng bước qua vạch phân định biên giới, đặt chân sang đất nước bạn.',
		code: 'BORDER',
		rewardAnh: VOUCHER_IDS.TOTAL_CONTROL,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
		stampId: 'stamp_border',
	},
	{
		id: 'day5_hakhau_market',
		dayId: 5,
		time: '20:00',
		titleAnh: 'Đồng Hành Phố Lạ',
		titleEm: 'Nàng Thơ Chợ Tết',
		descriptionAnh: 'Dắt tay Em dạo Chợ Tết và trung tâm Hà Khẩu, hòa mình vào không khí nhộn nhịp nước bạn.',
		descriptionEm: 'Ngắm nhìn phố phường rực rỡ sắc đỏ và trải nghiệm nét văn hóa bản địa thú vị.',
		code: 'CHINA',
		rewardAnh: VOUCHER_IDS.FRENCH_KISS,
		rewardEm: VOUCHER_IDS.HAND_HOLD,
		stampId: 'stamp_china',
	},
	{
		id: 'day5_china_hotpot',
		dayId: 5,
		time: '22:00',
		titleAnh: 'Thử Thách Vị Giác',
		titleEm: 'Mê Mẩn Cay Tê',
		descriptionAnh: 'Gọi nồi lẩu chuẩn vị Hà Khẩu thơm nồng hoa tiêu, gắp đồ ăn nóng hổi cho Em.',
		descriptionEm: 'Thưởng thức hương vị lẩu Trung Hoa chính gốc và các món ăn vặt chợ đêm lạ miệng.',
		code: 'HOTPOTCN',
		rewardAnh: VOUCHER_IDS.CUM_MOUTH,
		rewardEm: VOUCHER_IDS.CUDDLE_NIGHT,
		stampId: 'stamp_chinahotpot',
	},

	// ==================== DAY 6: TRỞ VỀ HÀ NỘI ====================
	{
		id: 'day6_snacks',
		dayId: 6,
		time: '13:00',
		titleAnh: 'Khuân Vác Quà Cáp',
		titleEm: 'Thợ Săn Đồ Ăn Vặt',
		descriptionAnh: 'Xách đầy tay các túi bánh kẹo, đồ ăn vặt Trung Quốc mà Em chọn mang về làm quà.',
		descriptionEm: 'Lựa chọn đủ các món ăn vặt ngon đỉnh để vừa gặm vừa chia cho bạn bè thân thiết.',
		code: 'SNACK',
		rewardAnh: VOUCHER_IDS.COOK_REQUEST,
		rewardEm: VOUCHER_IDS.NEXT_TRIP,
		stampId: 'stamp_snack',
	},
	{
		id: 'day6_safe_home',
		dayId: 6,
		time: '16:00',
		titleAnh: 'Điểm Tựa Trọn Vẹn',
		titleEm: 'Hạnh Phúc Về Nhà',
		descriptionAnh: 'Sắp xếp hành lý an toàn lên xe khách tại Lào Cai, cùng Em trở về thủ đô Hà Nội an yên.',
		descriptionEm: 'Tựa đầu vào vai Anh ngủ ngon lành trên đường về, khép lại 6 ngày 5 đêm ngập tràn hạnh phúc.',
		code: 'HOME',
		rewardAnh: VOUCHER_IDS.FINISH_CHEST,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
		stampId: 'stamp_home',
	},
];

// Get quests for a specific day
export function getQuestsForDay(dayId: number): PassportQuest[] {
	return passportQuests.filter((q) => q.dayId === dayId);
}

// Get a specific quest by ID
export function getQuestById(id: string): PassportQuest | undefined {
	return passportQuests.find((q) => q.id === id);
}

// Validate a code for a quest
export function validateQuestCode(questId: string, inputCode: string): boolean {
	const quest = getQuestById(questId);
	if (!quest) return false;
	return quest.code.toUpperCase() === inputCode.toUpperCase();
}
