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
	birthday: {
		date: string;
		person: string;
	};
}

// ==================== TRIP INFO ====================

export const tripInfo: TripInfo = {
	hotel: {
		name: 'Sapa House Hotel',
		address: '03A Thác Bạc, TT. Sapa',
		phone: '0214 387 1234',
		checkIn: '14:00 ngày 15/01',
		checkOut: '12:00 ngày 18/01',
		includes: [
			'Giường siêu êm - Nơi những giấc mơ đẹp bắt đầu',
			'Không gian yên tĩnh - Để ta thủ thỉ lời yêu',
			'Gương lớn toàn thân - Ngắm nhìn nàng thơ của anh',
		],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân (Chuyến xe tình yêu)',
		departure: 'Hà Nội → Sapa: Đưa em đi trốn',
		arrival: 'Tới nơi để bắt đầu những ngày ngọt ngào',
		returnDeparture: 'Chiều 18/01 bị bắt về',
		returnArrival: 'Về nhà để "yêu" tiếp',
	},
	birthday: {
		date: '16/01/2026',
		person: 'Nàng thơ của anh',
	},
};

// ==================== EMERGENCY CONTACTS ====================

export const emergencyContacts: EmergencyContact[] = [
	{ name: 'Taxi Xanh Sapa', phone: '0214 363 63 63', icon: '🚕' },
	{ name: 'Taxi Mai Linh', phone: '0214 376 76 76', icon: '🚖' },
	{ name: 'Khách sạn Sapa House', phone: '0214 387 1234', icon: '🏨' },
];

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	{
		id: 1,
		date: '2026-01-15',
		dateLabel: 'Thứ 4, 15/01',
		title: 'Sương giăng lối nhỏ, mình lạc vào tim nhau 🌫️',
		theme: 'Ấm áp & Tình tứ',
		goals: [
			'Về phòng thả mình xuống giường êm',
			'Sưởi ấm em bằng những cái ôm thật chặt',
			'Tận hưởng không gian chỉ có đôi ta',
		],
		weather: {
			icon: '🌧️',
			description: 'Mưa phùn, sương mù đậm đặc. Độ ẩm >90%, tầm nhìn <50m.',
			temp: '11-15°C',
		},
		outfit:
			'Ưu tiên màu Đỏ, Cam đất hoặc Trắng kem để nổi bật trong sương (Tránh màu ghi/xám). Mang theo ô trong suốt.',
		warnings: [
			'Về đến nơi anh sẽ chiều chuộng em hết nấc, cứ yên tâm nghỉ ngơi',
		],
		timeline: [
			{
				time: '14:00',
				title: 'Về chốn bình yên',
				description:
					'Nhận phòng, khép cửa lại, để sương gió ở ngoài, chỉ còn hơi ấm đôi mình.',
				address: '03A Thác Bạc, TT. Sapa',
				note: 'Căn phòng này sẽ lưu giữ những khoảnh khắc ngọt ngào nhất',
				type: 'transport',
			},
			{
				time: '14:30 - 18:30',
				title: 'Phút giây thư giãn',
				description: 'Nghỉ ngơi một chút. Anh sẽ ôm em để em không thấy lạnh.',
				note: 'Anh sẽ là túi sưởi 37 độ độc quyền cho em',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '18:30 - 20:00',
				title: 'Sưởi ấm dạ dày',
				description:
					'Đi ăn Cốn Sủi Ông Há nóng hổi, dễ tiêu hoá, ấm bụng sau khi đi xe đường dài',
				address: '436 Điện Biên Phủ, TT. Sapa',
				hotline: '0856 332 323',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:00 - 21:30',
				title: 'Dạo bước dưới sương mờ',
				description:
					'Nhà thờ Đá lung linh, những cơn gió lạnh sẽ là cái cớ hoàn hảo để anh nắm tay em chặt hơn.',
				distance: '200m (Đi bộ để dễ bề ôm ấp)',
				transport: 'Đi bộ, lạnh thì ôm anh',
				photoTips: {
					angle: 'Góc nào cũng được, miễn là hôn nhau',
					pose: 'Đứng dưới ô, hôn dưới mưa (như phim Hàn)',
					tips: 'Giảm sáng để tăng độ... mờ ảo lãng mạn',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '22:00',
				title: 'Giấc mơ dịu êm',
				description:
					'Đêm Sapa lạnh, nhưng có anh ở đây rồi, em sẽ luôn thấy ấm. Ngủ ngon nhé bé yêu.',
				note: 'Ngủ ngoan, mai mình lại cùng nhau đi chơi',
				type: 'rest',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 5, 16/01',
		title: 'Ngày Của Nàng Thơ 🌹',
		theme: 'Ngọt ngào & Lãng mạn',
		goals: [
			'Cưng chiều công chúa của anh',
			'Tắm lá thuốc cho thơm tho để anh... hít hà',
			'Sinh nhật thổi nến và ước nguyện',
		],
		weather: {
			icon: '⛅',
			description: 'Có mưa phùn nhẹ và sương mù. Trời lạnh ẩm.',
			temp: '12-17°C',
		},
		outfit:
			'Trang phục ấm áp, thoải mái. Mang theo váy xinh để thay cho bữa tiệc tối (Khoác thêm áo ấm bên ngoài).',
		warnings: ['Chuẩn bị tinh thần để nhận quà bất ngờ nhé!'],
		timeline: [
			{
				time: '09:00 - 11:00',
				title: 'Bình minh ngọt ngào',
				description:
					'Ngủ nướng trong vòng tay anh. Dậy lúc nào ăn lúc đó. Anh đã sẵn sàng phục vụ bữa sáng (hoặc bữa trưa) cho em.',
				note: 'Nạp đầy năng lượng tình yêu nhé',
				type: 'rest',
			},
			{
				time: '11:00 - 13:00',
				title: 'Le Gecko Café - Góc Paris tình tứ',
				description:
					'Ngồi ban công ngắm phố, anh ngắm em uống Cacao nóng, khoảnh khắc này muốn ngừng lại mãi',
				address: '02 Ngũ Chỉ Sơn',
				hotline: '0214 387 1224',
				photoTips: {
					angle: 'View hồ Sapa hoặc góc ban công cổ điển',
					pose: 'Ngồi bên cửa sổ kính, tay cầm cốc nước ấm',
					tips: 'Ánh sáng tự nhiên từ cửa sổ rất đẹp',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Một chút bí mật...',
				description:
					'Anh chạy đi lo chút việc (bí mật của đàn ông), em ngồi nghỉ ngơi đợi điều bất ngờ nhé',
				note: 'Đừng tò mò nha, bật mí sớm mất vui',
				type: 'shopping',
			},
			{
				time: '14:30 - 17:00',
				title: 'Thư giãn cùng thảo dược',
				description:
					'Tắm lá thuốc Dao Đỏ, ngâm mình cho da dẻ hồng hào, nhìn là muốn yêu.',
				address: '02 Hoàng Liên',
				hotline: '0214 387 2222',
				warnings: [
					'Ngâm vừa thôi kẻo say thuốc (hoặc say anh)',
					'Da em mịn thế này ai chịu nổi',
				],
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '17:30 - 20:00',
				title: 'Bữa tiệc dưới ánh nến',
				description:
					'Lẩu Cá Tầm bên bếp lửa hồng, trong không gian gỗ ấm cúng và lãng mạn',
				address: 'A Quỳnh Restaurant',
				hotline: '0214 387 1666',
				photoTips: {
					angle: 'Chụp cận cảnh nụ cười hạnh phúc của em',
					pose: 'Hai đứa mình cụng ly rượu vang',
					tips: 'Ánh nến lung linh làm mắt em long lanh hơn cả sao trời',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:30+',
				title: 'HAPPY BIRTHDAY BABE 🎂',
				description:
					'Thổi nến xong rồi mình cùng trao nhau nụ hôn ngọt ngào. Quà của em đây, mở ra đi!',
				note: 'Đêm nay hãy cùng nhau thức thật khuya nhé! Yêu em!',
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
		title: 'Cùng nhau chạm đỉnh mây trời ❤️',
		theme: 'Đồng hành & Gắn kết',
		goals: [
			'Nắm tay nhau lên đỉnh (Hàm Rồng)',
			'Lưu giữ những khoảnh khắc vui vẻ',
			'Hòa mình vào chợ tình (để thấy đôi mình là tâm điểm)',
		],
		weather: {
			icon: '☀️',
			description: 'Trời hửng nắng, mây tan. Ánh sáng đẹp nhất chuyến đi.',
			temp: '11-18°C',
		},
		outfit:
			'Tone màu sáng: Trắng, Đỏ, Vàng để nổi bật trên nền xanh. Giày đế mềm/thể thao để tiện đi bộ.',
		warnings: ['Đi cẩn thận nha, chỗ nào khó đi cứ bám chặt lấy tay anh'],
		timeline: [
			{
				time: '08:00 - 09:00',
				title: 'Nắng sớm gọi mời',
				description:
					'Dậy sớm đón bình minh, ăn sáng thật ngon để có sức đi chơi cùng anh',
				note: 'Em cười trong nắng sớm là cảnh đẹp nhất anh từng thấy',
				type: 'rest',
			},
			{
				time: '09:00 - 11:30',
				title: 'Chinh phục Hàm Rồng',
				description:
					'Vườn Lan, Sân Mây... mỗi bước chân là một kỷ niệm. Lên cao để thấy tình yêu mình bao la',
				distance: 'Đi bộ từ trung tâm (ngay sau Nhà thờ Đá)',
				photoTips: {
					angle: 'Chụp lúc nắng xiên đẹp nhất (9h-10h)',
					pose: 'Em quay lại nhìn anh, tóc bay trong gió (tại Sân Mây)',
					tips: 'Chụp nhiều tại Vườn Lan và Sân Mây',
				},
				warnings: ['Đi chậm, nghỉ nhiều chặng để chụp ảnh'],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '11:30 - 13:00',
				title: 'Gà nướng đậm vị tình',
				description:
					'Thưởng thức gà nướng tiêu xanh cay nồng, xuýt xoa như những cái nắm tay ấm áp',
				address: 'Nhà hàng Hải Lâm - 69 Xuân Viên',
				hotline: '0934 246 696',
				photoTips: {
					angle: 'Chụp món ăn (Food porn)',
					pose: 'Đút cho nhau ăn thật tình cảm',
					tips: 'Gà nướng tiêu xanh là món signature ở đây',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Nghỉ ngơi nạp năng lượng',
				description:
					'Về phòng nghỉ sức. Tranh thủ lưu giữ vài tấm ảnh đẹp của hai đứa.',
				type: 'rest',
			},
			{
				time: '14:30 - 17:30',
				title: 'Lạc bước Cát Cát',
				description:
					'Em hóa thân thành cô gái bản, anh làm chàng trai si tình đi theo chụp ảnh',
				distance: '2km (Đi Taxi xuống cổng bản)',
				transport: 'Taxi chiều đi - Xe ôm chiều về (Không đi bộ ngược dốc)',
				photoTips: {
					angle: 'Góc trên cao chụp xuống (High-angle) tại cầu Si',
					pose: 'Quay lưng nhìn suối (Deep), tay cầm vạt váy xòe',
					tips: "Thuê trang phục dân tộc H'mông/Dao tại cổng bản",
				},
				warnings: [
					'Tuyệt đối không đi bộ ngược lên dốc (Rất mệt)',
					'Thuê xe ôm ngay bãi xe cuối bản để về',
				],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:00 - 22:00',
				title: 'Phiên chợ tình yêu',
				description:
					'Len lỏi trong chợ đêm, mua hạt dẻ nóng hổi bóc cho nhau ăn, mua quà đôi kỷ niệm',
				address: 'Khu Chợ Mới',
				note: 'Ở đâu có em, ở đó là nơi vui nhất',
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
		title: 'Tạm biệt Sapa thơ mộng 💕',
		theme: 'Lưu luyến & Hẹn ngày tái ngộ',
		goals: [
			'Ngắm lại Sapa lần cuối',
			'Gói ghém kỷ niệm (và quà cáp)',
			'Hẹn ngày trở lại khám phá tiếp',
		],
		weather: {
			icon: '🌤️',
			description: 'Hửng nắng, có thể có biển mây vào sáng sớm.',
			temp: '10-16°C',
		},
		outfit: 'Trang phục thoải mái, dễ chịu để di chuyển đường dài.',
		warnings: ['Kiểm tra kỹ hành lý, đừng để quên đồ nhé'],
		timeline: [
			{
				time: '08:00 - 10:00',
				title: 'Bình yên buổi sáng',
				description:
					'Ăn sáng thong thả, ngắm nhìn em thật kỹ trong không gian này lần cuối',
				type: 'rest',
			},
			{
				time: '10:00 - 12:00',
				title: 'Cà phê trên mây',
				description:
					'Viettrekking Café - Nơi mình cùng nhìn về dãy Hoàng Liên Sơn, thấy thế giới rộng lớn nhưng trong tim chỉ có nhau',
				address: '33 Hoàng Liên',
				transport: 'Xe đón đưa chu đáo',
				photoTips: {
					angle: 'Chụp bóng lưng hai đứa tựa vào nhau trước biển mây',
					pose: 'Em cầm ly cafe nhìn xa xăm, anh nhìn em',
					time: 'Sáng sớm mây bay là đà đẹp như mơ',
					tips: "View 'triệu đô' nhìn ra thung lũng Mường Hoa",
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '12:00',
				title: 'Tạm biệt căn phòng nhỏ',
				description:
					'Trả phòng thôi. Cảm ơn nơi này đã lưu giữ kỷ niệm đẹp của chúng mình.',
				address: 'Sapa House Hotel',
				type: 'transport',
			},
			{
				time: '12:00 - 13:30',
				title: 'Bữa trưa ấm lòng',
				description: 'Ăn bát phở gà nóng hổi để có sức đi đường dài về nhà',
				type: 'meal',
			},
			{
				time: '13:30 - 14:00',
				title: 'Đường về nhà',
				description:
					'Ra xe thôi. Hành trình kết thúc nhưng tình yêu mình vẫn tiếp nối',
				type: 'transport',
			},
			{
				time: '14:00 - 15:00',
				title: 'Trở về tổ ấm',
				description:
					'Lên xe về thôi. Tranh thủ ngủ lấy sức, tối về Hà Nội mình lại yêu thương tiếp.',
				note: 'Yêu em! Cảm ơn em vì đã để anh chăm sóc suốt mấy ngày qua.',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T10:00:00');
