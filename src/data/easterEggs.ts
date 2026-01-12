export interface EasterEggConfig {
	spawnCooldown: number;
	spawnChance: number;
}

export interface VoucherReward {
	id: string;
	title: string;
	description: string;
	icon: string;
	isRedeemed: boolean;
	isUsed: boolean;
}

export interface QuizOption {
	id: string;
	label: string;
	isCorrect: boolean;
	responseMessage?: string;
}

export interface QuizData {
	id: string;
	date?: string;
	question: string;
	images?: string[];
	options: QuizOption[];
	reward: VoucherReward;
}

export interface MoodResponse {
	images: string[];
	message: string;
}

export interface MoodOption {
	id: string;
	icon: string;
	label: string;
	response: MoodResponse;
}

export interface MoodCheckinData {
	id: string;
	title: string;
	options: MoodOption[];
}

export interface FunnyMomentData {
	id: string;
	image: string;
	comment: string;
}

export interface MemoryCapsuleData {
	id: string;
	title: string;
	dateLabel: string;
	description: string;
	images: string[];
	unlockCondition?: 'random' | 'time' | 'location';
}

// ==================== DATA ====================

// --- MEMORY CAPSULES ---
// Chứa các kỷ niệm theo dòng thời gian (Chương 1 -> Chương 4)
export const memoryCapsules: MemoryCapsuleData[] = [
	{
		id: 'cap-chapter1-begin',
		title: 'Chương 1: Khởi Đầu',
		dateLabel: '01/04/2025',
		description:
			'Ngày Cá tháng Tư định mệnh. Từ tin nhắn đầu tiên đến lần gặp gỡ đầu tiên. Ai ngờ đâu mình "dính" nhau đến tận bây giờ nhỉ?',
		images: [
			'/images/easter-eggs/first-time-flirting-you-on-messenger.jpg',
			'/images/easter-eggs/first-time-see-you.jpg',
			'/images/easter-eggs/first-time-hangout-with-you.jpg',
		],
	},
	{
		id: 'cap-chapter1-company',
		title: 'Chương 1: Tình Yêu Công Sở',
		dateLabel: 'Tháng 4/2025',
		description:
			'Hai đứa mình cùng vào làm ngày 01/04, những buổi trưa đi ăn, những tấm ảnh chụp trộm, và những cái chạm chân lén lút. Giờ thì cả hai đều đã tốt nghiệp công ty cũ rồi!',
		images: [
			'/images/easter-eggs/go-lunch-with-you-at-company.jpg',
			'/images/easter-eggs/we-are-foot-skinship-at-our-company.jpg',
			'/images/easter-eggs/we-are-foot-skinship-at-our-compay-again.jpg',
			'/images/easter-eggs/take-a-photo-you-use-my-cloth-and-my-short-at-our-company.jpg',
			'/images/easter-eggs/secretly-taking-photos-our-company.jpg',
		],
	},
	{
		id: 'cap-chapter2-puku',
		title: 'Chương 2: PUKU & Deep Talk',
		dateLabel: 'Những đêm không ngủ',
		description:
			'Quán Pub đầu tiên mình đi cùng nhau. Không nhạc, chỉ có những câu chuyện thâu đêm suốt sáng. Nơi nuôi dưỡng tâm hồn của hai đứa.',
		images: [
			'/images/easter-eggs/third-times-go-to-PUKU-cafe.jpg',
			'/images/easter-eggs/fourth-time-go-to-PUKU-cafe-and-eat-pizza-and-im-working-on-my-macbook.jpg',
			'/images/easter-eggs/your-old-poor-iphone-and-first-time-hangout-with-you-late-night-at-PUKU-cafe.jpg',
			'/images/easter-eggs/the-secconds-time-go-to-puku-cafe-again.jpg',
			'/images/easter-eggs/first-time-we-go-to-bar-together-2.jpg',
			'/images/easter-eggs/first-time-we-are-go-to-bar-together.jpg',
		],
	},
	{
		id: 'cap-chapter2-artdistrict',
		title: 'Chương 2: Art District',
		dateLabel: 'Gần nhà',
		description:
			'Quán Pub có nhạc chill chill gần nhà. Nơi đánh dấu những nụ hôn công khai đầu tiên của chúng mình.',
		images: [
			'/images/easter-eggs/first-time-go-pub-at-ART-DISTRICT.jpg',
			'/images/easter-eggs/seccond-time-go-to-pub-ART-DISTRICT-again-and-we-take-a-long-kiss.jpg',
			'/images/easter-eggs/we-are-pretend-to-be-best-friends-at-the-pub.jpg',
		],
	},
	{
		id: 'cap-chapter2-firsttime',
		title: 'Chương 2: Lần Đầu',
		dateLabel: 'Thung Lũng Hoa',
		description:
			'Đêm định mệnh ở Thung Lũng Hoa Hồ Tây. Nụ hôn đầu thực sự, khách sạn, nước mắt và cái ôm dỗ dành của anh. Một ký ức không bao giờ quên.',
		images: [
			'/images/easter-eggs/first-time-at-West-Lake-Flower-Valley.jpg',
			'/images/easter-eggs/first-flowers-i-bouth-to-you-and-you-are-very-love-it-and-we-go-to-West-Lake-Flower-Valley-again.jpg',
			'/images/easter-eggs/we-sleep-all-night-at-West-Lake-Flower-Valley-with-your-first-flowers-i-bouth.jpg',
		],
	},
	{
		id: 'cap-chapter3-catba',
		title: 'Chương 3: Cát Bà Ký Sự',
		dateLabel: 'Tháng 7/2025',
		description:
			'Chuyến đi xa đầu tiên cùng công ty. Dù đi đông người nhưng trong mắt anh chỉ có em.',
		images: [
			'/images/easter-eggs/first-long-trip-with-you-at-Cat-Ba-with-out-company.jpg',
			// Added generic beach/trip vibe or filler to ensure multiple images
			'/images/easter-eggs/first-time-see-you.jpg',
		],
	},
	{
		id: 'cap-chapter3-bi',
		title: 'Chương 3: Bé Bi Corgi',
		dateLabel: '10/11/2025',
		description:
			'Anh sinh nhật 22/11, nhưng mình đón Bi về từ 10/11. Món quà sinh nhật ý nghĩa nhất từ "quỹ chung" của hai ta.',
		images: [
			'/images/easter-eggs/first-thing-we-bouth-together-is-a-corgi-dog-name-Bi-and-it-is-best-ever-gift-in-my-birthday.jpg',
			// Reusing another cute photo to meet requirement
			'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo.jpg',
		],
	},
	{
		id: 'cap-chapter3-dating',
		title: 'Chương 3: Hẹn Hò Giản Đơn',
		dateLabel: '2025',
		description:
			'Những lần đi xem phim, mua sắm cùng nhau. Từ chiếc áo em chọn cho anh, đến cặp mũ bảo hiểm đôi cute lạc lối.',
		images: [
			'/images/easter-eggs/first-time-go-to-watching-movie-with-you.jpg',
			'/images/easter-eggs/your-cloth-you-bouth-to-me-with-your-color-choice.jpg',
			'/images/easter-eggs/we-bouth-a-new-helmet-look-like-twice-cutes-ducks.jpg',
			'/images/easter-eggs/it-me-and-we-are-go-to-buy-a-new-glasses-for-me.jpg',
		],
	},
	{
		id: 'cap-chapter3-hair',
		title: 'Chương 3: Bộ Sưu Tập Tóc',
		dateLabel: 'Sắc Màu',
		description:
			'Từ tóc vàng (tẩy 3 lần!), sang đỏ rực rỡ (rồi phai ra hồng), và gần đây là màu xanh dương khi đi ăn cưới. Em cân mọi màu tóc!',
		images: [
			'/images/easter-eggs/a-cute-photo-when-first-time-i-gave-you-money-to-hair-colored.jpg',
			'/images/easter-eggs/embarrassing-photo-first-time-you-are-hair-colored-2.jpg',
			'/images/easter-eggs/new-hair-color-is-red-very-beautyful.jpg',
			'/images/easter-eggs/best-beautyful-ever-photo-with-new-red-hair-colored.jpg',
		],
	},
	{
		id: 'cap-chapter4-food',
		title: 'Chương 4: Food Tour',
		dateLabel: 'Gần đây',
		description:
			'Sushi, Gà rán, hay những bữa cơm anh nấu. Tình yêu đi qua dạ dày là tình yêu bền vững nhất!',
		images: [
			'/images/easter-eggs/a-cute-photo-when-you-and-me-go-to-eat-sushi.jpg',
			'/images/easter-eggs/another-cute-photo-when-we-are-eat-sushi.jpg',
			'/images/easter-eggs/you-love-eat-chicken-so-we-are-going-to-eat-fride-chicken.jpg',
			'/images/easter-eggs/first-time-im-cooking-for-you-at-your-home.jpg',
			'/images/easter-eggs/first-time-im-cooking-for-you-at-your-home-2-and-you-are-not-belive-me-can-do-it.jpg',
		],
	},
	{
		id: 'cap-chapter4-intimate',
		title: 'Chương 4: Celebrate Love',
		dateLabel: 'Riêng Tư',
		description:
			'Những khoảnh khắc chỉ có đôi ta ở Homestay. Nấu ăn, chill trên giường... bí mật của hai đứa mình.',
		images: [
			'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpg',
			'/images/easter-eggs/you-are-sexy-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
			'/images/easter-eggs/you-are-so-wet-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
		],
	},
	{
		id: 'cap-chapter4-wedding',
		title: 'Chương 4: Tín Hiệu Vũ Trụ',
		dateLabel: 'Đám cưới bạn Ánh',
		description:
			'Em xinh đẹp làm phù dâu. Bạn Ánh ném hoa, anh bắt được và trao ngay cho em. Vũ trụ đã gửi tín hiệu rồi đó nha! 💍',
		images: [
			'/images/easter-eggs/you-are-bridesmaids-in-my-best-friend-wedding-day.jpg',
			'/images/easter-eggs/im-catched-the-wedding-flowers-then-gave-it-to-you.jpg',
		],
	},
	{
		id: 'cap-chapter4-chill',
		title: 'Chương 4: Chill Time',
		dateLabel: 'Rouge Cafe',
		description:
			'Những buổi hẹn hò cafe nhẹ nhàng, em mặc chiếc váy anh mua, xinh đẹp và dịu dàng.',
		images: [
			'/images/easter-eggs/we-are-going-to-beautyful-cafe-name-rouge-cafe-and-bistro.jpg',
			'/images/easter-eggs/you-are-so-sexy-sweet-in-Rouge-cafe-and-bistro-with-my-dress-im-bouth-to-you.jpg',
		],
	},
];

// --- DAILY QUIZ & VOUCHERS ---
export const quizData: QuizData[] = [
	// --- DAY 1: 15/01/2026 (Travel & Beginnings) ---
	{
		id: 'quiz-day1',
		date: '2026-01-15',
		question: 'Ngày Cá tháng Tư (01/04/2025) có ý nghĩa gì với tụi mình?',
		images: [
			'/images/easter-eggs/first-time-see-you.jpg',
			'/images/easter-eggs/first-time-flirting-you-on-messenger.jpg',
		],
		options: [
			{ id: 'a', label: 'Ngày nói dối', isCorrect: false },
			{
				id: 'b',
				label: 'Ngày đầu tiên gặp nhau',
				isCorrect: true,
				responseMessage: 'Định mệnh đấy!',
			},
			{ id: 'c', label: 'Ngày anh trúng số', isCorrect: false },
		],
		reward: {
			id: 'voucher-hug',
			title: 'Thẻ Ôm Vô Điều Kiện',
			description: 'Voucher ôm: Dùng bất cứ lúc nào để yêu cầu Anh ôm Em ngay lập tức.',
			icon: '🫂',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day1-2',
		date: '2026-01-15',
		question: 'Lần đầu tiên mình đi chơi xa cùng nhau là đi đâu nhỉ?',
		images: [
			'/images/easter-eggs/first-long-trip-with-you-at-Cat-Ba-with-out-company.jpg',
			'/images/easter-eggs/first-time-hangout-with-you.jpg',
		],
		options: [
			{ id: 'a', label: 'Đà Nẵng', isCorrect: false },
			{
				id: 'b',
				label: 'Cát Bà',
				isCorrect: true,
				responseMessage: 'Chuyến đi bão táp nhưng vui ha!',
			},
			{ id: 'c', label: 'Hạ Long', isCorrect: false },
		],
		reward: {
			id: 'voucher-photo',
			title: 'Thợ Chụp Ảnh Riêng',
			description: 'Voucher nhiếp ảnh: Yêu cầu Anh chụp 100 tấm ảnh sống ảo cho đến khi Em ưng ý.',
			icon: '📸',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day1-3',
		date: '2026-01-15',
		question: 'Món đồ đôi đầu tiên mình mua cùng nhau là gì?',
		images: [
			'/images/easter-eggs/we-bouth-a-new-helmet-look-like-twice-cutes-ducks.jpg',
			'/images/easter-eggs/it-me-and-we-are-go-to-buy-a-new-glasses-for-me.jpg',
		],
		options: [
			{ id: 'a', label: 'Áo đôi', isCorrect: false },
			{
				id: 'b',
				label: 'Mũ bảo hiểm vịt',
				isCorrect: true,
				responseMessage: 'Hai con vịt cute lạc lối!',
			},
			{ id: 'c', label: 'Giày đôi', isCorrect: false },
		],
		reward: {
			id: 'voucher-drink',
			title: 'Trà Sữa Full Topping',
			description: 'Mời em một cốc trà sữa full topping bất kỳ.',
			icon: '🧋',
			isRedeemed: false,
			isUsed: false,
		},
	},

	// --- DAY 2: 16/01/2026 (Nature & Adventure) ---
	{
		id: 'quiz-day2',
		date: '2026-01-16',
		question: 'Chú chó Bi Corgi là quà sinh nhật của ai tặng ai?',
		images: [
			'/images/easter-eggs/first-thing-we-bouth-together-is-a-corgi-dog-name-Bi-and-it-is-best-ever-gift-in-my-birthday.jpg',
			'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo.jpg',
		],
		options: [
			{ id: 'a', label: 'Anh tặng em', isCorrect: false },
			{
				id: 'b',
				label: 'Em bé tặng anh',
				isCorrect: true,
				responseMessage: 'Món quà tuyệt vời nhất đời anh!',
			},
			{ id: 'c', label: 'Bi tự đến', isCorrect: false },
		],
		reward: {
			id: 'voucher-massage',
			title: 'Thẻ Massage',
			description: 'Voucher thư giãn: Yêu cầu Anh massage cho Em trong 30 phút (cấm kêu ca).',
			icon: '🦶',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day2-2',
		date: '2026-01-16',
		question: 'Em thích màu tóc nào nhất trong bộ sưu tập của mình?',
		images: [
			'/images/easter-eggs/new-hair-color-is-red-very-beautyful.jpg',
			'/images/easter-eggs/best-beautyful-ever-photo-with-new-red-hair-colored.jpg',
		],
		options: [
			{
				id: 'a',
				label: 'Màu đỏ rực rỡ',
				isCorrect: true,
				responseMessage: 'Màu này tôn da em lắm luôn!',
			},
			{ id: 'b', label: 'Màu vàng nổi loạn', isCorrect: false },
			{ id: 'c', label: 'Màu xanh dương', isCorrect: false },
		],
		reward: {
			id: 'voucher-hair',
			title: 'Gội Đầu Dưỡng Sinh',
			description: 'Anh tài trợ một suất gội đầu dưỡng sinh thư giãn.',
			icon: '💆‍♀️',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day2-3',
		date: '2026-01-16',
		question: 'Khi đi Cafe Rouge, em đã mặc bộ đồ màu gì?',
		images: [
			'/images/easter-eggs/you-are-so-sexy-sweet-in-Rouge-cafe-and-bistro-with-my-dress-im-bouth-to-you.jpg',
			'/images/easter-eggs/we-are-going-to-beautyful-cafe-name-rouge-cafe-and-bistro.jpg',
		],
		options: [
			{ id: 'a', label: 'Váy trắng', isCorrect: false },
			{
				id: 'b',
				label: 'Váy xanh ngọc sexy',
				isCorrect: true,
				responseMessage: 'Xinh xỉu luôn á!',
			},
			{ id: 'c', label: 'Quần Jeans', isCorrect: false },
		],
		reward: {
			id: 'voucher-coffee',
			title: 'Cafe Sáng',
			description: 'Anh sẽ dậy sớm pha cafe hoặc mua cafe cho em.',
			icon: '☕',
			isRedeemed: false,
			isUsed: false,
		},
	},

	// --- DAY 3: 17/01/2026 (Romance & Memories) ---
	{
		id: 'quiz-day3',
		date: '2026-01-17',
		question: 'Lần đầu mình hun nhau là ở đâu?',
		images: [
			'/images/easter-eggs/first-time-at-West-Lake-Flower-Valley.jpg',
			'/images/easter-eggs/we-sleep-all-night-at-West-Lake-Flower-Valley-with-your-first-flowers-i-bouth.jpg',
		],
		options: [
			{
				id: 'a',
				label: 'Art District (Pub)',
				isCorrect: false,
				responseMessage: 'Đó là lần hun kiểu Pub thôi!',
			},
			{ id: 'b', label: 'PUKU Cafe', isCorrect: false },
			{
				id: 'c',
				label: 'Thung lũng hoa Hồ Tây',
				isCorrect: true,
				responseMessage: 'Em còn không thè lưỡi ra cơ mà (lêu lêu)!',
			},
		],
		reward: {
			id: 'voucher-king',
			title: 'Hoàng Hậu Lệnh',
			description: 'Voucher quyền lực: Trong 1 tiếng tới, Anh phải nghe theo mọi lời Em nói.',
			icon: '👑',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day3-2',
		date: '2026-01-17',
		question: 'Quán Pub ruột mà mình hay ngồi thâu đêm suốt sáng tên là gì?',
		images: [
			'/images/easter-eggs/fourth-time-go-to-PUKU-cafe-and-eat-pizza-and-im-working-on-my-macbook.jpg',
			'/images/easter-eggs/third-times-go-to-PUKU-cafe.jpg',
		],
		options: [
			{ id: 'a', label: 'Xofa Cafe', isCorrect: false },
			{
				id: 'b',
				label: 'PUKU Cafe',
				isCorrect: true,
				responseMessage: 'Nơi chứa đầy deep talk của tụi mình.',
			},
			{ id: 'c', label: 'Aries Rooftop', isCorrect: false },
		],
		reward: {
			id: 'voucher-snack',
			title: 'Ăn Đêm',
			description: 'Bất cứ lúc nào đói bụng, anh sẽ đi mua đồ ăn đêm cho.',
			icon: '🍕',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day3-3',
		date: '2026-01-17',
		question: 'Ai là người bắt được hoa cưới của bạn Ánh?',
		images: [
			'/images/easter-eggs/im-catched-the-wedding-flowers-then-gave-it-to-you.jpg',
			'/images/easter-eggs/you-are-bridesmaids-in-my-best-friend-wedding-day.jpg',
		],
		options: [
			{ id: 'a', label: 'Em bắt được', isCorrect: false },
			{
				id: 'b',
				label: 'Anh bắt được',
				isCorrect: true,
				responseMessage: 'Và anh đã trao lại ngay cho em đó!',
			},
			{ id: 'c', label: 'Không ai bắt được', isCorrect: false },
		],
		reward: {
			id: 'voucher-kiss',
			title: '100 Cái Hôn',
			description: 'Voucher nụ hôn: Nhận ngay 100 cái hôn vào bất cứ chỗ nào Em chỉ định.',
			icon: '💋',
			isRedeemed: false,
			isUsed: false,
		},
	},

	// --- DAY 4: 18/01/2026 (Future & Love) ---
	{
		id: 'quiz-day4',
		date: '2026-01-18',
		question: 'Món ăn nào anh nấu mà em khen ngon nhất?',
		images: [
			'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpg',
			'/images/easter-eggs/first-time-im-cooking-for-you-at-your-home-2-and-you-are-not-belive-me-can-do-it.jpg',
		],
		options: [
			{ id: 'a', label: 'Trứng ốp', isCorrect: false },
			{
				id: 'b',
				label: 'Beef Steak',
				isCorrect: true,
				responseMessage: 'Chuẩn cơm anh nấu rồi!',
			},
			{ id: 'c', label: 'Mì tôm', isCorrect: false },
		],
		reward: {
			id: 'voucher-cook',
			title: 'Voucher Đầu Bếp',
			description: 'Voucher đầu bếp: Yêu cầu Anh nấu bất cứ món gì Em muốn (trong khả năng).',
			icon: '👨‍🍳',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day4-2',
		date: '2026-01-18',
		question: 'Tật xấu nào của em mà anh thấy đáng yêu nhất?',
		images: [
			'/images/easter-eggs/embarrassing-photo-wakeup.jpg',
			'/images/easter-eggs/embarrassing-photo-bad-face.jpg',
		],
		options: [
			{
				id: 'a',
				label: 'Ngủ nướng',
				isCorrect: true,
				responseMessage: 'Nhìn lúc ngủ như thiên thần í!',
			},
			{ id: 'b', label: 'Hay dỗi', isCorrect: false },
			{ id: 'c', label: 'Ăn chậm', isCorrect: false },
		],
		reward: {
			id: 'voucher-sleep',
			title: 'Voucher Ngủ Nướng',
			description: 'Voucher ngủ nướng: Em được quyền ngủ nướng thêm 30p vào buổi sáng bất kỳ.',
			icon: '💤',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day4-3',
		date: '2026-01-18',
		question: 'Sau chuyến đi Sapa này, mình sẽ đi đâu tiếp nhỉ?',
		images: [
			'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-5.jpg',
			'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-4.jpg',
		],
		options: [
			{ id: 'a', label: 'Đà Lạt', isCorrect: false },
			{ id: 'b', label: 'Thái Lan', isCorrect: false },
			{
				id: 'c',
				label: 'Bất cứ đâu có anh',
				isCorrect: true,
				responseMessage: 'Chỉ cần có nhau, đâu cũng là nhà ❤️',
			},
		],
		reward: {
			id: 'voucher-trip',
			title: 'Voucher Du Lịch',
			description: 'Voucher vi vu: Lời hứa danh dự từ Anh sẽ đưa Em đi du lịch ít nhất 1 lần/năm.',
			icon: '✈️',
			isRedeemed: false,
			isUsed: false,
		},
	},
];

// --- MOOD CHECK-IN ---
export const moodData: MoodCheckinData[] = [
	{
		id: 'mood-general',
		title: 'Bé đang thấy thế nào?',
		options: [
			{
				id: 'cold',
				icon: '🥶',
				label: 'Lạnh quá à',
				response: {
					images: [
						'/images/easter-eggs/we-sleep-all-night-at-West-Lake-Flower-Valley-with-your-first-flowers-i-bouth.jpg',
						'/images/easter-eggs/you-are-sexy-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
						'/images/easter-eggs/you-are-so-wet-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
					],
					message:
						'Lạnh thì lại đây anh ôm! Như mọi hôm mình ôm nhau ngủ đó ❤️',
				},
			},
			{
				id: 'hungry',
				icon: '🤤',
				label: 'Đói bụng rồi',
				response: {
					images: [
						'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpg',
						'/images/easter-eggs/you-love-eat-chicken-so-we-are-going-to-eat-fride-chicken.jpg',
						'/images/easter-eggs/another-cute-photo-when-we-are-eat-sushi.jpg',
					],
					message: 'Đi ăn thôi! Anh sẽ vỗ gầy em như những ngày qua hehe.',
				},
			},
			{
				id: 'waiting',
				icon: '⏳',
				label: 'Đang chờ',
				response: {
					images: [
						'/images/easter-eggs/im-taking-a-photo-of-you-cute-when-you-waiting-your-order-water.jpg',
					],
					message: 'Chờ nước thôi mà cũng xinh thế này, bảo sao anh mê!',
				},
			},
			{
				id: 'happy',
				icon: '🥰',
				label: 'Hạnh phúc',
				response: {
					images: [
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-1.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-2.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-3.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-4.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-5.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-6.jpg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-7.jpg',
						'/images/easter-eggs/you-are-sexy-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
					],
					message: 'Em cười xinh như những bức ảnh này vậy. Yêu em!',
				},
			},
			{
				id: 'missing',
				icon: '🥺',
				label: 'Nhớ anh',
				response: {
					images: [
						'/images/easter-eggs/i-dont-like-take-my-photo-but-this-time-im-takeing-a-photo-with-action-kiss-you.jpg',
						'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo.jpg',
						'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo-2.jpg',
					],
					message: 'Anh ở ngay đây mà. Kiếm anh đi, anh cho hun cái nè!',
				},
			},
			{
				id: 'grumpy',
				icon: '😤',
				label: 'Đang dỗi',
				response: {
					images: [
						'/images/easter-eggs/embarrassing-photo-bad-face.jpg',
						'/images/easter-eggs/embarrassing-photo-toothache.jpg',
						'/images/easter-eggs/take-a-photo-you-have-bad-face-at-our-company.jpg',
					],
					message: 'Thôi đừng dỗi nữa, dỗi là xấu như vầy nè :v Cười lên đi!',
				},
			},
			{
				id: 'chill',
				icon: '☕',
				label: 'Chill',
				response: {
					images: [
						'/images/easter-eggs/we-are-going-to-beautyful-cafe-name-rouge-cafe-and-bistro.jpg',
						'/images/easter-eggs/you-are-so-sexy-sweet-in-Rouge-cafe-and-bistro-with-my-dress-im-bouth-to-you.jpg',
						'/images/easter-eggs/you-are-sexy-in-homestay-bed-when-we-have-a-celebrate-love.jpg',
					],
					message: 'Tận hưởng khoảnh khắc bình yên này nhé công chúa.',
				},
			},
		],
	},
];

// --- FUNNY MOMENTS (Embarrassing Collection) ---
export const funnyMoments: FunnyMomentData[] = [
	{
		id: 'funny-wakeup',
		image: '/images/easter-eggs/embarrassing-photo-wakeup.jpg',
		comment: 'Chào buổi sáng! Đầu tóc bù xù thấy ghét chưa ^^',
	},
	{
		id: 'funny-wakeup-2',
		image: '/images/easter-eggs/embarrassing-photo-wakeup-2.jpg',
		comment: 'Lại là em lúc mới ngủ dậy đây haha.',
	},
	{
		id: 'funny-drunk',
		image:
			'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo-when-you-are-drunk.jpg',
		comment: 'Ai đây ta? Xỉn mà vẫn cute phết.',
	},
	{
		id: 'funny-badface',
		image: '/images/easter-eggs/embarrassing-photo-bad-face.jpg',
		comment: 'Mặt xấu chưa kìa :v',
	},
	{
		id: 'funny-hair-fail',
		image:
			'/images/easter-eggs/embarrassing-photo-first-time-you-are-hair-colored.jpg',
		comment: 'Kỷ niệm lần đầu nhuộm tóc... hơi fail nhưng vẫn yêu!',
	},
	{
		id: 'funny-company',
		image:
			'/images/easter-eggs/embarrassing-photo-cute-face-at-our-company.jpg',
		comment: 'Làm việc hay làm trò đấy cô nương?',
	},
	{
		id: 'funny-young',
		image: '/images/easter-eggs/embarrassing-photo-your-old-young-photo.jpg',
		comment: 'Hồi xửa hồi xưa...',
	},
	{
		id: 'funny-young-2',
		image: '/images/easter-eggs/embarrassing-photo-your-old-young-photo-2.jpg',
		comment: 'Ngố tàu chưa kìa!',
	},
];

// ==================== HELPER FUNCTIONS ====================

export function getQuizForDate(date: string): QuizData | undefined {
	return quizData.find((quiz) => quiz.date === date);
}

export function getRandomMoodCheckin(): MoodCheckinData {
	return moodData[Math.floor(Math.random() * moodData.length)];
}

export function getRandomFunnyMoment(): FunnyMomentData {
	return funnyMoments[Math.floor(Math.random() * funnyMoments.length)];
}

export function getRandomMemoryCapsule(): MemoryCapsuleData {
	// Ưu tiên random, có thể mở rộng logic unlock theo ngày sau này
	return memoryCapsules[Math.floor(Math.random() * memoryCapsules.length)];
}

export function getAllCapsules(): MemoryCapsuleData[] {
	return memoryCapsules;
}
