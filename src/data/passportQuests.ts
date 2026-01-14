// Quest data for the Love Passport feature
// Based on docs/feature_love_passport.md
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
	// ==================== DAY 1: HẠ CÁNH & NGỦ ĐÔNG ====================
	{
		id: 'day1_arrival',
		dayId: 1,
		time: '14:00',
		titleAnh: 'Hạ Cánh Nơi Anh',
		titleEm: 'Chế Độ Công Chúa',
		descriptionAnh: 'Xe đến văn phòng. Gọi xe trung chuyển về 22 Cát Cát. Xách hết đồ, không để Em động tay.',
		descriptionEm: 'Em là công chúa, cấm đụng tay chân. Chụp lén Anh đang khệ nệ xách đồ (nhớ dìm hàng).',
		code: 'ARRIVED',
		rewardAnh: VOUCHER_IDS.MASSAGE_BACK,
		rewardEm: VOUCHER_IDS.QUEEN_MODE,
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_checkin',
		dayId: 1,
		time: '14:15',
		titleAnh: 'Quản Gia Tận Tụy',
		titleEm: 'Nữ Hoàng Nhận Phòng',
		descriptionAnh: 'Nhận phòng Chill With Home. Đặt ngay Lẩu Gà/Đồ Nướng cho tối nay (20:30). Dặn lễ tân giờ ăn.',
		descriptionEm: 'Ngồi ghế chờ xinh đẹp. Nhắc anh người yêu đặt lẩu gà ăn tối tại phòng.',
		code: 'WARM',
		rewardAnh: VOUCHER_IDS.CAT_ROLEPLAY,
		rewardEm: VOUCHER_IDS.TEASE_PUNISH,
		stampId: 'stamp_tea',
	},
	{
		id: 'day1_hibernate',
		dayId: 1,
		time: '14:30',
		titleAnh: 'Gấu Ngủ Đông',
		titleEm: 'Bé Koala',
		descriptionAnh: 'Kéo rèm, bật sưởi. Ôm Em ngủ một giấc thật ngon bù lại quãng đường đi.',
		descriptionEm: 'Biến thành gấu Koala bám chặt lấy cây bạch đàn (là Anh). Ngủ một giấc lấy lại sức!',
		code: 'KOALA',
		rewardAnh: VOUCHER_IDS.NAKED_CUDDLE,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
		stampId: 'stamp_game1',
	},
	{
		id: 'day1_dinner',
		dayId: 1,
		time: '20:30',
		titleAnh: 'Đầu Bếp Tại Gia',
		titleEm: 'Thực Thần Tại Gia',
		descriptionAnh: 'Ăn tối tại Homestay (Lẩu Gà/BBQ). Nướng thịt/nhúng rau cho Em ăn.',
		descriptionEm: 'Chỉ việc ngồi ăn và tận hưởng. Chụp ảnh nồi lẩu nghi ngút khói.',
		code: 'HOMESTAY',
		rewardAnh: VOUCHER_IDS.ORAL_SLOW,
		rewardEm: VOUCHER_IDS.BATH_SERVICE,
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_chill',
		dayId: 1,
		time: '21:30',
		titleAnh: 'Nhiếp Ảnh Gia Ban Công',
		titleEm: 'Nàng Thơ Bên Sưởi',
		descriptionAnh: 'Chụp cho Em bộ ảnh "Sống ảo tại gia" ở ban công/lò sưởi. Góc chụp từ trên cao.',
		descriptionEm: 'Tạo dáng cute bên cốc trà nóng/lò sưởi. Bắt anh chụp đến khi nào ưng thì thôi.',
		code: 'CHILL',
		rewardAnh: VOUCHER_IDS.FRENCH_KISS,
		rewardEm: VOUCHER_IDS.POSE_CHOICE,
		stampId: 'stamp_church',
	},

	// ==================== DAY 2: SINH NHẬT RỰC RỠ ====================
	{
		id: 'day2_cake',
		dayId: 2,
		time: '10:00',
		titleAnh: 'Điệp Vụ Bánh Kem',
		titleEm: 'Công Chúa Ngủ Nướng',
		descriptionAnh: 'LÉN nhắn tin chốt bánh kem với Tiệm Chị Híp (Ship 16h). Đừng để Em biết!',
		descriptionEm: 'Ngủ nướng thỏa thích. Khi nào dậy thì make-up thật xinh đẹp (lồng lộn lên).',
		code: 'CAKE',
		rewardAnh: VOUCHER_IDS.GAZE_TEMPLE,
		rewardEm: VOUCHER_IDS.MORNING_WOOD,
		stampId: 'stamp_cake',
	},
	{
		id: 'day2_lunch',
		dayId: 2,
		time: '13:00',
		titleAnh: 'Thợ Săn Cốn Sủi',
		titleEm: 'Thực Thần Sành Ăn',
		descriptionAnh: 'Đưa Em đi ăn Cốn Sủi Ông Há (591 ĐBP). Gọi thêm sủi cảo chiên.',
		descriptionEm: 'Thưởng thức đặc sản. Chụp ảnh lưu niệm món ăn mới lạ này.',
		code: 'YUMMY',
		rewardAnh: VOUCHER_IDS.ORAL_DEEP,
		rewardEm: VOUCHER_IDS.FEED_ME,
		stampId: 'stamp_game1',
	},
	{
		id: 'day2_sunplaza',
		dayId: 2,
		time: '14:00',
		titleAnh: 'Phó Nháy Có Tâm',
		titleEm: 'Siêu Mẫu Sun Plaza',
		descriptionAnh: 'Chụp cháy máy cho Em tại Sun Plaza & Nhà thờ đá. Lăn xả, nằm đất chụp góc rộng.',
		descriptionEm: 'Diễn sâu tại trời Âu (fake). Mặc váy len body sang chảnh chụp hình.',
		code: 'PARIS',
		rewardAnh: VOUCHER_IDS.BLINDFOLD_LEAD,
		rewardEm: VOUCHER_IDS.SENSUAL_MASSAGE,
		stampId: 'stamp_cafe',
	},
	{
		id: 'day2_spa',
		dayId: 2,
		time: '17:30',
		titleAnh: 'Thư Ký Tận Tâm',
		titleEm: 'Quý Cô Thư Giãn',
		descriptionAnh: "Đến Dao's Center. Đảm bảo Em được ngâm bồn thoải mái nhất. Canh giờ 20p gọi Em.",
		descriptionEm: 'Ngâm lá thuốc Dao Đỏ thư giãn. Tắt điện thoại, tận hưởng mùi thảo mộc.',
		code: 'RELAX',
		rewardAnh: VOUCHER_IDS.STRIP_SHOW,
		rewardEm: VOUCHER_IDS.FINGER_PLAY,
		stampId: 'stamp_spa',
	},
	{
		id: 'day2_birthday',
		dayId: 2,
		time: '21:00',
		titleAnh: 'Chủ Tiệc Bí Mật',
		titleEm: 'Nhân Vật Chính',
		descriptionAnh: 'Bất ngờ!! Tổ chức Tiệc sinh nhật tại phòng. Bánh kem, nến, nhạc, quà.',
		descriptionEm: 'Bất ngờ chưa?? Thổi nến, ước và nhận quà từ ai-mà-cũng-biết-là-ai-đấy.',
		code: 'WISH',
		rewardAnh: VOUCHER_IDS.STRIP_SHOW,
		rewardEm: VOUCHER_IDS.RIDE_FACE,
		stampId: 'stamp_birthday',
	},

	// ==================== DAY 3: CHINH PHỤC ĐỈNH CAO ====================
	{
		id: 'day3_hamrong',
		dayId: 3,
		time: '13:00',
		titleAnh: 'Sherpa Dẫn Đường',
		titleEm: 'Nhà Leo Núi Xinh Đẹp',
		descriptionAnh: 'Dẫn Em leo Hàm Rồng. Mục tiêu: Sân Mây. Nhớ cầm nước và đỡ Em những đoạn dốc.',
		descriptionEm: 'Leo núi nhưng vẫn phải xinh. Lên Sân Mây ngắm toàn cảnh thị trấn.',
		code: 'PEAK',
		rewardAnh: VOUCHER_IDS.ORAL_DEEP,
		rewardEm: VOUCHER_IDS.GAZE_TEMPLE,
		stampId: 'stamp_peak',
	},
	{
		id: 'day3_moana',
		dayId: 3,
		time: '15:15',
		titleAnh: 'Trợ Lý Sống Ảo',
		titleEm: 'Nàng Thơ Vô Cực',
		descriptionAnh: 'Đến Moana Sapa (68 Violet). Chụp ảnh hồ vô cực, tượng cô gái. Cầm đồ cho Em thay.',
		descriptionEm: 'Tạo dáng bên hồ vô cực, cổng trời. Góc nghiêng thần thánh đâu, show ra!',
		code: 'MOANA',
		rewardAnh: VOUCHER_IDS.LAP_PILLOW,
		rewardEm: VOUCHER_IDS.POSE_CHOICE,
		stampId: 'stamp_catcat',
	},
	{
		id: 'day3_walk',
		dayId: 3,
		time: '17:00',
		titleAnh: 'Người Bạn Đồng Hành',
		titleEm: 'Cô Gái Mộng Mơ',
		descriptionAnh: 'Đi bộ xuống dốc từ Moana về Homestay. Nắm tay Em đi dưới hoàng hôn (nếu có).',
		descriptionEm: 'Tản bộ ngắm cảnh thung lũng. Hít thở không khí trong lành lần cuối.',
		code: 'WALK',
		rewardAnh: VOUCHER_IDS.BLINDFOLD_LEAD,
		rewardEm: VOUCHER_IDS.BODY_LICK,
		stampId: 'stamp_safe',
	},
	{
		id: 'day3_dinner',
		dayId: 3,
		time: '20:00',
		titleAnh: 'Đại Gia Cá Tầm',
		titleEm: 'Thực Thần Sang Chảnh',
		descriptionAnh: 'Ăn tối Lẩu Cá Tầm/Thắng Cố tại A Quỳnh. Bữa ăn sang nhất chuyến đi!',
		descriptionEm: 'Ăn sập Sapa. Thử món Thắng Cố (nếu dám) hoặc Cá Tầm. Đánh giá món ăn.',
		code: 'FEAST',
		rewardAnh: VOUCHER_IDS.POSE_CHOICE,
		rewardEm: VOUCHER_IDS.FINGER_PLAY,
		stampId: 'stamp_cheers',
	},

	// ==================== DAY 4: TẠM BIỆT ====================
	{
		id: 'day4_morning',
		dayId: 4,
		time: '09:00',
		titleAnh: 'Thợ Săn Nắng',
		titleEm: 'Nàng Thơ Cuối Cùng',
		descriptionAnh: 'Tranh thủ chụp nốt vài kiểu ảnh nắng sáng tại Homestay trước khi về.',
		descriptionEm: 'Lưu lại những khoảnh khắc cuối cùng tại "Nhà". Cười thật tươi!',
		code: 'SUNNY',
		rewardAnh: VOUCHER_IDS.SHOWER_SEX,
		rewardEm: VOUCHER_IDS.HICKEY_MARK,
		stampId: 'stamp_coffee',
	},
	{
		id: 'day4_checkout',
		dayId: 4,
		time: '11:30',
		titleAnh: 'Thủ Quỹ Tổng Kết',
		titleEm: 'Giám Sát Viên',
		descriptionAnh: 'Thanh toán hóa đơn ăn tối hôm đầu. Trả phòng. Tạm biệt Chill With Home.',
		descriptionEm: 'Kiểm tra lại hành lý lần cuối. "Có quên anh người yêu không đấy?".',
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
