// ==================== TYPES ====================

export interface PhotoTip {
	angle: string; // Góc chụp
	pose: string; // Gợi ý dáng
	time?: string; // Thời điểm ánh sáng đẹp
	tips?: string; // Tips thêm
}

export interface TimelineItem {
	time: string;
	title: string;
	description?: string;
	address?: string;
	hotline?: string;
	note?: string;
	isHighlight?: boolean;
	cost?: string;
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
	budgetEstimate?: string;
}

export interface EmergencyContact {
	name: string;
	phone: string;
	icon: string;
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
	budget: {
		total: string;
		hotel: string;
		transport: string;
		cake: string;
		remaining: string;
	};
	birthday: {
		date: string;
		person: string;
	};
}

// ==================== TRIP INFO ====================

export const tripInfo: TripInfo = {
	hotel: {
		name: 'Sapa House Hotel Halal Certified',
		address: '03A Thác Bạc, TT. Sapa',
		phone: '0214 387 1234',
		checkIn: '14:00 ngày 15/01',
		checkOut: '12:00 ngày 18/01',
		includes: ['Ăn sáng hàng ngày', 'Máy sưởi/đệm điện', 'Đặt bánh sinh nhật'],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân',
		departure: 'Hà Nội → Sapa, đến trước 14:00 ngày 15/01',
		arrival: '~14:00 ngày 15/01',
		returnDeparture: '14:00-15:00 ngày 18/01',
		returnArrival: '~20:00 ngày 18/01',
	},
	budget: {
		total: '6-7 triệu VNĐ',
		hotel: '2 triệu (đã thanh toán)',
		transport: '1.5 triệu (đã thanh toán)',
		cake: '250k',
		remaining: '2.25 - 3.25 triệu',
	},
	birthday: {
		date: '16/01/2026',
		person: 'Bạn gái',
	},
};

// ==================== EMERGENCY CONTACTS ====================

export const emergencyContacts: EmergencyContact[] = [
	{ name: 'Taxi Xanh Sapa', phone: '0214 363 63 63', icon: '🚕' },
	{ name: 'Taxi Mai Linh', phone: '0214 376 76 76', icon: '🚖' },
	{ name: 'Khách sạn Sapa House', phone: '0214 387 1234', icon: '🏨' },
	{ name: 'Cấp cứu', phone: '115', icon: '🏥' },
];

// ==================== FOOD GUIDE ====================

export const foodGuide = {
	mustTry: [
		{
			name: 'Cốn Sủi Ông Há',
			description: 'Phở khan nước sốt, dễ tiêu hóa, phù hợp sau say xe',
			address: '436 Điện Biên Phủ',
			price: '~50k/bát',
		},
		{
			name: 'Lẩu Cá Tầm',
			description: 'Đặc sản cao cấp, thịt dai ngọt, xương sụn ăn được',
			address: 'A Quỳnh (15 Thạch Sơn) hoặc Hotpot Center (71 Xuân Viên)',
			price: '~600-700k/nồi',
		},
		{
			name: 'Gà nướng tiêu xanh',
			description: 'Signature dish của Hải Lâm, gà đen bản địa',
			address: 'Nhà hàng Hải Lâm - 69 Xuân Viên',
			price: '~300-400k',
		},
	],
	warnings: [
		"Thắng cố có mùi nồng - chọn 'Thắng cố Kinh hóa' tại A Quỳnh nếu muốn thử",
		'Tránh cá hấp/luộc nếu không thích mùi tanh',
		'Gỏi cá hồi tươi, ít tanh - khuyên dùng',
	],
};

// ==================== SPA GUIDE ====================

export const spaGuide = {
	recommended: {
		name: 'Sapa Green Hotel Spa',
		address: '02 Hoàng Liên',
		price: '~250k/người',
		duration: '20-25 phút (tối đa)',
		features: [
			'Bồn gỗ Pơ-mu (giữ nhiệt, thơm)',
			'Nước thuốc đậm đặc từ 100+ loại thảo dược',
			'Màu huyết dụ sóng sánh',
		],
	},
	tips: [
		'Không ngâm quá 25 phút để tránh say thuốc',
		'Sau khi tắm không cần tráng nước thường',
		'Tác dụng: Lưu thông khí huyết, giải cảm, làm đẹp da',
	],
};

// ==================== SHOPPING GUIDE ====================

export const shoppingGuide = {
	items: [
		{
			name: 'Hạt dẻ rang',
			price: '~200k/kg (loại ngon)',
			where: 'Chợ đêm, gánh hàng rong',
		},
		{
			name: 'Thịt trâu gác bếp',
			price: '~800-900k/kg',
			where: "Viet's Farm, Siêu thị đặc sản Tây Bắc",
		},
		{
			name: 'Rượu táo mèo',
			price: '~100-150k/chai',
			where: 'Siêu thị Xuân Trường',
		},
	],
	tips: [
		'Mua hạt dẻ nhớ ăn thử trước',
		'Thịt trâu gác bếp nên mua gói nhỏ 500g (~400-450k)',
		'Chợ đêm mở Thứ 6-CN, 16h-22h',
	],
};

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	{
		id: 1,
		date: '2026-01-15',
		dateLabel: 'Thứ 4, 15/01',
		title: 'NHẬP CUỘC MỜ SƯƠNG',
		theme: 'Phục hồi & Thích nghi',
		goals: [
			'Ổn định chỗ ở',
			'Phục hồi sức khỏe sau say xe',
			'Làm quen khí hậu lạnh',
		],
		weather: {
			icon: '🌧️',
			description: 'Mưa phùn, Sương mù đậm đặc',
			temp: '11-15°C',
		},
		outfit:
			'Áo khoác gió dày, Ô trong suốt, Boot chống nước. Màu sáng (Đỏ/Trắng kem) để nổi bật trong sương',
		warnings: [
			'⚠️ Bạn gái say xe - NGHỈ NGƠI BẮT BUỘC đến 19h',
			'Uống trà gừng nóng để ấm bụng',
		],
		budgetEstimate: '~300-400k (ăn tối + taxi)',
		timeline: [
			{
				time: '14:00',
				title: 'Đến Sapa, Check-in khách sạn',
				description: 'Di chuyển bằng taxi từ bến xe về Sapa House Hotel',
				address: '03A Thác Bạc, TT. Sapa',
				cost: '~50k (taxi)',
				note: 'TUYỆT ĐỐI không đi bộ - cần bảo toàn sức khỏe',
				type: 'transport',
			},
			{
				time: '14:30 - 18:30',
				title: 'NGHỈ NGƠI - Phục hồi thụ động',
				description: 'Ngủ để hồi phục tiền đình sau say xe',
				note: 'Mẹo: Uống trà gừng nóng (xin lễ tân hoặc tự pha)',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '18:30 - 20:00',
				title: '🍜 Ăn tối: Cốn Sủi Ông Há',
				description:
					'Phở khan nước sốt - Món nóng, mềm, dễ tiêu hóa, hoàn hảo sau say xe',
				address: '436 Điện Biên Phủ, TT. Sapa',
				hotline: '0856 332 323',
				cost: '~100k (2 bát) + 70k taxi',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:00 - 21:30',
				title: '📸 Dạo Nhà thờ Đá (Chụp đêm)',
				description: 'Sương mù + ánh đèn vàng = Khung cảnh điện ảnh mờ ảo',
				distance: '~200m từ khách sạn',
				transport: 'Đi bộ nhẹ nhàng',
				photoTips: {
					angle:
						'Đứng bên hông nhà thờ (phía tay trái), đặt máy thấp sát đất hướng lên',
					pose: 'Đứng với ô trong suốt, nhìn về phía nhà thờ',
					time: 'Sau 20h khi đèn sáng đẹp nhất',
					tips: 'Ô trong suốt là đạo cụ thần thánh cho ảnh mưa/sương',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '22:00',
				title: 'Về khách sạn nghỉ sớm',
				description: 'Chuẩn bị sức khỏe cho ngày sinh nhật',
				type: 'rest',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 5, 16/01',
		title: 'SINH NHẬT NÀNG THƠ 🎂',
		theme: 'Thư giãn & Nuông chiều',
		goals: [
			'Ngày đặc biệt - Mọi hoạt động xoay quanh BẠN GÁI',
			'Spa trị liệu',
			'Tiệc sinh nhật lãng mạn',
		],
		weather: {
			icon: '⛅',
			description: 'Sáng mưa nhẹ, Chiều có thể hửng nắng',
			temp: '12-17°C',
		},
		outfit: 'Váy len Vintage (Trắng/Be) + Áo dạ nâu. Tông màu ấm, thanh lịch',
		warnings: [
			'Ngày sinh nhật - Ưu tiên cảm xúc và sự thoải mái',
			'Nhớ lấy bánh kem đã đặt trước',
		],
		budgetEstimate: '~1.5-1.8 triệu (spa + lẩu + đồ tiệc)',
		timeline: [
			{
				time: '09:00 - 11:00',
				title: '😴 Ngủ nướng & Ăn sáng muộn',
				description:
					'Quyền lợi của người có sinh nhật! Ăn sáng tại khách sạn (đã bao gồm)',
				note: 'Tiết kiệm chi phí bữa trưa',
				type: 'rest',
			},
			{
				time: '11:00 - 13:00',
				title: '☕ Le Gecko Café',
				description:
					'Café phong cách Pháp, không gian ấm cúng, view hồ Sapa mờ sương',
				address: '02 Ngũ Chỉ Sơn (Khu hồ trung tâm)',
				hotline: '0214 387 1224',
				cost: '~150k',
				distance: '~500m từ khách sạn',
				transport: 'Đi bộ hoặc taxi (~40k)',
				photoTips: {
					angle: 'Ngồi trong nhà kính nhìn ra hồ',
					pose: 'Cầm ly Cacao nóng, nhìn ra cửa sổ',
					tips: 'Gọi Café trứng hoặc Cacao - Đồ uống signature',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: '🛍️ Mua đồ sinh nhật',
				description: 'Ghé siêu thị mua rượu vang, nến, snack + Lấy bánh kem',
				address:
					'Siêu thị Xuân Trường: 46 Ngũ Chỉ Sơn | Bánh: Tiệm chị Híp - 14 Thác Bạc',
				hotline: '0974 511 568 (Tiệm bánh)',
				cost: 'Bánh 250k + Đồ siêu thị ~200k',
				type: 'shopping',
			},
			{
				time: '14:30 - 17:00',
				title: '💆 Tắm lá thuốc Dao Đỏ - Sapa Green Spa',
				description:
					'Trải nghiệm MUST-DO! Bồn gỗ Pơ-mu, nước thuốc đậm đặc 100+ loại thảo dược',
				address: '02 Hoàng Liên',
				hotline: '0214 387 2222',
				cost: '~500k (2 người)',
				transport: 'Taxi khứ hồi ~70k',
				warnings: [
					'Chỉ ngâm tối đa 20-25 phút để tránh say thuốc',
					'Sau khi tắm KHÔNG cần tráng nước thường',
				],
				note: 'Tác dụng: Phục hồi cơ bắp, an thần, lưu thông khí huyết, làm đẹp da',
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '17:30 - 20:00',
				title: '🍲 Tiệc sinh nhật: Lẩu Cá Tầm - Nhà hàng A Quỳnh',
				description:
					'Cá Tầm Sapa cao cấp, thịt dai ngọt, xương sụn giòn ăn được cả!',
				address: '15 Thạch Sơn, TT. Sapa',
				hotline: '0214 387 1666',
				cost: '~700-800k (lẩu + đồ uống)',
				photoTips: {
					angle: 'Góc từ trên xuống (flat-lay) với nồi lẩu bốc khói',
					pose: 'Hai người gắp đồ cùng lúc, cười tự nhiên',
					tips: 'Không gian gỗ ấm cúng - Chụp cả khung cảnh nhà hàng',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:30+',
				title: '🎂 TIỆC SINH NHẬT TẠI PHÒNG',
				description: 'Cắt bánh, uống rượu vang, không gian riêng tư lãng mạn',
				note: 'Thắp nến, mở nhạc nhẹ, tận hưởng khoảnh khắc đặc biệt',
				type: 'activity',
				isHighlight: true,
			},
		],
		isBirthday: true,
	},
	{
		id: 3,
		date: '2026-01-17',
		dateLabel: 'Thứ 6, 17/01',
		title: 'BÙNG NỔ THỊ GIÁC ☀️',
		theme: 'Khám phá & Chụp ảnh',
		goals: [
			'Tận dụng thời tiết đẹp - Ngày quan trọng nhất để tham quan',
			'Chinh phục Hàm Rồng + Cát Cát',
			'Khám phá Chợ đêm',
		],
		weather: {
			icon: '☀️',
			description: 'Nắng đẹp, Có thể có biển mây sáng sớm',
			temp: '11-18°C',
		},
		outfit:
			'Đồ năng động, màu sáng (Trắng/Đỏ/Vàng) để nổi bật trên nền xanh núi rừng. Giày thể thao êm chân',
		warnings: [
			'⚠️ CÁT CÁT: TUYỆT ĐỐI KHÔNG đi bộ ngược lên dốc - Thuê xe ôm!',
			'Chợ đêm chỉ mở Thứ 6-CN, 16h-22h',
		],
		budgetEstimate: '~800k-1 triệu (vé + ăn + xe)',
		timeline: [
			{
				time: '08:00 - 09:00',
				title: 'Ăn sáng nhanh, Lên đồ đẹp',
				description: 'Trang điểm, chọn outfit sáng màu để chụp ảnh',
				note: 'Tone: Trắng, Đỏ, Vàng - nổi bật trên nền xanh',
				type: 'rest',
			},
			{
				time: '09:00 - 11:30',
				title: '🏔️ Leo núi Hàm Rồng',
				description:
					'Vườn Lan → Vườn 12 con giáp → SÂN MÂY (điểm cao nhất, view toàn cảnh)',
				distance: 'Cổng ngay sau Nhà thờ Đá - đi bộ 5 phút từ khách sạn',
				cost: '140k (vé 2 người: 70k/người)',
				photoTips: {
					angle: 'Tại Sân Mây: Đứng rìa sân, hướng về thung lũng',
					pose: 'Dang tay, tóc bay, nhìn về phía mây',
					time: '9-10h sáng - nắng xiên đẹp, sương tan bớt',
					tips: 'Đi chậm, nghỉ nhiều chặng. Nếu mệt chỉ cần lên Vườn Lan là đã có ảnh đẹp',
				},
				warnings: ['Leo có bậc thang nhưng dốc - đi chậm, nghỉ nhiều'],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '11:30 - 13:00',
				title: '🍗 Trưa: Gà nướng tiêu xanh - Nhà hàng Hải Lâm',
				description:
					'Món Signature! Gà đen bản địa, da giòn, sốt tiêu xanh thơm nồng cay nhẹ',
				address: '69 Xuân Viên, TT. Sapa',
				hotline: '0934 246 696',
				cost: '~300-400k',
				photoTips: {
					angle: 'Góc nghiêng 45° với đĩa gà bốc khói',
					pose: 'Cầm đùi gà, cắn một miếng',
					tips: 'Nhà hàng có view đẹp - chụp cả không gian',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Về khách sạn nghỉ trưa',
				description: 'Nạp năng lượng cho chiều',
				type: 'rest',
			},
			{
				time: '14:30 - 17:30',
				title: '🌾 Khám phá Bản Cát Cát',
				description: 'ĐI XUỐNG dốc → Vườn hoa → Guồng nước → Thác Tiên Sa',
				distance: '~2km từ khách sạn',
				cost: '~300k (vé 150k/người) + taxi đi ~70k + xe ôm về ~100k',
				transport:
					'Taxi xuống cổng → Đi bộ XUỐNG dốc → Xe ôm CHỞ NGƯỢC LÊN (QUAN TRỌNG!)',
				photoTips: {
					angle:
						'Tại Cầu Si: Đứng giữa cầu, chụp từ trên bờ cao xuống (high-angle)',
					pose: 'Bạn nữ quay lưng nhìn ra suối/núi, vuốt tóc nhẹ hoặc cầm vạt váy xòe',
					tips: "Thuê trang phục H'mông/Dao tại cổng (~50k) để chụp ảnh",
				},
				warnings: [
					'⚠️ KHÔNG ĐI BỘ NGƯỢC LÊN - Dốc rất đứng >1km',
					'Cuối bản có xe ôm đợi sẵn - 40-50k/người',
				],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:00 - 22:00',
				title: '🌙 Chợ đêm Sapa & Ẩm thực đường phố',
				description:
					'Đồ nướng Sapa: Xiên thịt lợn cuốn cải mèo, trứng nướng, cơm lam, khoai nướng',
				address: 'Khu Chợ Mới / Sân Quần',
				cost: '~300k (ăn no 2 người)',
				note: 'Mua hạt dẻ nướng nóng hổi làm quà (nhớ ăn thử trước!)',
				type: 'meal',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
	{
		id: 4,
		date: '2026-01-18',
		dateLabel: 'Thứ 7, 18/01',
		title: 'TẠM BIỆT SAPA 💕',
		theme: 'Thư thái & Chia tay',
		goals: [
			'Café view núi tuyệt đẹp',
			'Mua quà cuối cùng',
			'Về Hà Nội an toàn',
		],
		weather: {
			icon: '🌤️',
			description: 'Trời quang, Có thể có mây luồn thung lũng',
			temp: '10-16°C',
		},
		outfit: 'Thoải mái, ấm áp, dễ di chuyển',
		warnings: [
			'⚠️ 14:00-15:00 PHẢI lên xe về Hà Nội',
			'Checkout 12:00 - gửi hành lý tại lễ tân',
		],
		budgetEstimate: '~400-500k (café + ăn trưa + quà)',
		timeline: [
			{
				time: '08:00 - 10:00',
				title: 'Ăn sáng & Thu dọn hành lý',
				description: 'Ăn sáng tại khách sạn, đóng gói đồ đạc',
				type: 'rest',
			},
			{
				time: '10:00 - 12:00',
				title: '☕ Café Viettrekking - View triệu đô',
				description:
					'View thẳng dãy Hoàng Liên Sơn và thung lũng Mường Hoa. Nơi nói lời tạm biệt Sapa hoàn hảo!',
				address: '33 Hoàng Liên, TT. Sapa',
				cost: '~150k + taxi ~50k',
				transport: 'Taxi từ khách sạn',
				photoTips: {
					angle: 'Ngồi góc ban công, hướng về thung lũng',
					pose: 'Cầm ly café, nhìn ra mây núi, profile shot',
					time: 'Sáng sớm có mây luồn đẹp',
					tips: 'Quán cuối đường Hoàng Liên - view đẹp nhất Sapa',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '12:00',
				title: '📦 CHECKOUT khách sạn',
				description: 'Trả phòng, gửi hành lý tại lễ tân',
				address: 'Sapa House Hotel - 03A Thác Bạc',
				type: 'transport',
			},
			{
				time: '12:00 - 13:30',
				title: '🍜 Ăn trưa nhẹ: Phở gà Quyên',
				description: 'Nổi tiếng với gà ta ngon, nước dùng đậm đà',
				address: 'Đường Tuệ Tĩnh/Phạm Xuân Huân',
				cost: '~120-140k (2 người)',
				type: 'meal',
			},
			{
				time: '13:30 - 14:00',
				title: 'Di chuyển ra văn phòng xe',
				description: 'Lấy hành lý tại khách sạn → Ra văn phòng Hà Sơn Hải Vân',
				transport: 'Taxi ~40k',
				type: 'transport',
			},
			{
				time: '14:00 - 15:00',
				title: '🚌 LÊN XE VỀ HÀ NỘI',
				description: 'Kết thúc hành trình. Hẹn gặp lại, Sapa yêu thương!',
				note: 'Dự kiến đến Hà Nội ~20:00',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T10:00:00');
