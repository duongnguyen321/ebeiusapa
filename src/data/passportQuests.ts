// Quest data for the Love Passport feature
// Based on docs/feature_love_passport.md

export interface PassportQuest {
	id: string;
	dayId: number;
	time: string;
	titleAnh: string;
	titleEm: string;
	descriptionAnh: string;
	descriptionEm: string;
	code: string;
	reward: string;
	stampId?: string;
}

// Generate a simple code from quest ID
function generateCode(id: string): string {
	// Simple hash to 4 digits
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		const char = id.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash % 10000)
		.toString()
		.padStart(4, '0');
}

export const passportQuests: PassportQuest[] = [
	// DAY 1: THE RECOVERY
	{
		id: 'day1_arrival',
		dayId: 1,
		time: '14:00',
		titleAnh: 'Safe Landing',
		titleEm: 'Chế độ Công Chúa',
		descriptionAnh:
			'Gọi Taxi ngay (0214 363 63 63). Tuyệt đối không để Em xách nặng. Xách đồ lên xe xong thì nhập code.',
		descriptionEm:
			'Em được quyền nhõng nhẽo. Không cần làm gì cả. Chờ Anh nhập code nhé!',
		code: 'ARRIVED',
		reward: 'Mở khóa "Chế độ công chúa" 👑',
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_tea',
		dayId: 1,
		time: '14:30',
		titleAnh: 'Ginger Hero',
		titleEm: 'Warm Hug',
		descriptionAnh:
			'Xin lễ tân Sapa House 1 cốc trà gừng nóng ngay khi nhận phòng. Mang trà cho Em xong nhập code.',
		descriptionEm:
			'Uống trà và ôm Anh để hồi phục tiền đình. Chờ anh mang trà nhé!',
		code: 'WARM',
		reward: 'Em nhận thẻ "Phiếu Bé Ngoan" 🌟',
		stampId: 'stamp_tea',
	},
	{
		id: 'day1_dinner',
		dayId: 1,
		time: '18:30',
		titleAnh: 'The Cốn Sủi Hunter',
		titleEm: 'Đố Em biết!',
		descriptionAnh:
			'Đến quán Ông Há (436 ĐBP). Order bát Cốn Sủi nóng hổi, *không cay*. Khi em ăn xong tick "Đã ăn".',
		descriptionEm:
			'"Cốn Sủi" nghĩa là gì?\n(A. Phở khan / B. Mì nước)\nĂn xong chờ anh nhập code!',
		code: 'YUMMY',
		reward: 'Mở khóa "Năng lượng phục hồi" ⚡',
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_church',
		dayId: 1,
		time: '20:00',
		titleAnh: 'Foggy Knight',
		titleEm: 'Moody Vibes',
		descriptionAnh:
			'Dắt tay Em đi dạo quanh Nhà Thờ Đá. Che ô cho Em nếu mưa. Chụp ảnh check-in rồi nhập code.',
		descriptionEm:
			'Chụp ảnh dưới ánh đèn vàng mờ ảo của quảng trường. Làm dáng đẹp cho anh chụp!',
		code: 'FOGGY',
		reward: 'Mở khóa Quest ngày mai 🔓',
		stampId: 'stamp_church',
	},

	// DAY 2: THE BIRTHDAY
	{
		id: 'day2_cake',
		dayId: 2,
		time: '09:00',
		titleAnh: 'The Sneaky Cake',
		titleEm: 'Mirror Mirror',
		descriptionAnh:
			'Gọi điện confirm lại bánh với tiệm Chị Híp (14 Thác Bạc) lúc Em đang ngủ/tắm. Confirm xong nhập code.',
		descriptionEm:
			'Chụp 1 tấm selfie trước gương với OOTD màu Trắng/Đỏ. Chuẩn bị xinh đẹp đi!',
		code: 'CAKE',
		reward: 'Pop-up: "Chuẩn bị xinh đẹp đi!" 💄',
		stampId: 'stamp_cake',
	},
	{
		id: 'day2_cafe',
		dayId: 2,
		time: '11:00',
		titleAnh: 'Le Gecko Chill',
		titleEm: 'Paris in Sapa',
		descriptionAnh:
			'Tìm góc ban công nhìn ra hồ tại Le Gecko (02 Ngũ Chỉ Sơn). Order xong nhập code.',
		descriptionEm:
			'Em muốn uống gì? (Cacao nóng / Cafe trứng). Chờ anh order nhé!',
		code: 'CAFE',
		reward: 'Mở khóa playlist nhạc Pháp 🎵',
		stampId: 'stamp_cafe',
	},
	{
		id: 'day2_supply',
		dayId: 2,
		time: '13:00',
		titleAnh: 'Supply Run',
		titleEm: 'Music DJ',
		descriptionAnh:
			'Ghé siêu thị Xuân Trường mua Nến, Rượu vang, Snack cho tiệc đêm. Mua đủ đồ nhập code.',
		descriptionEm:
			'Chọn bài hát sẽ bật trong lúc tắm lá thuốc. Duyệt danh sách nhạc nhé!',
		code: 'READY',
		reward: 'Em duyệt danh sách nhạc 🎶',
		stampId: 'stamp_supply',
	},
	{
		id: 'day2_spa',
		dayId: 2,
		time: '14:30',
		titleAnh: 'Red Dao Healer',
		titleEm: 'Herbal Immersion',
		descriptionAnh:
			'Đưa Em đến Sapa Green Spa. Chọn bồn gỗ Pơ-mu. Thanh toán xong nhập code.',
		descriptionEm:
			'Ngâm lá thuốc 20p. Hít sâu mùi thảo mộc. Thư giãn thôi nào!',
		code: 'RELAX',
		reward: 'Voucher "Massage tay 10p" (Anh tự làm) 💆',
		stampId: 'stamp_spa',
	},
	{
		id: 'day2_dinner',
		dayId: 2,
		time: '17:30',
		titleAnh: 'Sturgeon King',
		titleEm: 'Food Critic',
		descriptionAnh:
			'Tại A Quỳnh (15 Thạch Sơn): Gắp miếng sụn cá tầm giòn nhất cho Em. Cụng ly xong cùng nhập CHEERS.',
		descriptionEm:
			'Đánh giá món Lẩu Cá Tầm: 1-5 sao? Cụng ly cùng anh nhé!',
		code: 'CHEERS',
		reward: 'Pháo hoa nổ! Confetti celebration! 🎆',
		stampId: 'stamp_cheers',
	},
	{
		id: 'day2_birthday',
		dayId: 2,
		time: '21:00',
		titleAnh: 'Make a Wish',
		titleEm: 'Blow the Candles',
		descriptionAnh:
			'Thắp nến, tắt đèn, hát Happy Birthday. Chờ em thổi nến xong nhập code.',
		descriptionEm:
			'Thổi nến và ước. Mở quà của Anh. Bấm nút khi thổi nến xong!',
		code: 'WISH',
		reward: 'Pháo hoa & lời chúc đặc biệt 🎂',
		stampId: 'stamp_birthday',
	},

	// DAY 3: THE ADVENTURE
	{
		id: 'day3_hamrong',
		dayId: 3,
		time: '09:00',
		titleAnh: 'Cloud Hunter',
		titleEm: 'High Fashion',
		descriptionAnh:
			'Dẫn đường lên Vườn Lan 1 -> Sân Mây (đỉnh cao nhất). Chụp đủ 3 tấm rồi nhập code.',
		descriptionEm:
			'Tạo 3 dáng khác nhau: Quay lưng, Vuốt tóc, Cười tỏa nắng. Làm model đẹp nhé!',
		code: 'PEAK',
		reward: 'Mở khóa huy hiệu "Nhà leo núi" 🏔️',
		stampId: 'stamp_peak',
	},
	{
		id: 'day3_lunch',
		dayId: 3,
		time: '12:00',
		titleAnh: 'Peppery Chicken',
		titleEm: 'Spicy Level',
		descriptionAnh:
			'Tại Hải Lâm (69 Xuân Viên): Xé gà nướng tiêu xanh và bón cho Em. Ăn xong nhập code.',
		descriptionEm:
			'Thử độ cay của sốt tiêu xanh. (Cay / Vừa / Ngon). Đánh giá nhé!',
		code: 'SPICY',
		reward: 'Mở khóa "Nụ hôn vị tiêu" 💋',
		stampId: 'stamp_chicken',
	},
	{
		id: 'day3_catcat',
		dayId: 3,
		time: '15:00',
		titleAnh: 'Stream & Wheel',
		titleEm: 'Costume Try-on',
		descriptionAnh:
			'Chụp ảnh tại Guồng Nước khổng lồ và Cầu Si. Chụp xong nhập code.',
		descriptionEm:
			'(Optional) Thử đồ dân tộc H\'mông nếu thích. Làm đẹp cho anh chụp!',
		code: 'STREAM',
		reward: 'Lưu ảnh vào "Passport Gallery" 📸',
		stampId: 'stamp_catcat',
	},
	{
		id: 'day3_return',
		dayId: 3,
		time: '16:30',
		titleAnh: 'No Climbing',
		titleEm: 'Enjoy the Ride',
		descriptionAnh:
			'BẮT BUỘC thuê xe ôm ngay bãi xe cuối bản để chở ngược lên. Không cho Em đi bộ! Về đến thị trấn nhập code.',
		descriptionEm:
			'Ôm chặt Anh (hoặc bác xe ôm) lên dốc. Thư giãn thôi!',
		code: 'SAFE',
		reward: '"Anh xót chân em lắm" 💕',
		stampId: 'stamp_safe',
	},

	// DAY 4: THE FAREWELL
	{
		id: 'day4_packing',
		dayId: 4,
		time: '08:00',
		titleAnh: 'Luggage Master',
		titleEm: 'Souvenir Check',
		descriptionAnh:
			'Rà soát gầm giường, nhà tắm, tủ quần áo (Sạc, Mĩ phẩm, Quần áo). Check xong bấm "All Clear".',
		descriptionEm:
			'Đã đóng gói kỹ rượu/đồ dễ vỡ chưa? Confirm với anh nhé!',
		code: 'CLEAR',
		reward: 'Sẵn sàng lên đường! ✅',
		stampId: 'stamp_packing',
	},
	{
		id: 'day4_coffee',
		dayId: 4,
		time: '10:00',
		titleAnh: 'Cloud Coffee',
		titleEm: 'Love Letter',
		descriptionAnh:
			'Tại Viettrekking (33 Hoàng Liên): Tìm view thấy tàu hỏa leo núi Mường Hoa. Đưa máy cho nhau đọc lời nhắn.',
		descriptionEm:
			'Viết 3 điều thích nhất chuyến đi này vào App. Chia sẻ với anh nhé!',
		code: 'LOVE',
		reward: 'Đọc lời nhắn bí mật của nhau 💌',
		stampId: 'stamp_coffee',
	},
	{
		id: 'day4_checkout',
		dayId: 4,
		time: '12:00',
		titleAnh: 'Bill Settler',
		titleEm: 'Ready to Go',
		descriptionAnh:
			'Thanh toán tiền phòng và các chi phí phát sinh. Cùng nhấn HOME trên 2 máy.',
		descriptionEm:
			'Check-out xong xuôi. Tạm biệt Sapa House. Cùng nhấn HOME với anh!',
		code: 'HOME',
		reward: 'Kết thúc hành trình Passport - Video Recap! 🏠',
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
