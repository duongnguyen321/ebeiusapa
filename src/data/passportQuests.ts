// Quest data for the Love Passport feature
// Based on docs/feature_love_passport.md
import type { VoucherReward } from '../types/game';

export interface PassportQuest {
	id: string;
	dayId: number;
	time: string;
	titleAnh: string;
	titleEm: string;
	descriptionAnh: string;
	descriptionEm: string;
	code: string;
	rewardAnh: VoucherReward;
	rewardEm: VoucherReward;
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
		descriptionAnh:
			'Xe đến văn phòng. Gọi xe trung chuyển về 22 Cát Cát. Xách hết đồ, không để Em động tay.',
		descriptionEm:
			'Em là công chúa, cấm đụng tay chân. Chụp lén Anh đang khệ nệ xách đồ (nhớ dìm hàng).',
		code: 'ARRIVED',
		rewardAnh: {
			id: 'voucher-luggage',
			title: 'Được Em Đấm Lưng',
			description: 'Sử dụng voucher để yêu cầu Em đấm lưng cho Anh trong 5 phút ngay lập tức.',
			icon: '💆‍♂️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-princess-mode',
			title: 'Chế Độ Công Chúa',
			description: 'Voucher đặc quyền: Anh phải phục vụ Em A-Z trong 1 tiếng khi Em kích hoạt.',
			icon: '👑',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_checkin',
		dayId: 1,
		time: '14:15',
		titleAnh: 'Quản Gia Tận Tụy',
		titleEm: 'Nữ Hoàng Check-in',
		descriptionAnh:
			'Check-in Chill With Home. Đặt ngay Lẩu Gà/BBQ cho tối nay (20:30). Dặn lễ tân giờ ăn.',
		descriptionEm:
			'Ngồi ghế chờ xinh đẹp. Nhắc anh người yêu đặt lẩu gà ăn tối tại phòng/homestay.',
		code: 'WARM',
		rewardAnh: {
			id: 'voucher-actor',
			title: 'Voucher Ngoan Ngoãn',
			description: 'Sử dụng để yêu cầu Em phải ngoan ngoãn, không cãi lời trong 1 tiếng.',
			icon: '👋',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-queen',
			title: 'Quyền Lực Tối Thượng',
			description: 'Khi sử dụng, Anh buộc phải trả lời "Dạ, thưa Nữ Hoàng" trong 30p.',
			icon: '👸',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_tea',
	},
	{
		id: 'day1_hibernate',
		dayId: 1,
		time: '14:30',
		titleAnh: 'Gấu Ngủ Đông',
		titleEm: 'Bé Koala',
		descriptionAnh:
			'Kéo rèm, bật sưởi. Ôm Em ngủ một giấc thật ngon bù lại quãng đường đi.',
		descriptionEm:
			'Biến thành gấu Koala bám chặt lấy cây bạch đàn (là Anh). Ngủ một giấc lấy lại sức!',
		code: 'KOALA',
		rewardAnh: {
			id: 'voucher-pillow',
			title: 'Gối Ôm Cao Cấp',
			description: 'Được Em ôm ngủ cả đêm nay (cấm Em đẩy ra dù có nóng).',
			icon: '🛌',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-battery',
			title: 'Sạc Pin Tình Yêu',
			description: 'Được Anh nạp đầy 100% năng lượng yêu thương bất cứ lúc nào Em muốn.',
			icon: '🔋',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_game1',
	},
	{
		id: 'day1_dinner',
		dayId: 1,
		time: '20:30',
		titleAnh: 'Đầu Bếp Tại Gia',
		titleEm: 'Thực Thần Tại Gia',
		descriptionAnh:
			'Ăn tối tại Homestay (Lẩu Gà/BBQ). Nướng thịt/nhúng rau cho Em ăn.',
		descriptionEm:
			'Chỉ việc ngồi ăn và tận hưởng. Chụp ảnh nồi lẩu nghi ngút khói.',
		code: 'HOMESTAY',
		rewardAnh: {
			id: 'voucher-chef',
			title: 'Voucher Gắp Đồ',
			description: 'Quyền yêu cầu: Em sẽ gắp đồ ăn/cuốn thịt cho Anh trong suốt 1 bữa ăn.',
			icon: '👨‍🍳',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-foodie',
			title: 'Thẻ Bài Miễn Tử',
			description: 'Quyền ưu tiên: Em được miễn mọi việc tay chân (dọn dẹp/rửa bát) tối nay.',
			icon: '🍜',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_chill',
		dayId: 1,
		time: '21:30',
		titleAnh: 'Nhiếp Ảnh Gia Ban Công',
		titleEm: 'Nàng Thơ Bên Sưởi',
		descriptionAnh:
			'Chụp cho Em bộ ảnh "Sống ảo tại gia" ở ban công/lò sưởi. Góc High-angle.',
		descriptionEm:
			'Tạo dáng cute bên cốc trà nóng/lò sưởi. Bắt anh chụp đến khi nào ưng thì thôi.',
		code: 'CHILL',
		rewardAnh: {
			id: 'voucher-kiss',
			title: 'Voucher Nụ Hôn',
			description: 'Đổi được 1 nụ hôn (má, môi, trán) bất cứ lúc nào Anh muốn.',
			icon: '💋',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-model',
			title: 'Voucher Sống Ảo',
			description: 'Yêu cầu Anh chụp ảnh cho Em đến khi nào ưng ý thì thôi (không than vãn).',
			icon: '📸',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_church',
	},

	// ==================== DAY 2: SINH NHẬT RỰC RỠ ====================
	{
		id: 'day2_cake',
		dayId: 2,
		time: '10:00',
		titleAnh: 'Điệp Vụ Bánh Kem',
		titleEm: 'Công Chúa Ngủ Nướng',
		descriptionAnh:
			'LÉN nhắn tin chốt bánh kem với Tiệm Chị Híp (Ship 16h). Đừng để Em biết!',
		descriptionEm:
			'Ngủ nướng thỏa thích. Khi nào dậy thì make-up thật xinh đẹp (lồng lộn lên).',
		code: 'CAKE',
		rewardAnh: {
			id: 'voucher-paparazzi',
			title: 'Paparazzi',
			description: 'Được quyền chụp ảnh Em lúc mới ngủ dậy (nhưng cấm đăng).',
			icon: '📷',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-beauty',
			title: 'Xinh Đẹp Tuyệt Trần',
			description: 'Kích hoạt để Anh phải khen Em xinh đẹp mỗi 30 phút/lần.',
			icon: '💄',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cake',
	},
	{
		id: 'day2_lunch',
		dayId: 2,
		time: '13:00',
		titleAnh: 'Thợ Săn Cốn Sủi',
		titleEm: 'Thực Thần Sành Ăn',
		descriptionAnh:
			'Đưa Em đi ăn Cốn Sủi Ông Há (591 ĐBP). Gọi thêm sủi cảo chiên.',
		descriptionEm:
			'Thưởng thức đặc sản. Chụp ảnh check-in món ăn mới lạ này.',
		code: 'YUMMY',
		rewardAnh: {
			id: 'voucher-driver',
			title: 'Voucher Nụ Cười',
			description: 'Yêu cầu Em phải cười thật tươi (kể cả khi đang dỗi).',
			icon: '😊',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-taster',
			title: 'Voucher Gọi Món',
			description: 'Được quyền toàn quyền quyết định gọi món (Anh chỉ việc trả tiền).',
			icon: '🥟',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_game1',
	},
	{
		id: 'day2_sunplaza',
		dayId: 2,
		time: '14:00',
		titleAnh: 'Phó Nháy Có Tâm',
		titleEm: 'Siêu Mẫu Sun Plaza',
		descriptionAnh:
			'Chụp cháy máy cho Em tại Sun Plaza & Nhà thờ đá. Lăn xả, nằm đất chụp góc rộng.',
		descriptionEm:
			'Diễn sâu tại trời Âu (fake). Mặc váy len body sang chảnh check-in.',
		code: 'PARIS',
		rewardAnh: {
			id: 'voucher-poet',
			title: 'Voucher Hôn Má',
			description: 'Đổi được 1 cái thơm má (nếu ngoan thì được cả 2 bên).',
			icon: '📜',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-playlist',
			title: 'DJ Riêng',
			description: 'Toàn quyền quyết định nhạc trên xe/trong phòng.',
			icon: '🎵',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cafe',
	},
	{
		id: 'day2_spa',
		dayId: 2,
		time: '17:30',
		titleAnh: 'Thư Ký Tận Tâm',
		titleEm: 'Quý Cô Relax',
		descriptionAnh:
			'Check-in Dao\'s Center. Đảm bảo Em được ngâm bồn thoải mái nhất. Canh giờ 20p gọi Em.',
		descriptionEm:
			'Ngâm lá thuốc Dao Đỏ thư giãn. Tắt điện thoại, tận hưởng mùi thảo mộc.',
		code: 'RELAX',
		rewardAnh: {
			id: 'voucher-massage-man',
			title: 'Voucher Khen Ngợi',
			description: 'Đổi được 1 câu khen ngợi hoặc nịnh nọt thật lòng từ Em.',
			icon: '💆‍♂️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-relax',
			title: 'Phiếu Bé Ngoan',
			description: 'Voucher sấy tóc: Yêu cầu Anh sấy tóc cho Em sau khi tắm.',
			icon: '🧖‍♀️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_spa',
	},
	{
		id: 'day2_birthday',
		dayId: 2,
		time: '21:00',
		titleAnh: 'Chủ Tiệc Bí Mật',
		titleEm: 'Nhân Vật Chính',
		descriptionAnh:
			'Bất ngờ!! Tổ chức sinh nhật Party tại phòng. Bánh kem, nến, nhạc, quà.',
		descriptionEm:
			'Bất ngờ chưa?? Thổi nến, ước và nhận quà từ ai-mà-cũng-biết-là-ai-đấy.',
		code: 'WISH',
		rewardAnh: {
			id: 'voucher-singer',
			title: 'Ca Sĩ Opera',
			description: 'Yêu cầu Em phải vỗ tay cổ vũ cho bài hát sinh nhật lạc tông.',
			icon: '🎤',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-gift',
			title: 'Món Quà Bí Mật',
			description: 'Mở gói quà to bự (và cả món quà "Anh" nữa).',
			icon: '🎁',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_birthday',
	},

	// ==================== DAY 3: CHINH PHỤC ĐỈNH CAO ====================
	{
		id: 'day3_hamrong',
		dayId: 3,
		time: '13:00',
		titleAnh: 'Sherpa Dẫn Đường',
		titleEm: 'Nhà Leo Núi Xinh Đẹp',
		descriptionAnh:
			'Dẫn Em leo Hàm Rồng. Mục tiêu: Sân Mây. Nhớ cầm nước và đỡ Em những đoạn dốc.',
		descriptionEm:
			'Leo núi nhưng vẫn phải xinh. Lên Sân Mây ngắm toàn cảnh thị trấn.',
		code: 'PEAK',
		rewardAnh: {
			id: 'voucher-cameraman',
			title: 'Nhiếp Ảnh Gia',
			description: 'Được Em lau mồ hôi và cho uống nước.',
			icon: '📸',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-top-model',
			title: 'Huy Hiệu Leo Núi',
			description: 'Chứng nhận đã chinh phục đỉnh Hàm Rồng.',
			icon: '🏔️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_peak',
	},
	{
		id: 'day3_moana',
		dayId: 3,
		time: '15:15',
		titleAnh: 'Sống Ảo Support',
		titleEm: 'Nàng Thơ Vô Cực',
		descriptionAnh:
			'Đến Moana Sapa (68 Violet). Chụp ảnh hồ vô cực, tượng cô gái. Cầm đồ cho Em thay.',
		descriptionEm:
			'Tạo dáng bên hồ vô cực, cổng trời. Góc nghiêng thần thánh đâu, show ra!',
		code: 'MOANA',
		rewardAnh: {
			id: 'voucher-hold-bag',
			title: 'Móc Treo Đồ Di Động',
			description: 'Được Em thưởng 1 cốc nước mát lạnh.',
			icon: '👜',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-infinite-pic',
			title: 'Album Vô Cực',
			description: 'Có ngay bộ ảnh sống ảo nghìn like tại Moana.',
			icon: '🖼️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_catcat', // Reusing ID slot to avoid breaking UI map if needed, or update ID
	},
	{
		id: 'day3_walk',
		dayId: 3,
		time: '17:00',
		titleAnh: 'Người Bạn Đồng Hành',
		titleEm: 'Cô Gái Mộng Mơ',
		descriptionAnh:
			'Đi bộ Downhill từ Moana về Homestay. Nắm tay Em đi dưới hoàng hôn (nếu có).',
		descriptionEm:
			'Tản bộ ngắm cảnh thung lũng. Hít thở không khí trong lành lần cuối.',
		code: 'WALK',
		rewardAnh: {
			id: 'voucher-hero',
			title: 'Đôi Chân Vàng',
			description: 'Được Em khoác tay đi dạo lãng mạn.',
			icon: '👣',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-safe',
			title: 'Bảo Hiểm Tình Yêu',
			description: 'Anh đảm bảo đưa Em về đích an toàn, không mỏi chân (nếu mỏi Anh cõng).',
			icon: '🛡️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_safe',
	},
	{
		id: 'day3_dinner',
		dayId: 3,
		time: '20:00',
		titleAnh: 'Đại Gia Cá Tầm',
		titleEm: 'Thực Thần Sang Chảnh',
		descriptionAnh:
			'Ăn tối Lẩu Cá Tầm/Thắng Cố tại A Quỳnh. Bữa ăn sang nhất chuyến đi!',
		descriptionEm:
			'Ăn sập Sapa. Thử món Thắng Cố (nếu dám) hoặc Cá Tầm. Review ẩm thực.',
		code: 'FEAST',
		rewardAnh: {
			id: 'voucher-spender',
			title: 'Đại Gia Chịu Chi',
			description: 'Được Em đút cho ăn miếng cá ngon nhất.',
			icon: '🐟',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-snack-queen',
			title: 'Nữ Hoàng Ẩm Thực',
			description: 'Được ăn thỏa thích món đắt tiền nhất menu.',
			icon: '🍲',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cheers',
	},

	// ==================== DAY 4: TẠM BIỆT ====================
	{
		id: 'day4_morning',
		dayId: 4,
		time: '09:00',
		titleAnh: 'Thợ Săn Nắng',
		titleEm: 'Nàng Thơ Cuối Cùng',
		descriptionAnh:
			'Tranh thủ chụp nốt vài kiểu ảnh nắng sáng tại Homestay trước khi về.',
		descriptionEm:
			'Lưu lại những khoảnh khắc cuối cùng tại "Nhà". Cười thật tươi!',
		code: 'SUNNY',
		rewardAnh: {
			id: 'voucher-checker',
			title: 'Bức Ảnh Cuối',
			description: 'Có được bức ảnh đôi đẹp nhất chuyến đi.',
			icon: '📷',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-memories',
			title: 'Ký Ức Vui Vẻ',
			description: 'Gói ghém nụ cười mang về Hà Nội.',
			icon: '😊',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_coffee',
	},
	{
		id: 'day4_checkout',
		dayId: 4,
		time: '11:30',
		titleAnh: 'Thủ Quỹ Tổng Kết',
		titleEm: 'Giám Sát Viên',
		descriptionAnh:
			'Thanh toán bill ăn tối hôm đầu. Trả phòng. Tạm biệt Chill With Home.',
		descriptionEm:
			'Kiểm tra lại hành lý lần cuối. "Có quên anh người yêu không đấy?".',
		code: 'HOME',
		rewardAnh: {
			id: 'voucher-end',
			title: 'Video Recap',
			description: 'Xem lại video hành trình 4 ngày 3 đêm.',
			icon: '🎬',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-end-2',
			title: 'Kỷ Niệm Vô Giá',
			description: 'Một chuyến đi không thể nào quên.',
			icon: '💖',
			isRedeemed: false,
			isUsed: false,
		},
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
