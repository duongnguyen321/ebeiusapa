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
			"Giường êm để mình 'ngủ' ngon",
			'Phòng ấm áp để anh ôm em chặt hơn',
			'Không gian riêng tư tuyệt đối',
		],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân',
		departure: 'Hà Nội → Sapa, mình cùng đi trốn nhé',
		arrival: 'Đến nơi để bắt đầu những đêm không ngủ',
		returnDeparture: 'Chiều 18/01 mình mới phải về cơ',
		returnArrival: 'Về đến nhà rồi mình lại... yêu nhau tiếp',
	},
	birthday: {
		date: '16/01/2026',
		person: 'Người tình bé nhỏ',
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
		title: 'Màn dạo đầu ướt át 🌫️',
		theme: 'Cuộn tròn & Làm quen',
		goals: [
			"Check-in 'phòng tân hôn' của đôi mình",
			'Anh sẽ massage bù đắp cho em sau chuyến đi dài',
			'Thử cảm giác lạnh của Sapa để tìm hơi ấm từ nhau',
		],
		weather: {
			icon: '🌧️',
			description:
				'Mưa phùn ướt át, trời lạnh chỉ thích hợp để... nằm trên giường',
			temp: '11-15°C',
		},
		outfit:
			'Em mặc gì cũng đẹp, nhưng hôm nay kín đáo chút để dành bất ngờ cho buổi tối nhé',
		warnings: ["Nhiệm vụ: Phải hồi phục sức khoẻ nhanh để tối còn 'vui vẻ'"],
		timeline: [
			{
				time: '14:00',
				title: 'Về hang ổ tình yêu',
				description: 'Về phòng thôi, anh hứa chỉ ôm em ngủ (lúc đầu) thôi',
				address: '03A Thác Bạc, TT. Sapa',
				note: 'Chiếc giường này nhìn êm ái đấy, chắc sẽ tốn sức lắm đây',
				type: 'transport',
			},
			{
				time: '14:30 - 18:30',
				title: 'Giờ nghỉ ngơi (hoặc không)',
				description:
					'Kéo rèm, tắt điện, nghe tiếng mưa rơi và tiếng nhịp tim của nhau. Em ngủ đi, anh canh giấc mơ cho',
				note: 'Anh sẽ sưởi ấm cho em bằng... cách riêng của anh',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '18:30 - 20:00',
				title: 'Làm nóng cơ thể',
				description:
					'Đi ăn Cốn Sủi nóng hổi, nhưng chắc chắn không nóng bỏng bằng em tối nay',
				address: '436 Điện Biên Phủ, TT. Sapa',
				hotline: '0856 332 323',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:00 - 21:30',
				title: 'Dạo chơi trong bóng tối',
				description:
					'Nhà thờ Đá mờ ảo, mình tìm góc khuất nào đó để... chụp ảnh nhé',
				distance: 'Gần lắm, đi bộ để anh có cớ nắm tay và ôm eo em',
				transport: 'Đi bộ sát vào nhau nhé, lạnh đấy',
				photoTips: {
					angle: 'Anh chụp em, trong mắt anh chỉ có em thôi',
					pose: 'Em nép vào ngực anh, môi kề môi (hờ hững thôi nha)',
					time: 'Tối muộn vắng người, không gian này là của chúng ta',
					tips: 'Ánh đèn vàng làm da em trông quyến rũ lắm',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '22:00',
				title: 'Đêm nay ai cho em ngủ?',
				description:
					'Về phòng thôi, màn đêm Sapa lạnh lắm, cần hoạt động mạnh để sinh nhiệt',
				note: 'Chuẩn bị tâm hồn đẹp và sức khoẻ tốt nhé bé yêu',
				type: 'rest',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 5, 16/01',
		title: 'Sinh nhật nồng cháy 🔥',
		theme: 'Nuông chiều & Hư hỏng',
		goals: [
			'Hôm nay em là nữ hoàng, anh là kẻ phục tùng',
			'Spa để da thịt em thơm tho mềm mượt',
			'Một bữa tiệc riêng tư chỉ có anh và em (và chiếc giường)',
		],
		weather: {
			icon: '⛅',
			description: 'Sáng ẩm ướt, chiều hửng nắng, tối lại bùng cháy',
			temp: '12-17°C',
		},
		outfit: 'Váy sexy một chút nhé, hoặc cái gì đó dễ... cởi',
		warnings: ['Cảnh báo: Hôm nay anh sẽ không kiềm chế đâu'],
		timeline: [
			{
				time: '09:00 - 11:00',
				title: 'Chào buổi sáng (trên giường)',
				description:
					'Đánh thức em bằng nụ hôn (và hơn thế nữa). Ăn sáng tại giường nếu em muốn',
				note: 'Đừng dậy vội, mình còn nhiều thời gian mà',
				type: 'rest',
			},
			{
				time: '11:00 - 13:00',
				title: 'Hẹn hò lãng mạn',
				description:
					'Le Gecko Café - Ngồi sát bên nhau, anh thì thầm vào tai em những lời hư hỏng',
				address: '02 Ngũ Chỉ Sơn',
				hotline: '0214 387 1224',
				photoTips: {
					angle: 'Chụp góc nghiêng khoe xương quai xanh quyến rũ của em',
					pose: 'Mắt lúng liếng nhìn anh',
					tips: 'Gọi đồ uống có kem, dính một chút lên môi...',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Bí mật hư hỏng',
				description: "Anh đi chuẩn bị 'đồ chơi' cho buổi tối nay đây...",
				note: 'Em cứ việc chờ đợi sự bất ngờ đầy khoái cảm nhé',
				type: 'shopping',
			},
			{
				time: '14:30 - 17:00',
				title: 'Tắm tiên (gần như thế)',
				description:
					'Ngâm mình trong lá thuốc Dao Đỏ, để từng cm da thịt em được chăm sóc',
				address: 'Sapa Green Spa',
				hotline: '0214 387 2222',
				warnings: [
					'Ngâm xong da dẻ hồng hào nhìn chỉ muốn cắn',
					'Em sẽ thơm như một bông hoa rừng, anh sẽ là ong tìm mật',
				],
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '17:30 - 20:00',
				title: 'Bữa tối gợi tình',
				description:
					'Lẩu Cá Tầm bổ dưỡng, ăn vào để... sung sức cho cả đêm dài',
				address: 'A Quỳnh Restaurant',
				hotline: '0214 387 1666',
				photoTips: {
					angle: 'Chụp đôi mắt long lanh của em dưới ánh nến',
					pose: 'Em vén tóc để lộ cần cổ trắng ngần',
					tips: 'Không khí này làm gì cũng thấy lãng mạn',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:30+',
				title: 'ĐÊM CỰC KHOÁI 🔞',
				description:
					'Rượu vang, nến, bánh kem và... em. Đêm nay là của chúng ta',
				note: 'Happy Birthday my sexy Queen. Tắt điện thoại đi, đêm nay anh bận yêu em rồi',
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
		title: 'Đưa nhau đi trốn ❤️‍🔥',
		theme: 'Khám phá & Chinh phục',
		goals: [
			'Cùng nhau lên đỉnh... núi',
			'Để lại dấu ấn tình yêu (nhẹ thôi) ở mọi nơi mình qua',
			'Lạc lối trong nhau giữa bản làng',
		],
		weather: {
			icon: '☀️',
			description: 'Nắng vàng rực rỡ soi rõ vẻ đẹp của em',
			temp: '11-18°C',
		},
		outfit:
			'Outfit năng động nhưng vẫn phải tôn dáng nhé, anh thích ngắm đường cong của em',
		warnings: ['Đi đứng cẩn thận, ngã vào lòng anh thì được'],
		timeline: [
			{
				time: '08:00 - 09:00',
				title: 'Đánh thức nàng thơ',
				description:
					'Dậy thôi bé ơi, tối qua mệt không? Ăn sáng để nạp lại năng lượng nào',
				note: 'Nhìn em lúc mới ngủ dậy gợi cảm chết đi được',
				type: 'rest',
			},
			{
				time: '09:00 - 11:30',
				title: 'Lên đỉnh cùng nhau',
				description:
					'Leo núi Hàm Rồng. Mệt thì anh cõng, nhưng em phải... thưởng cho anh đấy',
				distance: 'Gần xịt à',
				photoTips: {
					angle: 'Chụp từ phía sau khi em nhìn mây trời (sexy back)',
					pose: 'Gió bay tóc rối, môi hững hờ',
					time: 'Nắng sớm chiếu vào làm em trông như thiên thần (nội y)',
					tips: "Tìm góc vắng mình 'check-in' môi một cái nhé",
				},
				warnings: ['Tim đập nhanh vì leo núi hay vì anh?'],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '11:30 - 13:00',
				title: 'Gà nướng bốc lửa',
				description:
					'Ăn gà nướng tiêu xanh cay nồng, xuýt xoa như nụ hôn nồng cháy',
				address: 'Nhà hàng Hải Lâm',
				hotline: '0934 246 696',
				photoTips: {
					angle: 'Góc POV anh đút cho em ăn',
					pose: 'Môi chạm nhẹ vào món ăn đầy khiêu khích',
					tips: 'Ăn xong mình về nghỉ ngơi... vận động nhẹ tí không?',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Giấc ngủ trưa (nóng bỏng)',
				description:
					"Về phòng sạc pin. Tranh thủ 'yêu' thêm một chút trước khi đi chơi tiếp",
				type: 'rest',
			},
			{
				time: '14:30 - 17:30',
				title: 'Sơn nữ gợi cảm',
				description:
					'Xuống bản Cát Cát, em mặc váy dân tộc hở vai trần cho anh ngắm nhé',
				distance: 'Xe đưa tận nơi',
				transport: 'Anh bao trọn gói, em chỉ việc đẹp',
				photoTips: {
					angle: 'Chụp góc cao xuống khe ngực lấp ló (chỉ anh được xem)',
					pose: 'Lội suối ướt át, chân trần gợi cảm',
					tips: 'Anh sẽ là thợ chụp ảnh riêng háo sắc của em',
				},
				warnings: ['Đừng cười xinh quá anh lại muốn bắt cóc về phòng ngay'],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:00 - 22:00',
				title: 'Chợ đêm tình yêu',
				description: 'Dạo chợ đêm, ăn đồ nướng, tìm mua mấy món đồ... thú vị',
				address: 'Khu Chợ Mới',
				note: 'Tay trong tay, vai kề vai, môi kề...',
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
		title: 'Dư âm ngọt ngào 💋',
		theme: 'Lưu luyến & Hẹn ước',
		goals: [
			'Một lần cuối ngắm nhìn Sapa (và ngắm em)',
			'Gói ghém hương vị tình yêu mang về',
			'Về nhà để tiếp tục... yêu nhau ở địa điểm quen thuộc',
		],
		weather: {
			icon: '🌤️',
			description: 'Trời đẹp như muốn níu kéo đôi mình ở lại trên giường',
			temp: '10-16°C',
		},
		outfit: 'Thoải mái, dễ chịu để mình ôm nhau trên xe về',
		warnings: [
			'Đừng quên đồ lót ở khách sạn nha bé, anh không chịu trách nhiệm đâu',
		],
		timeline: [
			{
				time: '08:00 - 10:00',
				title: 'Bữa sáng trên giường?',
				description:
					'Lần cuối được ngủ nướng ở đây. Tranh thủ... làm nháy nữa không?',
				type: 'rest',
			},
			{
				time: '10:00 - 12:00',
				title: 'Cà phê view mây (và chân dài)',
				description:
					'Viettrekking Café - Ngắm mây vờn núi, còn anh ngắm tay em vân vê ly cafe',
				address: '33 Hoàng Liên',
				transport: 'Xe đón rước tận nơi',
				photoTips: {
					angle: 'Chụp đôi chân dài miên man của em gác lên ghế',
					pose: 'Ánh mắt lúng liếng nhìn anh đầy ẩn ý',
					time: 'Sáng sớm mờ ảo như tâm trí anh lúc này',
					tips: 'Nơi này chill lắm, tha hồ mà... nắm tay',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '12:00',
				title: 'Tạm biệt chốn thiên đường',
				description:
					'Trả phòng. Tạm biệt chiếc giường đã chứng kiến bao kỷ niệm nồng cháy',
				address: 'Sapa House Hotel',
				type: 'transport',
			},
			{
				time: '12:00 - 13:30',
				title: 'Ăn gì cho lại sức?',
				description: 'Phở gà nóng hổi, bồi bổ sau mấy ngày... vất vả',
				type: 'meal',
			},
			{
				time: '13:30 - 14:00',
				title: 'Ra bến xe',
				description: 'Nắm chặt tay anh nhé, mình về nhà thôi',
				type: 'transport',
			},
			{
				time: '14:00 - 15:00',
				title: 'Về tổ ấm thân quen',
				description:
					'Xe lăn bánh. Em ngủ ngoan trong lòng anh nhé, về nhà mình lại... tiếp tục nha',
				note: 'Yêu em điên cuồng! Cảm ơn em vì chuyến đi cháy bỏng này',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T10:00:00');
