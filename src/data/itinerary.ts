// ==================== TYPES ====================

export interface PhotoTip {
	angle: string;
	pose: string;
	time?: string;
	tips?: string;
}

export interface TimelineItem {
	time: string;
	title: string;
	description?: string;
	address?: string;
	hotline?: string;
	note?: string;
	isHighlight?: boolean;
	distance?: string;
	transport?: string;
	photoTips?: PhotoTip;
	warnings?: string[];
	type?: 'meal' | 'activity' | 'transport' | 'rest' | 'spa' | 'shopping';
}

export interface DaySchedule {
	id: number;
	date: string;
	dateLabel: string;
	title: string;
	theme: string;
	goals: string[];
	weather: {
		icon: string;
		description: string;
		temp: string;
	};
	outfit: string;
	timeline: TimelineItem[];
	isBirthday?: boolean;
	warnings?: string[];
}
export interface EmergencyContact {
	name: string;
	phone: string;
	icon: string;
}

export interface PackingCategory {
	title: string;
	items: string[];
}

export interface PackingList {
	boy: PackingCategory[];
	girl: PackingCategory[];
}

export interface PlanB {
	condition: string;
	place: string;
	activity: string;
	benefit: string;
}

export interface TripInfo {
	hotel: {
		name: string;
		address: string;
		phone?: string;
		checkIn: string;
		checkOut: string;
		includes: string[];
	};
	transport: {
		company: string;
		departure: string;
		arrival: string;
		returnDeparture: string;
		returnArrival: string;
	};
	packingList: PackingList;
	planB: PlanB;
}

// ==================== TRIP INFO ====================

export const tripInfo: TripInfo = {
	hotel: {
		name: 'Chill With Home Sapa',
		address: '22 Cát Cát, thị trấn Sapa',
		phone: '0983 994 867',
		checkIn: '14:15 ngày 15/01',
		checkOut: '11:30 ngày 18/01',
		includes: [
			'Giường siêu êm - Nơi những giấc mơ đẹp bắt đầu',
			'Không gian yên tĩnh - Để ta thủ thỉ lời yêu',
			'Gương lớn toàn thân - Ngắm nhìn nàng thơ của anh',
		],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân (Chuyến xe tình yêu)',
		departure: '14:00 Đến Sapa -> Xe trung chuyển đón',
		arrival: 'Tới nơi để bắt đầu những ngày ngọt ngào',
		returnDeparture: '12:00 Xe trung chuyển đón -> 14:00 Xe chạy',
		returnArrival: 'Về nhà để "yêu" tiếp',
	},
	packingList: {
		boy: [
			{
				title: 'Trang phục',
				items: [
					'1 Áo khoác đại hàn (Màu tối/trung tính)',
					'2 Áo len/Hoodie',
					'Quần Jeans/Kaki thoải mái',
				],
			},
			{
				title: 'Thiết bị',
				items: ['Sạc dự phòng (quan trọng)', 'Khăn giấy ướt (lau tay khi ăn)'],
			},
			{
				title: 'Đồ sinh tồn',
				items: [
					'4 Hộp mì ly/Phở gói (đề phòng dậy muộn)',
					'2 Gói xúc xích ăn liền',
					'Đồ ăn vặt (Bim bim, kẹo) nhâm nhi rượu vang',
				],
			},
		],
		girl: [
			{
				title: 'Set 1 (Tối N1 - Chill Homestay)',
				items: [
					'Đồ bộ Pijama nỉ lông/hình thú cute',
					'Hoặc set len tăm thoải mái (Màu: Be/Hồng phấn)',
				],
			},
			{
				title: 'Set 2 (Ngày 2 - Sinh nhật)',
				items: [
					'Váy len body + Áo khoác dạ dáng dài/Măng tô',
					'Phụ kiện: Mũ nồi + Boot cao cổ',
					'Màu: Đỏ đô/Trắng kem/Nâu tây (Sang chảnh)',
				],
			},
			{
				title: 'Set 3 (Tối N2 - Party)',
				items: [
					'Váy lụa 2 dây sexy (nếu phòng ấm)',
					'Hoặc váy len trễ vai quyến rũ',
				],
			},
			{
				title: 'Set 4 (Ngày 3 - Vintage/Đi bộ)',
				items: [
					'Chân váy dài xếp ly/thổ cẩm + Áo len thụng + Khăn choàng',
					'Màu: Vàng mù tạt, Nâu đất, Xanh rêu',
					'Giày: Sneaker/Đế bằng (Bắt buộc)',
				],
			},
		],
	},
	planB: {
		condition: 'Khi trời mưa hoặc quá lạnh (thay thế Moana/Hàm Rồng)',
		place: 'Khách sạn De La Coupole (MGallery) - Sun Plaza',
		activity: 'Cafe Cacao Patisserie: Chocolate nóng + Bánh ngọt',
		benefit: 'Không gian sang chảnh như cung điện Pháp, ấm áp, chụp ảnh đẹp',
	},
};

// ==================== EMERGENCY CONTACTS ====================

export const emergencyContacts: EmergencyContact[] = [
	{ name: 'Taxi Xanh Sapa', phone: '0214 3 63 63 63', icon: '🚕' },
	{ name: 'Tiệm Bánh Chị Híp', phone: '0974 511 568', icon: '🎂' },
	{ name: 'Nhà hàng A Phủ', phone: '0868 159 900', icon: '🐟' },
	{ name: 'Thắng Cố A Quỳnh', phone: '0214 3871 555', icon: '🍲' },
	{ name: "Dao's Center (Spa)", phone: '0917 822 844', icon: '💆‍♀️' },
	{ name: 'Chill With Home', phone: '0983 994 867', icon: '🏡' },
];

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	{
		id: 1,
		date: '2026-01-15',
		dateLabel: 'Thứ 5, 15/01',
		title: 'Hibernation - Ngủ Đông ❄️',
		theme: 'Nghỉ ngơi & Ấm áp',
		goals: [
			'Check-in và... ngủ bù',
			'Ăn tối tại Homestay cho tiện',
			'Chụp ảnh lung linh tại khuôn viên',
		],
		weather: {
			icon: '🌧️',
			description: 'Lạnh, có thể mưa phùn. 8-14°C.',
			temp: '14°C',
		},
		outfit: 'Đồ nỉ ấm, đồ ngủ đôi dễ thương. Ở trong phòng là chính.',
		warnings: [
			'Nhớ đặt suất ăn tối lúc 14:15 ngay khi check-in',
			'Kéo rèm, tắt chuông điện thoại để ngủ trọn vẹn',
		],
		timeline: [
			{
				time: '14:00 - 14:15',
				title: 'Chào Sapa',
				description:
					'Xe đến bến. Xe trung chuyển đưa về Homestay. Hít thở không khí lạnh đầu tiên.',
				address: 'Bến xe Sapa',
				type: 'transport',
			},
			{
				time: '14:15',
				title: 'Check-in Chill With Home',
				description:
					'Nhận phòng. *Hành động ngay:* Đặt lẩu gà/BBQ cho bữa tối lúc 20:30.',
				address: '22 Cát Cát',
				note: 'Dặn lễ tân: "Bọn mình ngủ say, đúng 20h30 hãy gọi bọn mình dậy ăn nhé"',
				type: 'rest',
			},
			{
				time: '14:30 - 20:00',
				title: 'NGỦ ĐÔNG (HIBERNATION)',
				description:
					'Kéo rèm, bật sưởi, đắp chăn bông và ôm nhau ngủ. Bù lại quãng đường di chuyển mệt mỏi.',
				note: 'Tắt chuông điện thoại. Chỉ có đôi ta và giấc ngủ.',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '20:00 - 20:30',
				title: 'Đánh thức công chúa',
				description: 'Dậy vệ sinh cá nhân, thay đồ ngủ đôi cute.',
				type: 'rest',
			},
			{
				time: '20:30',
				title: 'Bữa tối ấm cúng',
				description:
					'Ăn tối ngay tại Homestay (Lẩu gà hoặc BBQ). Không cần đi đâu xa, vừa ăn vừa ngắm sương mù.',
				address: 'Chill With Home',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '21:30',
				title: 'Sống ảo tại gia',
				description:
					'Chụp ảnh tại ban công view thung lũng, lò sưởi. Chụp góc cao lấy mặt bạn nữ và cốc trà nóng.',
				photoTips: {
					angle: 'High angle (trên xuống)',
					pose: 'Ngồi co chân, quấn chăn, nhắm mắt enjoy',
					tips: 'Bạn nam đứng cao hơn bấm máy',
				},
				type: 'activity',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 6, 16/01',
		title: 'Relax & Spa Day 💆‍♀️',
		theme: 'Sang chảnh & Thư giãn',
		goals: [
			'Chụp bộ ảnh cháy máy ở Sun Plaza',
			'Tắm lá thuốc thư giãn',
			'Tận hưởng buổi tối lãng mạn',
		],
		weather: {
			icon: '⛅',
			description: 'Mây và nắng, lạnh khô. Ngày đẹp nhất để lên phố.',
			temp: '15°C',
		},
		outfit:
			'Sáng/Chiều: Váy len body + Áo măng tô + Boot (Sang chảnh). Tối: Váy lụa sexy/Váy ngủ.',
		warnings: ['Lúc 10h sáng nhớ nhắn tin chốt Bánh Kem!'],
		timeline: [
			{
				time: 'Sáng - 12:00',
				title: 'Ngủ nướng & Chuẩn bị',
				description:
					'Ngủ thoải mái. 12:00: Nàng makeup lồng lộn để chuẩn bị lên phố.',
				note: 'Hãy chuẩn bị một tâm hồn đẹp',
				type: 'rest',
			},
			{
				time: '12:30',
				title: 'Lên phố',
				description: 'Gọi Taxi Xanh lên trung tâm (Dốc ngược).',
				hotline: '0214 3 63 63 63',
				type: 'transport',
			},
			{
				time: '13:00',
				title: 'Ăn trưa: Cốn Sủi Ông Há',
				description:
					'Ăn nhanh gọn để dành bụng tối ăn tiệc. Cốn sủi + Sủi cảo chiên.',
				address: '591 Điện Biên Phủ',
				type: 'meal',
			},
			{
				time: '14:00 - 16:00',
				title: 'Sống ảo Sun Plaza',
				description: 'Check-in cháy máy tại Sun Plaza & Nhà Thờ Đá.',
				address: 'Trung tâm thị trấn',
				photoTips: {
					angle: 'Hất từ dưới lên lấy trọn tòa nhà và chân dài',
					pose: 'Giả vờ sang đường, quay lại cười',
					tips: 'Đứng bên kia đường chụp sang',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '16:00 - 17:00',
				title: 'Cafe ngắm phố',
				description:
					'Cộng Cafe hoặc Viettrekking. Thưởng thức ly cafe nóng giữa tiết trời se lạnh.',
				type: 'rest',
			},
			{
				time: '17:00 - 17:30',
				title: 'Di chuyển đến Spa',
				description: "Đến Dao's Center (26 Đồng Lợi).",
				type: 'transport',
			},
			{
				time: '17:30 - 19:30',
				title: 'Tắm lá thuốc Dao Đỏ',
				description: 'Ngâm bồn gỗ thư giãn. Xả hơi sau khi đi bộ chụp ảnh.',
				address: "Dao's Center",
				warnings: ['Ngâm 20 phút thôi kẻo say thuốc'],
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '19:30 - 20:30',
				title: 'Mua đồ tiệc Chợ Đêm',
				description:
					'Đi bộ ra Chợ đêm Sapa. Mua cơm lam, thịt nướng, trâu gác bếp mang về.',
				address: 'Chợ đêm',
				note: 'Mua nhiều chút để ăn đêm luôn',
				type: 'shopping',
			},
			{
				time: '20:30',
				title: 'Về ổ chiến thuật',
				description: 'Taxi thẳng về Homestay. Chuẩn bị "hành sự".',
				type: 'transport',
			},
			{
				time: '21:00',
				title: 'Bí Mật Ngọt Ngào 🤫',
				description: 'Một bất ngờ nho nhỏ dành riêng cho em. Hãy chờ xem nhé!',
				type: 'activity',
				isHighlight: true,
				note: 'Nhắm mắt lại và chờ đợi',
			},
		],
		isBirthday: true,
	},
	{
		id: 3,
		date: '2026-01-17',
		dateLabel: 'Thứ 7, 17/01',
		title: 'Cá Hồi, Thắng Cố & Vintage Walk 🏔️',
		theme: 'Thiên nhiên & Ẩm thực',
		goals: [
			'Chinh phục Hàm Rồng (nhẹ nhàng)',
			'Check-in Hồ Vô Cực Moana',
			'Đi bộ Downhill ngắm hoàng hôn',
			'Đại tiệc Thắng Cố/Cá Tầm',
		],
		weather: {
			icon: '🌤️',
			description: 'Hửng nắng, có thể mưa nhẹ. Chiều đi bộ đẹp.',
			temp: '17°C',
		},
		outfit:
			'Style Vintage: Váy da/thổ cẩm + Áo len thụng + Khăn to bản. MÀU VÀNG/NÂU/RÊU. Giày sneaker/đế bằng.',
		warnings: ['Tự mua đồ ăn nhẹ/nước uống dọc đường nếu đói'],
		timeline: [
			{
				time: 'Sáng - 12:00',
				title: 'Ngủ nướng part 2',
				description:
					'Dậy muộn. Ăn sáng nhẹ mì ly/xúc xích tại phòng. Pha cafe ngắm view.',
				note: 'Tiết kiệm sức lực cho buổi chiều',
				type: 'rest',
			},
			{
				time: '12:30',
				title: 'Lên đường',
				description: 'Taxi lên thẳng Cổng Núi Hàm Rồng.',
				type: 'transport',
			},
			{
				time: '13:00 - 15:00',
				title: 'Leo núi Hàm Rồng',
				description: 'Chỉ leo đến Vườn Lan và Sân Mây (tầng 1).',
				address: 'Khu du lịch Hàm Rồng',
				photoTips: {
					angle: 'Chụp giữa vườn hoa',
					pose: 'Ngồi trên mỏm đá nhìn xuống thị trấn',
				},
				note: 'Nếu đói thì mua đồ ăn vặt dọc đường nha',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '15:00',
				title: 'Sang Moana Sapa',
				description: 'Taxi sang 68 Violet (Cách 1km).',
				type: 'transport',
			},
			{
				time: '15:15 - 17:00',
				title: 'Sống ảo Moana',
				description: 'Check-in Tượng cô gái, Hồ vô cực, Cổng trời.',
				address: 'Moana Sapa',
				photoTips: {
					angle: 'Hồ vô cực: Hạ thấp máy sát mặt nước lấy bóng phản chiếu',
					pose: 'Ngồi trên phím đàn, nghiêng mặt 45 độ',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '17:00',
				title: 'Walk Downhill',
				description:
					'Đi bộ xuôi dốc từ Moana về Homestay (22 Cát Cát). Ngắm hoàng hôn thung lũng.',
				warnings: ['Nếu mưa/đất ướt thì HUỶ đi bộ -> Gọi Taxi'],
				type: 'activity',
			},
			{
				time: '18:00 - 19:30',
				title: 'Nghỉ ngơi',
				description:
					'Về phòng thay đồ ấm, chuẩn bị đi ăn bữa sang nhất chuyến đi.',
				type: 'rest',
			},
			{
				time: '20:00',
				title: 'Đại tiệc Sapa',
				description: 'Ăn Lẩu Cá Tầm hoặc Thắng Cố + Rượu ngô.',
				address: 'Thắng Cố A Quỳnh (15 Thạch Sơn)',
				type: 'meal',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
	{
		id: 4,
		date: '2026-01-18',
		dateLabel: 'Chủ nhật, 18/01',
		title: 'Tạm Biệt Sapa 👋',
		theme: 'Lưu luyến',
		goals: [
			'Săn nốt ảnh nắng sáng',
			'Thanh toán & Check-out',
			'Về Hà Nội an toàn',
		],
		weather: {
			icon: '☀️',
			description: 'Nắng đẹp. 15°C.',
			temp: '15°C',
		},
		outfit: 'Thoải mái để đi xe.',
		warnings: ['Kiểm tra kỹ hành lý, sạc điện thoại'],
		timeline: [
			{
				time: '08:00',
				title: 'Dậy sớm',
				description: 'Thu dọn đồ đạc.',
				type: 'rest',
			},
			{
				time: '08:30',
				title: 'Ăn sáng',
				description: 'Ăn nhẹ tại homestay hoặc ra đầu bản ăn bún/phở.',
				type: 'meal',
			},
			{
				time: '09:00 - 11:00',
				title: 'Vớt vát kỷ niệm',
				description:
					'Tranh thủ chụp nốt vài kiểu ảnh tại Homestay lúc có nắng sáng đẹp.',
				type: 'activity',
			},
			{
				time: '11:00',
				title: 'Check-out',
				description: 'Thanh toán tiền ăn tối hôm đầu. Trả phòng.',
				type: 'transport',
			},
			{
				time: '12:00',
				title: 'Xe đón',
				description: 'Xe trung chuyển đón ra bến xe.',
				type: 'transport',
			},
			{
				time: '14:00 - 15:00',
				title: 'Về Hà Nội',
				description: 'Lên xe giường nằm. Tạm biệt Sapa.',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T14:00:00');
