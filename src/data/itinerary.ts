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
			'Giường êm để mình ôm nhau ngủ',
			'Phòng ấm áp cho những lời thủ thỉ',
			'Không gian riêng tư của chúng mình',
		],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân',
		departure: 'Hà Nội → Sapa, đưa nhau đi trốn',
		arrival: 'Đến nơi để bắt đầu hành trình yêu thương',
		returnDeparture: 'Chiều 18/01 mình mới phải về',
		returnArrival: 'Về đến nhà mình vẫn còn nhau',
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
	{ name: 'Khách sạn Sapa House', phone: '0214 387 1234', icon: 'HOT' },
];

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	{
		id: 1,
		date: '2026-01-15',
		dateLabel: 'Thứ 4, 15/01',
		title: 'Chạm ngõ xứ sương mù 🌫️',
		theme: 'Ấm áp & Bình yên',
		goals: [
			'Về ngôi nhà tạm thời của đôi mình',
			'Bù đắp cho em bằng những cái ôm thật chặt',
			'Cảm nhận cái lạnh Sapa để thấy cần nhau hơn',
		],
		weather: {
			icon: '🌧️',
			description: 'Mưa phùn, sương mù đậm đặc. Độ ẩm >90%, tầm nhìn <50m.',
			temp: '11-15°C',
		},
		outfit:
			'Ưu tiên màu Đỏ, Cam đất hoặc Trắng kem để nổi bật trong sương (Tránh màu ghi/xám). Mang theo ô trong suốt.',
		warnings: [
			'Về đến nơi anh sẽ chăm sóc em thật kỹ, em chỉ cần nghỉ ngơi thôi',
		],
		timeline: [
			{
				time: '14:00',
				title: 'Về tổ ấm bình yên',
				description: 'Mình về nhận phòng thôi, bỏ lại mệt mỏi sau cánh cửa nhé',
				address: '03A Thác Bạc, TT. Sapa',
				note: 'Căn phòng này sẽ lưu giữ những khoảnh khắc đầu tiên của chúng mình',
				type: 'transport',
			},
			{
				time: '14:30 - 18:30',
				title: 'Khoảng trời riêng tư',
				description:
					'Không cần đi đâu vội, mình nằm bên nhau nghe tiếng mưa rơi, để anh xoa dịu cơn say xe cho em',
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
				title: 'Dạo bước dưới ánh đèn vàng',
				description:
					'Nhà thờ Đá lung linh trong sương, khung cảnh như phim tình cảm của riêng đôi mình',
				distance: '200m quanh quảng trường (Đi bộ nhẹ nhàng)',
				transport: 'Đi bộ, nếu lạnh thì mình gọi Taxi',
				photoTips: {
					angle: 'Góc thấp từ bên hông nhà thờ hướng lên tháp chuông',
					pose: 'Đứng dưới ô trong suốt, nhìn nhau hoặc nhìn xa xăm',
					tips: "Giảm độ sáng (-0.3 EV) để sương mù trông dày và 'moody' hơn",
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '22:00',
				title: 'Giấc mơ dịu êm',
				description:
					'Về phòng ủ ấm trong chăn bông thôi. Đêm Sapa lạnh nhưng trong lòng mình thì ấm',
				note: 'Ngủ ngon nhé công chúa của anh',
				type: 'rest',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 5, 16/01',
		title: 'Ngày của Nàng Thơ 🌹',
		theme: 'Ngọt ngào & Nuông chiều',
		goals: [
			'Là ngày em được cưng chiều nhất (dù ngày nào anh cũng chiều)',
			'Spa thư giãn để em xinh càng thêm xinh',
			'Tiệc sinh nhật lung linh ánh nến',
		],
		weather: {
			icon: '⛅',
			description: 'Có mưa phùn nhẹ và sương mù. Trời lạnh ẩm.',
			temp: '12-17°C',
		},
		outfit:
			'Trang phục ấm áp, thoải mái. Mang theo váy xinh để thay cho bữa tiệc tối (Khoác thêm áo ấm bên ngoài).',
		warnings: ['Chuẩn bị tinh thần để nhận thật nhiều yêu thương nhé!'],
		timeline: [
			{
				time: '09:00 - 11:00',
				title: 'Bình minh muộn màng',
				description:
					'Cứ ngủ nướng thoả thích trong vòng tay anh. Hôm nay em là nữ hoàng, không ai được đánh thức',
				note: 'Dậy lúc nào mình ăn lúc đó, anh đợi được',
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
				title: 'Thư giãn nhan sắc',
				description:
					'Tắm lá thuốc Dao Đỏ tại Sapa Green Spa, bồn gỗ Pơ-mu chuẩn vị',
				address: '02 Hoàng Liên',
				hotline: '0214 387 2222',
				warnings: [
					'Chỉ ngâm tối đa 20-25 phút để tránh say thuốc',
					'Không cần tráng lại nước sau khi tắm',
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
				title: 'SINH NHẬT NGỌT NGÀO 🎂',
				description:
					'Bánh kem, hoa và quà. Chúc mừng sinh nhật người thương của anh ❤️',
				note: 'Cảm ơn em đã đến bên đời anh. Đêm nay bình yên và hạnh phúc nhé',
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
		title: 'Cùng nhau đi trốn ❤️',
		theme: 'Đồng hành & Ghi dấu',
		goals: [
			'Nắm tay nhau lên đỉnh núi cao',
			'Lưu giữ thanh xuân của chúng mình qua từng bức ảnh',
			'Hòa mình vào phiên chợ tình náo nhiệt',
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
				title: 'Nạp năng lượng yêu thương',
				description:
					'Về phòng nghỉ ngơi chút cho lại sức. Nằm bên nhau xem lại ảnh hồi sáng',
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
		title: 'Hẹn ước mùa mây 💕',
		theme: 'Lưu luyến & Hy vọng',
		goals: [
			'Ngắm lại Sapa lần cuối và khắc ghi vào tim',
			'Gói ghém những kỷ niệm ngọt ngào mang về',
			'Hẹn ngày trở lại khi tình mình càng lớn hơn',
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
				title: 'Tạm biệt chốn kỷ niệm',
				description:
					'Trả phòng thôi. Cảm ơn Sapa đã cho mình những ngày thật đẹp',
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
				title: 'Trở về bên nhau',
				description:
					'Trên xe em cứ dựa vào vai anh ngủ nhé. Về đến nhà mình vẫn có nhau mà',
				note: 'Yêu em nhiều hơn cả những ngày qua! Cảm ơn em vì chuyến đi tuyệt vời',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T10:00:00');
