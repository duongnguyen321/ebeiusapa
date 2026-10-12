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
		name: 'Khu Nghỉ Dưỡng Sapa & Căn Hộ Nghỉ Dưỡng Hà Khẩu',
		address: 'Sapa (4 đêm) & Hà Khẩu (1 đêm)',
		phone: '0983 994 867',
		checkIn: '11:30 ngày 28/12/2026',
		checkOut: '11:30 ngày 02/01/2027',
		includes: [
			'Phòng nghỉ tiêu chuẩn cao cấp view thung lũng mây Sapa (4 đêm)',
			'Căn hộ nghỉ dưỡng trung tâm Hà Khẩu tiện nghi (1 đêm)',
			'Không gian ấm cúng, sang trọng và riêng tư trọn vẹn cho đôi mình',
		],
	},
	transport: {
		company: 'Xe Giường Nằm Cabin Đôi & Taxi',
		departure: '07:00 Hà Nội -> 11:30 Sapa (Cabin đôi)',
		arrival: 'Khởi hành chuyến phiêu lưu 6 ngày 5 đêm',
		returnDeparture: '15:20 Sapa -> Lào Cai (Ngày 5) & 16:00 Lào Cai -> Hà Nội (Ngày 6)',
		returnArrival: 'Trở về Hà Nội an toàn, đong đầy kỷ niệm',
	},
	packingList: {
		boy: [
			{
				title: 'Trang phục & Giữ ấm',
				items: [
					'1 Áo khoác đại hàn chống gió',
					'2 Áo len/Hoodie dày dặn',
					'Quần Jeans/Kaki thoải mái',
					'Khăn quàng cổ, găng tay, mũ trùm đầu cho Fansipan',
				],
			},
			{
				title: 'Thiết bị & Phụ kiện',
				items: [
					'Sạc dự phòng dung lượng lớn (Cực kỳ quan trọng)',
					'Máy ảnh & dây cáp sạc đầy đủ',
					'Túi nilong đựng đồ ẩm/đồ bẩn',
				],
			},
			{
				title: 'Đồ sinh tồn & Thuốc men',
				items: [
					'Miếng dán giữ nhiệt (1-2 miếng/người/ngày)',
					'Thuốc say xe (Uống trước khi lên xe 30p)',
					'Kem nẻ & Giấy ướt bỏ túi',
					'Thuốc cảm, đau đầu, tiêu hóa cá nhân',
				],
			},
		],
		girl: [
			{
				title: 'Set 1 (Ngày 1 - Check-in & Phố Đêm Sapa)',
				items: [
					'Đồ bộ nỉ ấm/Pijama dễ thương cho buổi chiều nghỉ ngơi',
					'Set đồ ấm dạo phố trung tâm & check-in Nhà thờ đá',
				],
			},
			{
				title: 'Set 2 (Ngày 2 - Fansipan & Hoạt Động Ngoài Trời)',
				items: [
					'Áo phao ấm đại hàn + Khăn quàng to bản',
					'Mũ trùm đầu, găng tay len, boot chống trượt',
					'Trang phục năng động chơi Mật Pet & Tàu trượt núi',
				],
			},
			{
				title: 'Set 3 (Ngày 3 - Cát Cát & Đón Giao Thừa)',
				items: [
					'Trang phục thuê tại bản Cát Cát hoặc Váy Vintage thổ cẩm',
					'Sneaker/Giày đế bằng đi dốc bản',
					'Set đồ xinh xắn đón giao thừa & bắn pháo hoa',
				],
			},
			{
				title: 'Set 4 (Ngày 4 - Cafe Săn Mây, Cầu Kính & Hàm Rồng)',
				items: [
					'Váy dạ/Măng tô sang chảnh chụp ảnh săn mây',
					'Phụ kiện nổi bật check-in Cầu kính Rồng Mây & Núi Hàm Rồng',
				],
			},
			{
				title: 'Set 5 (Ngày 5-6 - Xuất Cảnh Hà Khẩu & Mua Sắm)',
				items: [
					'CCCD gốc + Ảnh thẻ làm sổ thông hành',
					'Tiền tệ Trung Quốc (khoảng 350-400 tệ) & ví đựng gọn nhẹ',
					'Trang phục du lịch thoải mái dạo chợ đêm & về Hà Nội',
				],
			},
		],
	},
	planB: {
		condition: 'Khi trời mưa lạnh hoặc sương mù quá dày (thay thế tham quan ngoài trời)',
		place: 'Khách sạn De La Coupole (MGallery) - Sun Plaza',
		activity: 'Cafe Cacao Patisserie: Chocolate nóng + Bánh ngọt hoặc Spa thư giãn thảo dược',
		benefit: 'Không gian sang trọng như cung điện Pháp, ấm áp, chụp ảnh đẹp và an toàn',
	},
};

// ==================== EMERGENCY CONTACTS ====================

export const emergencyContacts: EmergencyContact[] = [
	{ name: 'Taxi Xanh Sapa', phone: '0214 3 63 63 63', icon: 'taxi' },
	{ name: 'Hỗ trợ Cửa khẩu Lào Cai', phone: '0214 3820 123', icon: 'shield' },
	{ name: 'Khách sạn Sapa', phone: '0983 994 867', icon: 'hotel' },
	{ name: 'Nhà hàng Thắng Cố / Lẩu', phone: '0214 3871 555', icon: 'utensils' },
	{ name: 'Dao Spa Sapa', phone: '0917 822 844', icon: 'sparkles' },
];

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	// ==================== DAY 1 ====================
	{
		id: 1,
		date: '2026-12-28',
		dateLabel: 'Thứ 2, 28/12',
		title: 'Khởi Hành Hà Nội - Sapa',
		theme: 'Lên xe & Làm quen phố núi',
		goals: [
			'Lên xe cabin đôi đúng 07:00 sáng',
			'Check-in khách sạn & ngủ hồi sức',
			'Thưởng thức Lẩu Thắng cố cho tỉnh người',
			'Dạo Nhà thờ đá, quảng trường & chợ đêm Sapa',
		],
		weather: {
			icon: 'rain',
			description: 'Lạnh, sương mù nhẹ về chiều. 9-14°C.',
			temp: '12°C',
		},
		outfit: 'Đồ nỉ ấm, áo khoác dày thoải mái cho chặng di chuyển xe cabin.',
		warnings: [
			'Uống thuốc say xe trước 30 phút lên xe',
			'Sạc đầy pin điện thoại và sạc dự phòng',
		],
		timeline: [
			{
				time: '07:00 - 11:30',
				title: 'Lên xe cabin đôi',
				description: 'Khởi hành từ Hà Nội đi Sapa bằng xe cabin đôi (2 người 1 phòng). Ngắm cảnh đường đèo Tây Bắc.',
				type: 'transport',
				isHighlight: true,
			},
			{
				time: '11:30 - 12:00',
				title: 'Đến Sapa & Check-in',
				description: 'Đến thị trấn Sapa. Di chuyển về khách sạn nhận phòng, sắp xếp hành lý.',
				type: 'rest',
			},
			{
				time: '12:00 - 15:00',
				title: 'Giấc ngủ hồi sức',
				description: 'Kéo rèm, bật sưởi ấm, đắp chăn bông ngủ tàn canh gió lạnh bù lại chuyến đi sớm.',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '15:00 - 16:00',
				title: 'Thức dậy & Chuẩn bị',
				description: 'Vệ sinh cá nhân, chuẩn bị trang phục ấm và makeup xinh đẹp cho ngày mới.',
				type: 'rest',
			},
			{
				time: '16:00 - 16:15',
				title: 'Di chuyển đến quán ăn',
				description: 'Gọi taxi di chuyển đến nhà hàng Thắng Cố.',
				type: 'transport',
			},
			{
				time: '16:15 - 17:45',
				title: 'Ăn Lẩu Thắng Cố',
				description: 'Thưởng thức nồi lẩu Thắng cố nóng hổi đặc sản Sapa cho tỉnh người.',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '17:45 - 18:00',
				title: 'Di chuyển ra khu trung tâm',
				description: 'Đi bộ hoặc taxi ra khu vực trung tâm thị trấn Sapa.',
				type: 'transport',
			},
			{
				time: '18:00 - 20:00',
				title: 'Dạo Nhà Thờ Đá & Quảng Trường',
				description: 'Đi dạo quanh Nhà thờ đá cổ, quảng trường trung tâm làm quen địa hình và tranh thủ chụp ảnh check-in.',
				address: 'Trung tâm thị trấn Sapa',
				photoTips: {
					angle: 'Góc hất từ dưới lên lấy toàn cảnh tháp chuông cổ',
					pose: 'Nắm tay bước đi tự nhiên giữa quảng trường sương mù',
				},
				type: 'activity',
			},
			{
				time: '20:00 - 20:15',
				title: 'Di chuyển sang khu chợ',
				description: 'Tản bộ sang khu chợ Sapa.',
				type: 'transport',
			},
			{
				time: '20:15 - 21:15',
				title: 'Khám phá chợ Sapa',
				description: 'Dạo quanh các sạp hàng, mua sắm đồ linh tinh, hạt dẻ nướng.',
				type: 'shopping',
			},
			{
				time: '21:15 - 21:30',
				title: 'Về khách sạn cất đồ',
				description: 'Taxi về khách sạn thả đồ vừa mua.',
				type: 'transport',
			},
			{
				time: '21:30 - 23:00',
				title: 'Dạo phố đêm nhẹ nhàng',
				description: 'Đi dạo phố đêm ngắm thị trấn Sapa lung linh ánh đèn và sương lạnh mờ ảo.',
				type: 'activity',
			},
			{
				time: '23:00 - 23:15',
				title: 'Di chuyển về khách sạn',
				description: 'Trở về phòng khách sạn ấm áp.',
				type: 'transport',
			},
			{
				time: '23:15',
				title: 'Về phòng nghỉ ngơi sớm',
				description: 'Nghỉ ngơi sớm giữ sức khỏe cho hành trình Fansipan sáng mai.',
				type: 'rest',
			},
		],
		isBirthday: false,
	},

	// ==================== DAY 2 ====================
	{
		id: 2,
		date: '2026-12-29',
		dateLabel: 'Thứ 3, 29/12',
		title: 'Chinh Phục Fansipan - Mật Pet - Trượt Núi',
		theme: 'Nóc nhà Đông Dương & Phiêu lưu kỳ thú',
		goals: [
			'Trải nghiệm combo Sun World: Cáp treo + Buffet + Tàu hỏa',
			'Chạm tay vào cột mốc 3.143m đỉnh Fansipan',
			'Vui chơi cùng các bé cún tại Mật Pet',
			'Trải nghiệm cảm giác mạnh tàu hỏa trượt núi',
			'Thưởng thức bữa tối & dạo chợ đêm Sapa',
		],
		weather: {
			icon: 'cloud-sun',
			description: 'Đỉnh núi có nắng và gió lạnh. 4-10°C.',
			temp: '8°C',
		},
		outfit: 'Áo phao đại hàn, mũ trùm đầu, găng tay, khăn quàng cổ (Bắt buộc mang theo).',
		warnings: [
			'Nhớ mang đầy đủ mũ trùm đầu, găng tay và khăn quàng cổ kẻo buốt đầu',
			'Di chuyển chậm rãi trên đỉnh núi để thích nghi với độ cao',
		],
		timeline: [
			{
				time: '09:00 - 10:00',
				title: 'Dậy & Makeup chuẩn bị',
				description: 'Thức dậy, chuẩn bị đồ giữ ấm và makeup rạng rỡ cho ngày chinh phục đỉnh cao.',
				type: 'rest',
			},
			{
				time: '10:00 - 10:30',
				title: 'Xuất phát đi Fansipan',
				description: 'Taxi di chuyển đến khu du lịch Sun World Fansipan Legend.',
				type: 'transport',
			},
			{
				time: '10:30 - 10:45',
				title: 'Tàu hỏa ngắm thung lũng hoa',
				description: 'Bắt đầu combo với chặng tàu hỏa Mường Hoa ngắm thung lũng hoa và cảnh sắc núi non.',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '10:45 - 11:05',
				title: 'Cáp treo Fansipan',
				description: 'Trải nghiệm cáp treo vượt biển mây bồng bềnh, ngắm toàn cảnh dãy Hoàng Liên Sơn hùng vĩ.',
				type: 'transport',
				isHighlight: true,
			},
			{
				time: '11:05 - 11:20',
				title: 'Leo núi làm nóng cơ thể',
				description: 'Tản bộ qua các bậc thang đá ngắm cảnh trời mây bao la.',
				type: 'activity',
			},
			{
				time: '11:20 - 11:50',
				title: 'Check-in Cột Mốc Fansipan',
				description: 'Chụp ảnh tại cột đá 3.143m, check-in tượng Phật lớn, Bích Vân Thiền Tự giữa mây trời.',
				address: 'Đỉnh Fansipan 3.143m',
				photoTips: {
					angle: 'Góc rộng lấy trọn cột mốc và biển mây phía sau',
					pose: 'Hai đứa ôm nhau cười rạng rỡ trên đỉnh núi cao nhất Đông Dương',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '11:50 - 12:50',
				title: 'Chiêm bái chùa & Cầu an',
				description: 'Vòng xuống tham quan quần thể tâm linh, dâng hương cầu bình an và may mắn cho đôi mình.',
				type: 'activity',
			},
			{
				time: '12:50 - 13:10',
				title: 'Cáp treo chiều xuống',
				description: 'Đi cáp treo xuống ga trung chuyển.',
				type: 'transport',
			},
			{
				time: '13:10 - 14:10',
				title: 'Thưởng thức Buffet Fansipan',
				description: 'Ăn trưa buffet ấm nóng trong gói combo Fansipan, nạp lại năng lượng.',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '14:10 - 14:25',
				title: 'Tàu hỏa về ga trung tâm',
				description: 'Lên tàu hỏa trở về ga xuất phát.',
				type: 'transport',
			},
			{
				time: '14:25 - 14:55',
				title: 'Di chuyển về khách sạn',
				description: 'Taxi đưa về khách sạn nghỉ ngơi.',
				type: 'transport',
			},
			{
				time: '14:55 - 15:55',
				title: 'Tắm rửa & Nghỉ ngơi',
				description: 'Thay trang phục thoải mái, tắm nước ấm hồi phục thể lực.',
				type: 'rest',
			},
			{
				time: '15:55 - 16:10',
				title: 'Di chuyển đến Mật Pet',
				description: 'Taxi sang trang trại thú cưng Mật Pet.',
				type: 'transport',
			},
			{
				time: '16:10 - 17:10',
				title: 'Chơi thú tại Mật Pet',
				description: 'Vui chơi, chụp ảnh cùng các bé cún và thú cưng siêu đáng yêu (Vé 200k/2 người).',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '17:10 - 17:25',
				title: 'Di chuyển đến tàu trượt núi',
				description: 'Taxi sang khu trải nghiệm tàu trượt.',
				type: 'transport',
			},
			{
				time: '17:25 - 18:25',
				title: 'Trải nghiệm tàu hỏa trượt núi',
				description: 'Tận hưởng cảm giác uốn lượn ngoạn mục trên triền núi và in ảnh kỷ niệm (400k/2 người + ảnh).',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:25 - 18:45',
				title: 'Di chuyển đến nhà hàng',
				description: 'Taxi đến điểm ăn tối.',
				type: 'transport',
			},
			{
				time: '18:45 - 20:15',
				title: 'Ăn tối ấm áp',
				description: 'Bữa tối thơm ngon tại nhà hàng Sapa.',
				type: 'meal',
			},
			{
				time: '20:15 - 21:45',
				title: 'Nghỉ ngơi tại phòng',
				description: 'Về khách sạn ngả lưng thư giãn, ngủ một giấc ngắn lấy lại năng lượng.',
				type: 'rest',
			},
			{
				time: '21:45 - 22:00',
				title: 'Di chuyển ra chợ đêm',
				description: 'Taxi ra khu chợ đêm thị trấn.',
				type: 'transport',
			},
			{
				time: '22:00 - 23:30',
				title: 'Dạo chợ đêm Sapa',
				description: 'Thưởng thức không khí nhộn nhịp, ăn vặt và ngắm các sạp quà lưu niệm.',
				type: 'shopping',
			},
			{
				time: '23:30 - 23:45',
				title: 'Di chuyển về khách sạn',
				description: 'Taxi đưa về lại phòng.',
				type: 'transport',
			},
			{
				time: '23:45',
				title: 'Về phòng nghỉ ngơi',
				description: 'Tận hưởng giấc ngủ ấm áp bên nhau.',
				type: 'rest',
			},
		],
		isBirthday: false,
	},

	// ==================== DAY 3 ====================
	{
		id: 3,
		date: '2026-12-30',
		dateLabel: 'Thứ 4, 30/12',
		title: 'Bản Cát Cát - Ngâm Lá Thuốc - Đón Giao Thừa',
		theme: 'Sắc màu bản làng & Đêm giao thừa lung linh',
		goals: [
			'Hóa thân thành chàng trai cô gái dân tộc bản Cát Cát',
			'Thưởng thức bún rau đặc sản ngay tại bản',
			'Ngâm bồn lá thuốc Dao Đỏ & gội đầu thư giãn',
			'Đại tiệc lẩu Cá Hồi / Cá Tầm thượng hạng',
			'Bắn pháo hoa đón giao thừa ấm áp bên nhau',
		],
		weather: {
			icon: 'cloud-sun',
			description: 'Hửng nắng nhẹ ban ngày, đêm se lạnh lung linh. 8-13°C.',
			temp: '11°C',
		},
		outfit: 'Trang phục thuê tại Cát Cát, mang giày thể thao chống trượt đi dốc bản.',
		warnings: [
			'Ngâm lá thuốc trong khoảng 20-30 phút kẻo say thuốc',
			'Cẩn thận trơn trượt trên các bậc thang đá ẩm ướt ở Cát Cát',
		],
		timeline: [
			{
				time: '11:00 - 12:00',
				title: 'Dậy & Makeup ngày mới',
				description: 'Ngủ nướng thoải mái, thức dậy chuẩn bị và makeup chỉn chu.',
				type: 'rest',
			},
			{
				time: '12:00 - 12:20',
				title: 'Di chuyển ra Bản Cát Cát',
				description: 'Taxi di chuyển khoảng 2km xuống bản Cát Cát.',
				type: 'transport',
			},
			{
				time: '12:20 - 15:20',
				title: 'Khám phá Bản Cát Cát',
				description: 'Thuê váy dân tộc lộng lẫy, chụp ảnh sống ảo bên suối Hoa, guồng nước và thưởng thức bún rau bản địa.',
				address: 'Bản Cát Cát, San Sả Hồ',
				photoTips: {
					angle: 'Bên bờ suối Tiên Sa hoặc cầu treo gỗ truyền thống',
					pose: 'Nàng xoay váy thổ cẩm, chàng nắm tay ánh mắt trìu mến',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '15:20 - 15:45',
				title: 'Di chuyển về khách sạn',
				description: 'Taxi đưa về lại khách sạn.',
				type: 'transport',
			},
			{
				time: '15:45 - 16:45',
				title: 'Tắm rửa sưởi ấm',
				description: 'Tắm nước nóng cho ấm người sau buổi đi bộ dạo bản.',
				type: 'rest',
			},
			{
				time: '16:45 - 17:05',
				title: 'Di chuyển đến nơi ngâm thuốc',
				description: 'Taxi đến cơ sở tắm lá thuốc truyền thống người Dao Đỏ.',
				type: 'transport',
			},
			{
				time: '17:05 - 19:05',
				title: 'Ngâm Lá Thuốc Dao Đỏ & Gội Đầu',
				description: 'Ngâm mình trong bồn gỗ pơ-mu với bài thuốc thảo dược quý, gội đầu thư giãn xua tan mệt mỏi (500k/2 người).',
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '19:05 - 19:25',
				title: 'Di chuyển đến nhà hàng',
				description: 'Taxi di chuyển sang quán lẩu nổi tiếng.',
				type: 'transport',
			},
			{
				time: '19:25 - 21:25',
				title: 'Đại Tiệc Lẩu Cá Hồi / Cá Tầm',
				description: 'Ăn nhậu ấm cúng với nồi lẩu Cá Hồi tươi rói hoặc Cá Tầm béo ngậy cùng rau rừng Tây Bắc.',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '21:25 - 21:45',
				title: 'Di chuyển ra chợ đêm',
				description: 'Dạo bộ hoặc taxi ra khu chợ đêm.',
				type: 'transport',
			},
			{
				time: '21:45 - 23:15',
				title: 'Dạo bộ chợ đêm Sapa',
				description: 'Đi bộ dạo chợ đêm phát nữa cho thỏa thích theo ý em bé, ngắm đồ thủ công thổ cẩm.',
				type: 'shopping',
			},
			{
				time: '23:15 - 23:30',
				title: 'Di chuyển về khách sạn',
				description: 'Trở về phòng khách sạn.',
				type: 'transport',
			},
			{
				time: '23:30',
				title: 'Bắn Pháo Hoa Đón Giao Thừa',
				description: 'Mua đồ ăn vặt và pháo hoa về phòng, cùng nhau đếm ngược đón khoảnh khắc giao thừa ý nghĩa nhất chuyến đi.',
				type: 'activity',
				isHighlight: true,
			},
		],
		isBirthday: true,
	},

	// ==================== DAY 4 ====================
	{
		id: 4,
		date: '2026-12-31',
		dateLabel: 'Thứ 5, 31/12',
		title: 'Cafe Săn Mây - Cầu Kính - Hàm Rồng - Đồ Nướng',
		theme: 'Hùng vĩ đèo mây & Hơi ấm than hồng',
		goals: [
			'Thưởng thức cafe săn mây view thung lũng triệu đô',
			'Chiêm ngưỡng Thác Bạc & Thác Tình Yêu hùng vĩ',
			'Thử thách lòng can đảm tại Cầu kính Rồng Mây',
			'Chinh phục Núi Hàm Rồng ngắm toàn cảnh Sapa',
			'Đại tiệc đồ nướng than hồng ngõ phố Sapa',
			'Mua đồ kỳ lưng chăm sóc cho nhau',
		],
		weather: {
			icon: 'sun',
			description: 'Nắng hanh vàng trên đèo, trời trong xanh. 10-15°C.',
			temp: '13°C',
		},
		outfit: 'Trang phục Vintage sang chảnh, áo khoác ấm khi lên đèo Ô Quy Hồ.',
		warnings: [
			'Đoạn đèo Ô Quy Hồ có gió lớn, nhớ giữ ấm cổ và tay',
			'Đi lại cẩn thận khi bước trên sàn kính cường lực',
		],
		timeline: [
			{
				time: '11:00 - 12:00',
				title: 'Dậy & Makeup ngày mới',
				description: 'Thức dậy thong thả, makeup phong cách Vintage đón nắng vàng phố núi.',
				type: 'rest',
			},
			{
				time: '12:00 - 12:30',
				title: 'Di chuyển đến quán cafe view đẹp',
				description: 'Taxi đưa đến quán cafe view thung lũng săn mây.',
				type: 'transport',
			},
			{
				time: '12:30 - 13:30',
				title: 'Cafe ngắm cảnh & Săn mây',
				description: 'Thưởng thức tách cafe ấm nóng, ngắm biển mây cuộn tràn qua các sườn đồi thơ mộng.',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '13:30 - 13:50',
				title: 'Di chuyển lên Thác Bạc',
				description: 'Taxi ngược cung đèo khoảng 12km lên khu Thác Bạc / Thác Tình Yêu.',
				type: 'transport',
			},
			{
				time: '13:50 - 14:35',
				title: 'Check-in Thác Bạc / Thác Tình Yêu',
				description: 'Chiêm ngưỡng dòng thác trắng xóa đổ xuống từ khe núi đá và chụp ảnh check-in.',
				type: 'activity',
			},
			{
				time: '14:35 - 14:50',
				title: 'Di chuyển đến Cầu Kính Rồng Mây',
				description: 'Taxi di chuyển tiếp lên khu du lịch Cầu kính gần đỉnh đèo Ô Quy Hồ.',
				type: 'transport',
			},
			{
				time: '14:50 - 15:35',
				title: 'Khám phá Cầu Kính Rồng Mây',
				description: 'Bước trên cầu kính trong suốt nhìn thẳng xuống vực sâu hun hút và ngắm dãy Hoàng Liên Sơn (300k/2 người).',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '15:35 - 16:05',
				title: 'Về trung tâm Sapa lên Hàm Rồng',
				description: 'Taxi trở về trung tâm thị trấn, di chuyển lên cổng Núi Hàm Rồng.',
				type: 'transport',
			},
			{
				time: '16:05 - 17:35',
				title: 'Chinh phục Núi Hàm Rồng',
				description: 'Tham quan Vườn Lan, Sân Mây, chụp ảnh những góc hẻm đá tự nhiên và ngắm toàn cảnh thị trấn từ trên cao (150k/2 người).',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '17:35 - 18:05',
				title: 'Di chuyển về khách sạn',
				description: 'Trở về phòng khách sạn.',
				type: 'transport',
			},
			{
				time: '18:05 - 19:05',
				title: 'Tắm rửa nghỉ ngơi',
				description: 'Tắm nước ấm thư giãn cơ bắp sau buổi chiều dạo chơi đèo dốc.',
				type: 'rest',
			},
			{
				time: '19:05 - 19:35',
				title: 'Phố cổ Sapa / Chợ tình về đêm',
				description: 'Dạo ngắm các góc phố cổ Sapa rực rỡ đèn lồng hoặc ghé xem phiên chợ tình.',
				type: 'activity',
			},
			{
				time: '19:35 - 19:55',
				title: 'Di chuyển đến quán nướng',
				description: 'Đi bộ hoặc taxi đến nhà hàng đồ nướng nổi tiếng.',
				type: 'transport',
			},
			{
				time: '19:55 - 21:25',
				title: 'Ăn tiệc đồ nướng Sapa',
				description: 'Thưởng thức các xiên thịt nướng than hồng: bò cuốn cải mèo, nấm kim châm, cơm lam chấm muối vừng.',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '21:25 - 21:45',
				title: 'Di chuyển ra chợ trung tâm',
				description: 'Tản bộ sang chợ trung tâm Sapa.',
				type: 'transport',
			},
			{
				time: '21:45 - 22:30',
				title: 'Mua đồ chợ & Dụng cụ kỳ lưng',
				description: 'Mua sắm đặc sản mứt quả, trà thảo mộc và dụng cụ kỳ lưng thư giãn.',
				type: 'shopping',
			},
			{
				time: '22:30 - 23:30',
				title: 'Dạo chợ đêm phố núi',
				description: 'Tận hưởng đêm cuối trọn vẹn tại thị trấn Sapa mộng mơ.',
				type: 'shopping',
			},
			{
				time: '23:30 - 23:45',
				title: 'Di chuyển về khách sạn',
				description: 'Về lại khách sạn.',
				type: 'transport',
			},
			{
				time: '23:45',
				title: 'Về phòng & Kỳ lưng chăm sóc',
				description: 'Về phòng ấm áp, kỳ lưng chăm sóc massage cho nhau sau ngày dài.',
				type: 'rest',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},

	// ==================== DAY 5 ====================
	{
		id: 5,
		date: '2027-01-01',
		dateLabel: 'Thứ 6, 01/01',
		title: 'Sapa - Lào Cai - Xuất Cảnh Hà Khẩu',
		theme: 'Vượt biên giới & Đón chào năm mới nước bạn',
		goals: [
			'Mua đồ lưu niệm Sapa làm kỷ niệm',
			'Bữa trưa chia tay thị trấn sương mù Sapa',
			'Đi xe khách xuống TP Lào Cai & nhâm nhi cafe',
			'Làm thủ tục xuất cảnh Cửa khẩu sang Hà Khẩu',
			'Khám phá Chợ Tết & ăn lẩu đêm Hà Khẩu',
		],
		weather: {
			icon: 'cloud-sun',
			description: 'Thời tiết ấm áp hơn Sapa, chiều tối se lạnh vừa phải. 12-17°C.',
			temp: '15°C',
		},
		outfit: 'Trang phục thoải mái, mang theo áo khoác nhẹ, chuẩn bị sẵn CCCD gốc.',
		warnings: [
			'Kiểm tra kỹ CCCD và sổ thông hành trước khi rời Sapa',
			'Cất giữ tiền tệ và giấy tờ tùy thân cẩn thận tại nơi đông người',
		],
		timeline: [
			{
				time: '11:00 - 12:00',
				title: 'Dậy & Makeup ngày mới',
				description: 'Thức dậy chuẩn bị trang phục tươm tất cho ngày di chuyển liên tỉnh.',
				type: 'rest',
			},
			{
				time: '12:00 - 13:30',
				title: 'Mua quà lưu niệm chợ trung tâm',
				description: 'Ra chợ trung tâm chọn mua đồ thủ công, quà lưu niệm kỷ niệm những ngày ở Sapa.',
				type: 'shopping',
			},
			{
				time: '13:30 - 14:30',
				title: 'Bữa trưa chia tay Sapa',
				description: 'Ăn bữa trưa cuối cùng tại thị trấn Sapa trước khi xuống núi.',
				type: 'meal',
			},
			{
				time: '14:30 - 15:00',
				title: 'Thu dọn hành lý & Checkout',
				description: 'Tắm rửa nhanh, sắp xếp toàn bộ đồ đạc vali và checkout khách sạn Sapa.',
				type: 'transport',
			},
			{
				time: '15:00 - 15:20',
				title: 'Di chuyển ra bến xe Sapa',
				description: 'Taxi ra bến xe khách Sapa.',
				type: 'transport',
			},
			{
				time: '15:20 - 16:20',
				title: 'Xe khách Sapa -> Lào Cai',
				description: 'Lên xe khách di chuyển từ Sapa xuống Thành phố Lào Cai (~1 tiếng).',
				type: 'transport',
			},
			{
				time: '16:20 - 16:50',
				title: 'Đến Lào Cai & Cafe nghỉ ngơi',
				description: 'Đến TP Lào Cai, ghé quán cafe ven đường nghỉ ngơi và nạp lại năng lượng.',
				type: 'rest',
			},
			{
				time: '16:50 - 17:30',
				title: 'Taxi ra Cửa khẩu Quốc tế',
				description: 'Taxi di chuyển từ trung tâm TP Lào Cai ra Cửa khẩu Quốc tế Lào Cai - Hà Khẩu.',
				type: 'transport',
			},
			{
				time: '17:30 - 18:00',
				title: 'Làm thủ tục xuất nhập cảnh',
				description: 'Xuất trình sổ thông hành và CCCD làm thủ tục qua biên giới sang Hà Khẩu, Trung Quốc.',
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:00 - 18:30',
				title: 'Nhận căn hộ tại Hà Khẩu',
				description: 'Đặt chân đến Hà Khẩu, di chuyển về căn hộ nghỉ dưỡng nhận phòng và cất hành lý.',
				type: 'rest',
			},
			{
				time: '18:30 - 20:00',
				title: 'Nghỉ ngơi lấy sức',
				description: 'Nghỉ ngơi, ngủ một giấc ngắn hồi phục sau chặng di chuyển qua biên giới.',
				type: 'rest',
			},
			{
				time: '20:00 - 22:00',
				title: 'Khám phá Chợ Tết Hà Khẩu',
				description: 'Dạo quanh Chợ Tết và khu trung tâm thương mại Hà Khẩu rực rỡ đèn hoa, trải nghiệm không khí náo nhiệt nước bạn.',
				type: 'shopping',
				isHighlight: true,
			},
			{
				time: '22:00 - 23:30',
				title: 'Ăn Lẩu & Chợ đêm Hà Khẩu',
				description: 'Thưởng thức món lẩu Trung Hoa đậm đà vị cay tê và các món ăn vặt đường phố nổi tiếng.',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '23:30',
				title: 'Về phòng nhâm nhi đồ ăn vặt',
				description: 'Mua các món ăn vặt đặc trưng Trung Quốc về phòng, cùng nhau thưởng thức và chuyện trò đêm muộn.',
				type: 'rest',
			},
		],
		isBirthday: false,
	},

	// ==================== DAY 6 ====================
	{
		id: 6,
		date: '2027-01-02',
		dateLabel: 'Thứ 7, 02/01',
		title: 'Mua Sắm Hà Khẩu - Trở Về Hà Nội',
		theme: 'Thu hoạch niềm vui & Trở về tổ ấm',
		goals: [
			'Thưởng thức ẩm thực trưa nhẹ tại Hà Khẩu',
			'Mua sắm đồ ăn vặt Trung Quốc làm quà cho bạn bè',
			'Làm thủ tục nhập cảnh trở lại Việt Nam',
			'Lên xe khách từ Lào Cai về Hà Nội an toàn',
		],
		weather: {
			icon: 'sun',
			description: 'Trời nắng đẹp, thuận lợi cho chuyến hành trình trở về. 14-19°C.',
			temp: '16°C',
		},
		outfit: 'Trang phục thoải mái, năng động để ngồi xe đường dài 3-3.5 tiếng.',
		warnings: [
			'Kiểm tra lại toàn bộ giấy tờ tùy thân, điện thoại, sạc pin trước khi rời căn hộ',
			'Có mặt tại bến xe Lào Cai trước giờ xe chạy 30 phút',
		],
		timeline: [
			{
				time: '11:00 - 11:30',
				title: 'Dậy & Vệ sinh cá nhân',
				description: 'Thức dậy thong thả, tắm rửa sảng khoái bắt đầu ngày cuối của hành trình.',
				type: 'rest',
			},
			{
				time: '11:30 - 12:00',
				title: 'Makeup nhẹ & Checkout',
				description: 'Thu xếp gọn gàng toàn bộ đồ đạc và làm thủ tục checkout căn hộ.',
				type: 'transport',
			},
			{
				time: '12:00 - 13:00',
				title: 'Ăn trưa nhẹ tại Hà Khẩu',
				description: 'Thưởng thức các món điểm tâm, mì cay hoặc bánh bao nóng hổi tại khu ẩm thực địa phương.',
				type: 'meal',
			},
			{
				time: '13:00 - 15:00',
				title: 'Mua sắm quà ăn vặt Trung Quốc',
				description: 'Ghé các siêu thị và cửa hàng bánh kẹo mua đồ ăn vặt đóng gói mang về làm quà cho bản thân và bạn bè.',
				type: 'shopping',
				isHighlight: true,
			},
			{
				time: '15:00 - 15:45',
				title: 'Qua cửa khẩu về lại Lào Cai',
				description: 'Di chuyển ra cửa khẩu làm thủ tục nhập cảnh trở lại Việt Nam.',
				type: 'transport',
				isHighlight: true,
			},
			{
				time: '15:45 - 16:00',
				title: 'Đến Lào Cai ra bến xe',
				description: 'Taxi từ cửa khẩu sang bến xe khách TP Lào Cai.',
				type: 'transport',
			},
			{
				time: '16:00',
				title: 'Lên xe trở về Hà Nội',
				description: 'Nghỉ ngơi tại Lào Cai, lấy vé và lên chuyến xe giường nằm trở về Hà Nội, khép lại hành trình 6 ngày 5 đêm tuyệt vời.',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-12-28T07:00:00');
