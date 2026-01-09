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
		name: 'Sapa House Hotel 🏡',
		address: '03A Thác Bạc, TT. Sapa',
		phone: '0214 387 1234',
		checkIn: '14:00 ngày 15/01',
		checkOut: '12:00 ngày 18/01',
		includes: [
			'Bữa sáng lãng mạn mỗi ngày 🥐',
			'Phòng ấm áp như lòng anh 🔥',
			'Đặt bánh kem tình yêu 🎂',
		],
	},
	transport: {
		company: 'Hà Sơn - Hải Vân 🚌',
		departure: 'Hà Nội → Sapa, đến trước 14:00 ngày 15/01',
		arrival: '~14:00 ngày 15/01',
		returnDeparture: '14:00-15:00 ngày 18/01',
		returnArrival: '~20:00 ngày 18/01',
	},
	birthday: {
		date: '16/01/2026',
		person: 'Người yêu bé bỏng 💕',
	},
};

// ==================== EMERGENCY CONTACTS ====================

export const emergencyContacts: EmergencyContact[] = [
	{ name: 'Taxi Xanh Sapa', phone: '0214 363 63 63', icon: '🚕' },
	{ name: 'Taxi Mai Linh', phone: '0214 376 76 76', icon: '🚖' },
	{ name: 'Khách sạn Sapa House', phone: '0214 387 1234', icon: '🏨' },
	{ name: 'Cấp cứu', phone: '115', icon: '🏥' },
];

// ==================== ITINERARY ====================

export const itinerary: DaySchedule[] = [
	{
		id: 1,
		date: '2026-01-15',
		dateLabel: 'Thứ 4, 15/01',
		title: 'CHẠM NGÕ XỨ MÂY 🌫️',
		theme: 'Nghỉ ngơi & Yêu thương',
		goals: [
			'Đặt chân đến tổ ấm tạm thời của đôi mình 🏡',
			'Chăm sóc em sau chặng đường dài 💝',
			'Ngắm Sapa về đêm lung linh bên nhau ✨',
		],
		weather: {
			icon: '🌧️',
			description: 'Mưa phùn, Sương mù lãng mạn',
			temp: '11-15°C',
		},
		outfit:
			'Áo khoác ấm áp, Ô trong suốt (để chụp ảnh mưa thật lãng mạn), Boot xinh xắn 👢',
		warnings: ['💕 Anh sẽ chăm sóc em thật kỹ sau chuyến xe dài nha!'],
		timeline: [
			{
				time: '14:00',
				title: 'Đặt chân đến thiên đường mây ☁️',
				description:
					'Anh sẽ đưa em về khách sạn ấm áp, nơi tình yêu mình bắt đầu những ngày ngọt ngào',
				address: '03A Thác Bạc, TT. Sapa',
				note: 'Anh sẽ lo hết, em chỉ cần xinh đẹp thôi nha 💕',
				type: 'transport',
			},
			{
				time: '14:30 - 18:30',
				title: 'Giấc mơ ngọt ngào 💤',
				description:
					'Nghỉ ngơi trong vòng tay anh, để cơ thể em được thư giãn hoàn toàn',
				note: 'Anh sẽ pha trà gừng nóng cho em uống nhé, ấm lắm luôn 🍵',
				type: 'rest',
				isHighlight: true,
			},
			{
				time: '18:30 - 20:00',
				title: '🍜 Bữa tối đầu tiên bên nhau',
				description:
					'Cốn Sủi đặc sản - Món nóng hổi thơm ngon nhất Sapa, ấm lòng người yêu nhất của anh',
				address: '436 Điện Biên Phủ, TT. Sapa',
				hotline: '0856 332 323',
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:00 - 21:30',
				title: '📸 Nhà thờ Đá dưới ánh đèn vàng',
				description:
					'Cùng nhau dạo bước trong sương, chụp những bức ảnh đẹp nhất với người đẹp nhất',
				distance: 'Chỉ cách 200 bước chân thôi, đủ để nắm tay em đi bộ 💑',
				transport: 'Đi bộ tay trong tay',
				photoTips: {
					angle: 'Đứng bên hông nhà thờ, camera đặt thấp hướng lên trời',
					pose: 'Em cầm ô trong suốt, nhìn về phía nhà thờ thật mơ màng',
					time: 'Sau 20h khi đèn vàng lung linh nhất',
					tips: 'Ô trong suốt + sương mù = Bức ảnh cổ tích của đôi mình 🥰',
				},
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '22:00',
				title: 'Về tổ ấm nghỉ ngơi 🏠',
				description:
					'Chuẩn bị tinh thần cho ngày mai - Ngày đặc biệt nhất của em!',
				type: 'rest',
			},
		],
		isBirthday: false,
	},
	{
		id: 2,
		date: '2026-01-16',
		dateLabel: 'Thứ 5, 16/01',
		title: 'HAPPY BIRTHDAY MY LOVE 🎂💕',
		theme: 'Nuông chiều & Hạnh phúc',
		goals: [
			'Mọi khoảnh khắc hôm nay đều thuộc về em 👑',
			'Được spa thư giãn như một nàng công chúa 💆‍♀️',
			'Tiệc sinh nhật lãng mạn chỉ có đôi ta 🥳',
		],
		weather: {
			icon: '⛅',
			description: 'Sáng mưa bay nhẹ, Chiều trời hửng nắng như nụ cười em',
			temp: '12-17°C',
		},
		outfit:
			'Váy len Vintage thanh lịch (Trắng/Be), Áo dạ nâu ấm áp - Xinh như công chúa của anh 👸',
		warnings: ['👑 Hôm nay em là VIP, mọi thứ anh lo hết nha!'],
		timeline: [
			{
				time: '09:00 - 11:00',
				title: '😴 Ngủ nướng thoả thích',
				description:
					'Ngày sinh nhật được ngủ nướng bao lâu tuỳ thích! Quyền lợi của công chúa mà 👑',
				note: 'Ăn sáng tại giường cũng được nha, anh đi lấy cho em',
				type: 'rest',
			},
			{
				time: '11:00 - 13:00',
				title: '☕ Le Gecko Café - Như Paris giữa núi rừng',
				description:
					'Ngồi trong kính nhìn ra hồ mờ sương, nhâm nhi Cacao nóng với người yêu',
				address: '02 Ngũ Chỉ Sơn (View hồ Sapa)',
				hotline: '0214 387 1224',
				photoTips: {
					angle: 'Ngồi trong nhà kính nhìn ra hồ, ánh sáng tự nhiên tràn vào',
					pose: 'Cầm ly Cacao nóng, nhìn ra cửa sổ thật mơ màng',
					tips: 'Café trứng nóng hổi là must-try nha em!',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: '🎁 Chuẩn bị điều bí mật...',
				description: 'Anh có một chút việc nhỏ, em chờ anh một xíu nha 💕',
				note: 'Hint: Có gì đó ngọt ngào đang chờ em...',
				type: 'shopping',
			},
			{
				time: '14:30 - 17:00',
				title: '💆‍♀️ Tắm lá thuốc Dao Đỏ - Nuông chiều làn da',
				description:
					'Trải nghiệm tắm lá thuốc 100+ loại thảo dược, thư giãn như spa hoàng gia',
				address: 'Sapa Green Spa - 02 Hoàng Liên',
				hotline: '0214 387 2222',
				warnings: [
					'💝 Ngâm 20-25 phút thôi nha, để da em đẹp mà không bị say thuốc',
					'Sau khi tắm không cần tráng nước để thuốc thấm vào da em luôn 🌿',
				],
				note: 'Làn da sẽ mịn màng, thơm như hoa rừng 🌸',
				type: 'spa',
				isHighlight: true,
			},
			{
				time: '17:30 - 20:00',
				title: '🍲 Tiệc sinh nhật lãng mạn',
				description:
					'Lẩu Cá Tầm cao cấp, ngọt thơm như tình yêu của đôi mình, trong không gian ấm áp chỉ có hai ta',
				address: 'A Quỳnh Restaurant - 15 Thạch Sơn',
				hotline: '0214 387 1666',
				photoTips: {
					angle: 'Góc từ trên xuống với nồi lẩu bốc khói ấm áp',
					pose: 'Hai đứa mình gắp đồ cho nhau, cười thật hạnh phúc',
					tips: 'Không gian gỗ ấm cúng lung linh ánh nến 🕯️',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '20:30+',
				title: '🎂 TIỆC SINH NHẬT RIÊNG TƯ',
				description:
					'Bánh kem, nến lung linh, rượu vang, và chỉ có em với anh... 💕',
				note: 'Happy Birthday to the love of my life! 🎉💕',
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
		title: 'KHÁM PHÁ THIÊN ĐƯỜNG 🏔️☀️',
		theme: 'Phiêu lưu & Kỷ niệm',
		goals: [
			'Chạm đến những đỉnh mây cùng nhau ☁️',
			'Thu thập hàng trăm bức ảnh đẹp của đôi mình 📸',
			'Đêm chợ sáng đèn, tay trong tay dạo phố 🌙',
		],
		weather: {
			icon: '☀️',
			description: 'Nắng đẹp rực rỡ, như nụ cười em mỗi sáng',
			temp: '11-18°C',
		},
		outfit:
			'Đồ năng động màu sáng (Trắng/Đỏ/Vàng) - Nổi bật giữa núi xanh như ngôi sao của anh ⭐',
		warnings: [
			'👟 Mang giày thể thao êm ái nha em, để anh dắt em đi khắp nơi!',
			'🚗 Yên tâm, đường nào xa anh có xe đưa đón em ấm áp',
		],
		timeline: [
			{
				time: '08:00 - 09:00',
				title: 'Ăn sáng & Lên đồ xinh ✨',
				description:
					'Trang điểm thật xinh, chọn outfit sáng màu để toả sáng như nàng công chúa núi rừng',
				note: 'Tone: Trắng/Đỏ/Vàng - Nổi bật trên nền xanh biếc',
				type: 'rest',
			},
			{
				time: '09:00 - 11:30',
				title: '🏔️ Chinh phục Núi Hàm Rồng',
				description:
					'Cùng nhau lên đỉnh mây, ngắm toàn cảnh Sapa từ Sân Mây huyền thoại',
				distance: 'Chỉ cách 5 phút đi bộ từ khách sạn',
				photoTips: {
					angle:
						'Tại Sân Mây: Đứng rìa view thung lũng, camera góc thấp lấy cả trời mây',
					pose: 'Em dang tay, tóc bay trong gió, nụ cười rạng rỡ',
					time: '9-10h sáng - Nắng xiên đẹp nhất, sương tan tạo màu hoàng kim',
					tips: 'Vườn Lan → Vườn 12 con giáp → SÂN MÂY. Đi chậm thôi, để anh chụp em ở mọi góc đẹp 📸',
				},
				warnings: [
					'💪 Có nhiều bậc thang nhưng đừng lo, anh dắt em đi từng bước!',
				],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '11:30 - 13:00',
				title: '🍗 Gà nướng tiêu xanh - Món ngon huyền thoại',
				description:
					'Gà đen bản địa thơm lừng, da giòn tan, sốt tiêu xanh cay nhẹ kích thích vị giác',
				address: 'Nhà hàng Hải Lâm - 69 Xuân Viên',
				hotline: '0934 246 696',
				photoTips: {
					angle: 'Góc nghiêng 45° với đĩa gà bốc khói thơm phức',
					pose: 'Em cắn một miếng, mắt lấp lánh hạnh phúc',
					tips: 'Nhà hàng có view đẹp, chụp cả không gian núi rừng xa xa 🏔️',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '13:00 - 14:30',
				title: 'Nghỉ trưa ngọt ngào 💤',
				description: 'Về khách sạn thư giãn, nạp năng lượng cho buổi chiều',
				type: 'rest',
			},
			{
				time: '14:30 - 17:30',
				title: '🌾 Bản Cát Cát - Cổ tích giữa đời thường',
				description:
					'Đi xuống thung lũng, qua những vườn hoa, guồng nước cổ kính, thác Tiên Sa huyền bí',
				distance: 'Anh gọi xe đưa em đến cổng nha',
				transport:
					'Xe đưa đón → Đi bộ XUỐNG dốc (nhẹ nhàng) → Xe chở về (không cần leo ngược!)',
				photoTips: {
					angle: 'Tại Cầu Si: Anh đứng trên bờ cao chụp xuống em đứng giữa cầu',
					pose: 'Quay lưng nhìn suối, vuốt tóc nhẹ hoặc xoè vạt váy như cô gái mộng mơ',
					tips: "Thuê váy H'mông xinh xắn tại cổng để chụp ảnh cổ tích nha em! 👗",
				},
				warnings: [
					'💕 Anh sẽ thuê xe đón em ở cuối bản, không cần leo ngược lên đâu nha!',
				],
				type: 'activity',
				isHighlight: true,
			},
			{
				time: '18:00 - 22:00',
				title: '🌙 Chợ đêm Sapa - Đêm phố sáng đèn',
				description:
					'Dạo phố ăn vặt, xiên nướng thơm lừng, hạt dẻ nóng hổi, tay trong tay dưới ánh đèn lung linh',
				address: 'Khu Chợ Mới / Sân Quần',
				note: 'Mình cùng chọn quà nhỏ xinh mang về làm kỷ niệm nha 🎁',
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
		title: 'HẸN GẶP LẠI NHÉ, SAPA 💕',
		theme: 'Lưu luyến & Hẹn ước',
		goals: [
			'Ngắm Sapa lần cuối từ view triệu đô ☕',
			'Hứa hẹn sẽ quay lại với nhiều kỷ niệm hơn 💑',
			'Mang theo trọn vẹn tình yêu trở về 💝',
		],
		weather: {
			icon: '🌤️',
			description: 'Trời quang đãng, mây luồn thung lũng như lời chào tạm biệt',
			temp: '10-16°C',
		},
		outfit: 'Thoải mái, ấm áp, đủ xinh để anh ngắm em suốt đường về 💕',
		warnings: ['⏰ 14:00-15:00 mình cùng lên xe về nha em!'],
		timeline: [
			{
				time: '08:00 - 10:00',
				title: 'Ăn sáng & Thu dọn hành lý 🧳',
				description:
					'Ăn sáng thong thả, đóng gói đồ đạc và... đóng gói cả kỷ niệm mang về',
				type: 'rest',
			},
			{
				time: '10:00 - 12:00',
				title: '☕ Viettrekking Café - View triệu đô',
				description:
					'Ngắm toàn cảnh dãy Hoàng Liên Sơn và thung lũng mây, nơi nói lời tạm biệt Sapa hoàn hảo nhất',
				address: '33 Hoàng Liên, TT. Sapa',
				transport: 'Anh gọi xe đưa em đến nha',
				photoTips: {
					angle: 'Ngồi góc ban công, hướng về thung lũng mây bồng bềnh',
					pose: 'Profile shot - Cầm ly café, nhìn xa xăm về núi non',
					time: 'Sáng sớm có mây luồn đẹp nhất',
					tips: 'View đẹp nhất Sapa để nói lời tạm biệt 🏔️💕',
				},
				type: 'meal',
				isHighlight: true,
			},
			{
				time: '12:00',
				title: '📦 Tạm biệt tổ ấm nhỏ',
				description: 'Trả phòng, gửi hành lý, giữ lại mãi những kỷ niệm đẹp',
				address: 'Sapa House Hotel - 03A Thác Bạc',
				type: 'transport',
			},
			{
				time: '12:00 - 13:30',
				title: '🍜 Phở gà - Bữa ăn cuối ấm lòng',
				description: 'Phở gà ngon nức tiếng, ấm áp cho đường về dài',
				address: 'Đường Tuệ Tĩnh',
				type: 'meal',
			},
			{
				time: '13:30 - 14:00',
				title: 'Di chuyển ra bến xe 🚌',
				description: 'Lấy hành lý, ra xe để về với thành phố',
				type: 'transport',
			},
			{
				time: '14:00 - 15:00',
				title: '🚌 Tạm biệt Sapa, Hẹn gặp lại! 💕',
				description:
					'Về Hà Nội thôi, nhưng Sapa sẽ mãi trong trái tim đôi mình. Hẹn gặp lại nha xứ mây!',
				note: 'Dự kiến đến Hà Nội ~20:00 - Anh đưa em về nhà an toàn nha 🏠💕',
				type: 'transport',
				isHighlight: true,
			},
		],
		isBirthday: false,
	},
];

export const targetDate = new Date('2026-01-15T10:00:00');
