export type HeatLevel = 'warm' | 'hot' | 'scorching';

export interface SwipeCard {
	id: number;
	content: string;
	heatLevel: HeatLevel;
}

// Level 1: Warm (Khởi động)
const warmCards: SwipeCard[] = [
	{ id: 1, content: 'Massage vai cho nhau 3 phút', heatLevel: 'warm' },
	{ id: 2, content: 'Tắm chung (không sex)', heatLevel: 'warm' },
	{ id: 3, content: 'Cùng nhau uống một ly rượu giao bôi', heatLevel: 'warm' },
	{ id: 4, content: 'Ôm nhau ngủ khỏa thân', heatLevel: 'warm' },
	{ id: 5, content: 'Ngồi lên đùi anh/em và hôn', heatLevel: 'warm' },
	{ id: 6, content: 'Anh sấy tóc cho em', heatLevel: 'warm' },
	{ id: 7, content: 'Đút cho nhau ăn một món gì đó', heatLevel: 'warm' },
	{
		id: 8,
		content: 'Chụp một bức ảnh hôn nhau trước gương',
		heatLevel: 'warm',
	},
	{
		id: 9,
		content: 'Thì thầm một lời khen sến súa vào tai',
		heatLevel: 'warm',
	},
	{ id: 10, content: 'Vuốt ve lưng trần', heatLevel: 'warm' },
	{ id: 11, content: 'Hôn sâu kiểu Pháp trong 1 phút', heatLevel: 'warm' },
	{ id: 12, content: 'Cởi đồ cho nhau (chậm rãi)', heatLevel: 'warm' },
	{ id: 13, content: 'Nhảy một điệu slow dance không nhạc', heatLevel: 'warm' },
	{ id: 14, content: 'Kể về "lần đầu tiên" của chúng ta', heatLevel: 'warm' },
	{
		id: 15,
		content: 'Soi gương cùng nhau và chỉ ra điểm sexy của đối phương',
		heatLevel: 'warm',
	},
	{ id: 16, content: 'Nghịch tóc nhau', heatLevel: 'warm' },
	{ id: 17, content: 'Hôn lên trán', heatLevel: 'warm' },
	{ id: 18, content: 'Cắn nhẹ vào vai', heatLevel: 'warm' },
	{ id: 19, content: 'Nắm tay và nhìn vào mắt nhau', heatLevel: 'warm' },
	{ id: 20, content: 'Mặc áo sơ mi của anh (đối với nữ)', heatLevel: 'warm' },
	{ id: 21, content: 'Đắp mặt nạ chung', heatLevel: 'warm' },
	{ id: 22, content: 'Uống chung một cốc nước', heatLevel: 'warm' },
	{ id: 23, content: 'Gối đầu tay ngủ', heatLevel: 'warm' },
	{ id: 24, content: 'Cù lét nhau', heatLevel: 'warm' },
	{ id: 25, content: 'Chơi oẳn tù tì, ai thua cởi 1 món', heatLevel: 'warm' },
	{ id: 26, content: 'Đoán màu đồ lót đang mặc', heatLevel: 'warm' },
	{ id: 27, content: 'Sờ bụng/cơ bụng', heatLevel: 'warm' },
	{ id: 28, content: 'Hôn lên mí mắt', heatLevel: 'warm' },
	{ id: 29, content: 'Cõng nhau đi một vòng phòng', heatLevel: 'warm' },
	{ id: 30, content: 'Selfie kiểu mặt xấu', heatLevel: 'warm' },
];

// Level 2: Hot (Kích thích)
const hotCards: SwipeCard[] = [
	{ id: 31, content: 'Tắm chung (có đụng chạm nhạy cảm)', heatLevel: 'hot' },
	{ id: 32, content: 'Oral (nhẹ nhàng)', heatLevel: 'hot' },
	{ id: 33, content: 'Body shot (Uống rượu trên cơ thể)', heatLevel: 'hot' },
	{ id: 34, content: 'Múa thoát y (Striptease)', heatLevel: 'hot' },
	{ id: 35, content: 'Dùng đá lạnh chạy dọc sống lưng', heatLevel: 'hot' },
	{ id: 36, content: 'Hôn dọc đùi trong', heatLevel: 'hot' },
	{ id: 37, content: 'Dùng miệng cởi đồ lót', heatLevel: 'hot' },
	{ id: 38, content: 'Massage bằng dầu toàn thân (Nude)', heatLevel: 'hot' },
	{ id: 39, content: 'Bịt mắt và đoán vật chạm vào người', heatLevel: 'hot' },
	{ id: 40, content: 'Trói tay bằng cà vạt/khăn', heatLevel: 'hot' },
	{ id: 41, content: 'Làm tình trước gương', heatLevel: 'hot' },
	{ id: 42, content: 'Quay video (chỉ 2 người xem)', heatLevel: 'hot' },
	{ id: 43, content: '"Tự sướng" cho đối phương xem', heatLevel: 'hot' },
	{ id: 44, content: 'Tư thế Doggy', heatLevel: 'hot' },
	{ id: 45, content: 'Tư thế Cowgirl', heatLevel: 'hot' },
	{ id: 46, content: 'Làm tình trên ghế', heatLevel: 'hot' },
	{ id: 47, content: 'Dùng đồ chơi (nếu có mang theo)', heatLevel: 'hot' },
	{ id: 48, content: 'Dirty talk (Nói bậy)', heatLevel: 'hot' },
	{ id: 49, content: 'Spanking (Vỗ mông) nhẹ', heatLevel: 'hot' },
	{ id: 50, content: 'Kéo tóc nhẹ khi hôn', heatLevel: 'hot' },
	{ id: 51, content: 'Cắn vào môi dưới', heatLevel: 'hot' },
	{ id: 52, content: 'Hôn ngực', heatLevel: 'hot' },
	{
		id: 53,
		content: 'Chạm vào "cô bé/cậu bé" qua lớp quần lót',
		heatLevel: 'hot',
	},
	{ id: 54, content: 'Giả vờ là người lạ gặp nhau ở bar', heatLevel: 'hot' },
	{ id: 55, content: 'Chụp ảnh sexy của đối phương', heatLevel: 'hot' },
	{ id: 56, content: 'Ăn kem/socola trên người đối phương', heatLevel: 'hot' },
	{ id: 57, content: 'Hôn chân/ngón chân', heatLevel: 'hot' },
	{
		id: 58,
		content: 'Khám phá cơ thể bằng đèn pin điện thoại',
		heatLevel: 'hot',
	},
	{ id: 59, content: 'Thử một tư thế chưa bao giờ làm', heatLevel: 'hot' },
	{ id: 60, content: 'Làm tình đứng', heatLevel: 'hot' },
	{ id: 61, content: 'Làm tình trong nhà tắm', heatLevel: 'hot' },
	{ id: 62, content: 'Cho tay vào trong quần', heatLevel: 'hot' },
	{ id: 63, content: 'Ngủ nude hoàn toàn', heatLevel: 'hot' },
	{ id: 64, content: 'Hôn kiểu người Nhện (ngược)', heatLevel: 'hot' },
	{ id: 65, content: 'Dùng lông vũ/vải mềm quét lên da', heatLevel: 'hot' },
	{ id: 66, content: 'Bế lên và làm tình', heatLevel: 'hot' },
	{ id: 67, content: 'Kẹp chân quanh hông', heatLevel: 'hot' },
	{ id: 68, content: 'Hôn mông', heatLevel: 'hot' },
	{ id: 69, content: 'Liếm vành tai', heatLevel: 'hot' },
	{ id: 70, content: 'Nhìn nhau "làm" không nói gì', heatLevel: 'hot' },
];

// Level 3: Scorching (Thiêu đốt/Kinky)
const scorchingCards: SwipeCard[] = [
	{ id: 71, content: 'Trói chặt vào giường (Bondage)', heatLevel: 'scorching' },
	{ id: 72, content: 'Bịt miệng (Gag) bằng khăn', heatLevel: 'scorching' },
	{ id: 73, content: 'Làm tình thô bạo (Rough)', heatLevel: 'scorching' },
	{ id: 74, content: 'Anal play (Cửa sau)', heatLevel: 'scorching' },
	{
		id: 75,
		content: 'Thử thách "Edging" (Kích thích nhưng không cho ra)',
		heatLevel: 'scorching',
	},
	{ id: 76, content: 'Dùng thắt lưng quất nhẹ', heatLevel: 'scorching' },
	{ id: 77, content: 'Bóp cổ nhẹ (Choking - An toàn)', heatLevel: 'scorching' },
	{
		id: 78,
		content: 'Nhổ nước bọt (Spitting - nếu thích)',
		heatLevel: 'scorching',
	},
	{
		id: 79,
		content: 'Làm tình ngoài ban công (nếu kín đáo)',
		heatLevel: 'scorching',
	},
	{
		id: 80,
		content: 'Làm tình mở cửa sổ (nghe tiếng mưa/gió)',
		heatLevel: 'scorching',
	},
	{
		id: 81,
		content: 'Cosplay (Y tá/Cảnh sát/Hầu gái)',
		heatLevel: 'scorching',
	},
	{
		id: 82,
		content: 'Phục vụ như nô lệ trong 1 tiếng',
		heatLevel: 'scorching',
	},
	{
		id: 83,
		content: 'Thử cảm giác đau nhẹ (cắn mạnh, véo)',
		heatLevel: 'scorching',
	},
	{ id: 84, content: 'Deep throat', heatLevel: 'scorching' },
	{ id: 85, content: 'Xuất lên mặt', heatLevel: 'scorching' },
	{ id: 86, content: 'Nuốt (Swallow)', heatLevel: 'scorching' },
	{ id: 87, content: 'Creampie (Bên trong)', heatLevel: 'scorching' },
	{ id: 88, content: 'Làm tình 3 hiệp trong đêm nay', heatLevel: 'scorching' },
	{ id: 89, content: 'Dùng kẹp (kẹp ngực)', heatLevel: 'scorching' },
	{
		id: 90,
		content: 'Wax play (Sáp nến nhiệt độ thấp)',
		heatLevel: 'scorching',
	},
	{
		id: 91,
		content: 'Ice play (Đá lạnh vào vùng kín)',
		heatLevel: 'scorching',
	},
	{ id: 92, content: 'Quay phim làm tình full HD', heatLevel: 'scorching' },
	{
		id: 93,
		content: 'Gọi điện cho lễ tân xin thêm khăn khi đang "làm"',
		heatLevel: 'scorching',
	},
	{ id: 94, content: 'Mặc đồ lót của đối phương', heatLevel: 'scorching' },
	{ id: 95, content: 'Thử tư thế "Vác cày qua núi"', heatLevel: 'scorching' },
	{
		id: 96,
		content: 'Làm tình marathon (lâu nhất có thể)',
		heatLevel: 'scorching',
	},
	{
		id: 97,
		content: 'Morning sex (Đánh thức bằng sex sáng mai)',
		heatLevel: 'scorching',
	},
	{
		id: 98,
		content: 'Làm tình với đèn bật sáng hoàn toàn',
		heatLevel: 'scorching',
	},
	{ id: 99, content: 'Úp mặt vào gối, mông chổng lên', heatLevel: 'scorching' },
	{
		id: 100,
		content: '🃏 JOKER: Người nhận thẻ được yêu cầu BẤT CỨ ĐIỀU GÌ',
		heatLevel: 'scorching',
	},
];

export const allSwipeCards: SwipeCard[] = [
	...warmCards,
	...hotCards,
	...scorchingCards,
];

// Get cards by heat level
export function getCardsByHeatLevel(level: HeatLevel): SwipeCard[] {
	return allSwipeCards.filter((card) => card.heatLevel === level);
}

// Shuffle cards
export function shuffleCards(cards: SwipeCard[]): SwipeCard[] {
	const shuffled = [...cards];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// Get a balanced deck (mix of all heat levels)
export function getBalancedDeck(count: number = 10): SwipeCard[] {
	const warmCount = Math.ceil(count * 0.4);
	const hotCount = Math.ceil(count * 0.4);
	const scorchingCount = count - warmCount - hotCount;

	const deck = [
		...shuffleCards(warmCards).slice(0, warmCount),
		...shuffleCards(hotCards).slice(0, hotCount),
		...shuffleCards(scorchingCards).slice(0, scorchingCount),
	];

	return shuffleCards(deck);
}

// Get progressive deck (starts warm, gets hotter)
export function getProgressiveDeck(count: number = 15): SwipeCard[] {
	const warmCount = Math.ceil(count * 0.4);
	const hotCount = Math.ceil(count * 0.4);
	const scorchingCount = count - warmCount - hotCount;

	return [
		...shuffleCards(warmCards).slice(0, warmCount),
		...shuffleCards(hotCards).slice(0, hotCount),
		...shuffleCards(scorchingCards).slice(0, scorchingCount),
	];
}

// Heat level colors
export const heatLevelColors: Record<HeatLevel, string> = {
	warm: '#22c55e', // Green
	hot: '#f97316', // Orange
	scorching: '#ef4444', // Red
};

// Heat level labels
export const heatLevelLabels: Record<HeatLevel, string> = {
	warm: 'Ấm áp 🌸',
	hot: 'Nóng bỏng 🔥',
	scorching: 'Thiêu đốt 🌋',
};
