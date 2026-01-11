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
	image?: string;
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
			'Từ tin nhắn đầu tiên ngày Cá tháng Tư, đến lần gặp gỡ đầu tiên. Ai ngờ đâu mình "dính" nhau đến tận bây giờ nhỉ?',
		images: [
			'/images/easter-eggs/first-time-flirting-you-on-messenger.jpeg',
			'/images/easter-eggs/first-time-see-you.JPG',
			'/images/easter-eggs/first-time-hangout-with-you.JPG',
		],
	},
	{
		id: 'cap-chapter1-company',
		title: 'Chương 1: Tình Yêu Công Sở',
		dateLabel: 'Tháng 4/2025',
		description:
			'Những buổi trưa đi ăn, những cái chạm chân lén lút (foot skinship), và cả những tấm ảnh chụp trộm em ở công ty!',
		images: [
			'/images/easter-eggs/go-lunch-with-you-at-company.JPG',
			'/images/easter-eggs/we-are-foot-skinship-at-our-company.JPG',
			'/images/easter-eggs/we-are-foot-skinship-at-our-compay-again.JPG',
			'/images/easter-eggs/take-a-photo-you-use-my-cloth-and-my-short-at-our-company.jpeg',
			'/images/easter-eggs/secretly-taking photos-our-company..jpeg',
		],
	},
	{
		id: 'cap-chapter1-places',
		title: 'Chương 1: Quán Quen Xuyên Đêm',
		dateLabel: 'PUKU & Art District',
		description:
			'PUKU Cafe những đêm deep talk không nhạc, và Art District với những cái ôm nồng nàn đầu tiên. Những nơi nuôi dưỡng tình yêu của mình.',
		images: [
			'/images/easter-eggs/first-time-go-pub-at-ART-DISTRICT.JPG', // Pub có nhạc
			'/images/easter-eggs/seccond-time-go-to-pub-ART-DISTRICT-again-and-we-take-a-long-kiss.jpg',
			'/images/easter-eggs/third-times-go-to-PUKU-cafe.JPG', // Pub deep talk
			'/images/easter-eggs/fourth-time-go-to-PUKU-cafe-and-eat-pizza-and-im-working-on-my-macbook.JPG',
			'/images/easter-eggs/your-old-poor-iphone-and first-time-hangout-with-you-late-night-at-PUKU-cafe.JPG',
			'/images/easter-eggs/the-secconds-time-go-to-puku-cafe-again.jpg',
			'/images/easter-eggs/we-are-pretend-to-be-best-friends at-the-pub.jpeg', // Diễn sâu
		],
	},
	{
		id: 'cap-chapter2-flower',
		title: 'Chương 2: Đêm Định Mệnh',
		dateLabel: 'Thung Lũng Hoa Hồ Tây',
		description:
			'Lần đầu tặng hoa, lần đầu hun nhau thật sự, và lần đầu... ngủ ôm nhau đến sáng. Một mốc son không thể quên.',
		images: [
			'/images/easter-eggs/first-time-at-West-Lake-Flower-Valley.JPG',
			'/images/easter-eggs/first-flowers-i-bouth-to-you-and-you-are-very-love-it-and-we-go-to-West-Lake-Flower-Valley-again.JPG',
			'/images/easter-eggs/we-sleep-all-night-at-West-Lake-Flower-Valley-with-your-first-flowers-i-bouth.JPG',
		],
	},
	{
		id: 'cap-chapter2-confess',
		title: 'Chương 2: Lời Tỏ Tình',
		dateLabel: '01/06/2025',
		description:
			'Nhân dịp tết thiếu nhi, anh tặng em dây chuyền, vòng tay và chính thức nói lời yêu. Em nhớ khoảnh khắc đó chứ?',
		images: [
			'/images/easter-eggs/at-day-1-month-6-i-bouth-a-secret-gift-is-necklaces-and-bracelets-and-confess-my-love-to-you.JPG',
		],
	},
	{
		id: 'cap-chapter3-catba',
		title: 'Chương 3: Cát Bà Ký Sự',
		dateLabel: 'Tháng 7/2025',
		description:
			'Chuyến đi xa đầu tiên cùng công ty. Dù đi đông người nhưng trong mắt anh chỉ có em.',
		images: [
			'/images/easter-eggs/first-long-trip-with-you-at-Cat-Ba-with-out-company.jpeg',
			'/images/easter-eggs/it-me-and-we-are-go-to-buy-a-new-glasses-for-me.JPG', // Ké ảnh đi mua kính dịp này
		],
	},
	{
		id: 'cap-chapter3-hair',
		title: 'Chương 3: Bộ Sưu Tập Tóc',
		dateLabel: '2025',
		description:
			'Từ tóc vàng tẩy 3 lần, đến tóc đỏ rực rỡ, và bi giờ là xanh. Màu nào em cũng xinh ngất ngây con gà tây!',
		images: [
			'/images/easter-eggs/a-cute-photo-when-first-time-i-gave-you-money-to-hair-colored.JPG', // Vàng
			'/images/easter-eggs/new-hair-color-is-red-very-beautyful.jpeg', // Đỏ
			'/images/easter-eggs/best-beautyful-ever-photo-with-new-red-hair-colored.jpeg', // Đỏ đẹp nhất
		],
	},
	{
		id: 'cap-chapter3-bi',
		title: 'Chương 3: Bé Bi Corgi',
		dateLabel: '10/11/2025',
		description:
			'Món quà sinh nhật sớm em tặng anh. Đứa con tinh thần của hai đứa mình.',
		images: [
			'/images/easter-eggs/first-thing-we-bouth-together-is-a-corgi-dog-name-Bi-and-it-is-best-ever-gift-in-my-birthday.JPG',
		],
	},
	{
		id: 'cap-chapter4-food',
		title: 'Chương 4: Food Tour Tình Yêu',
		dateLabel: 'Gần đây',
		description:
			'Sushi, Gà rán, hay những bữa cơm anh nấu... Con đường ngắn nhất đến trái tim là đi qua dạ dày mà!',
		images: [
			'/images/easter-eggs/a-cute-photo-when-you-and-me-go-to-eat-sushi.jpeg',
			'/images/easter-eggs/another-cute-photo-when-we-are-eat-sushi.jpeg',
			'/images/easter-eggs/you-love-eat-chicken-so-we-are-going-to-eat-fride-chicken.JPG',
			'/images/easter-eggs/first-time-im-cooking-for-you-at-your-home.jpeg',
			'/images/easter-eggs/first-time-im-cooking-for-you-at-your-home-2-and-you-are-not-belive-me-can-do-it.jpeg',
		],
	},
	{
		id: 'cap-chapter4-intimate',
		title: 'Chương 4: Celebrate Love',
		dateLabel: 'Riêng Tư',
		description:
			'Những khoảnh khắc chỉ có đôi ta ở Homestay. Nấu ăn, chill trên giường... (Suỵt, bí mật nhé!)',
		images: [
			'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpeg',
			'/images/easter-eggs/you-are-sexy-in-homestay-bed-when-we-have-a-celebrate-love.jpeg',
			'/images/easter-eggs/you-are-so-wet-in-homestay-bed-when-we-have-a-celebrate-love.jpeg',
		],
	},
	{
		id: 'cap-chapter4-future',
		title: 'Chương 4: Tín Hiệu Vũ Trụ',
		dateLabel: 'Đám cưới bạn Ánh',
		description:
			'Em làm phù dâu xinh đẹp, anh bắt được hoa cưới và trao ngay cho em. Vũ trụ đã gửi tín hiệu rồi, phại tính sao đây? 💍',
		images: [
			'/images/easter-eggs/you-are-bridesmaids-in-my-best-friend-wedding-day.jpeg',
			'/images/easter-eggs/im-catched-the-wedding-flowers-then-gave-it-to-you.jpeg',
		],
	},
];

// --- DAILY QUIZ & VOUCHERS ---
export const quizData: QuizData[] = [
	{
		id: 'quiz-day1',
		date: '2026-01-15',
		question: 'Ngày Cá tháng Tư (01/04/2025) có ý nghĩa gì với tụi mình?',
		image: '/images/easter-eggs/first-time-see-you.JPG',
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
			description: 'Bất cứ lúc nào em cần, anh sẽ có mặt để ôm em.',
			icon: '🫂',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day2',
		date: '2026-01-16',
		question: 'Chú chó Bi Corgi là quà sinh nhật của ai tặng ai?',
		image:
			'/images/easter-eggs/first-thing-we-bouth-together-is-a-corgi-dog-name-Bi-and-it-is-best-ever-gift-in-my-birthday.JPG',
		options: [
			{ id: 'a', label: 'Anh tặng em', isCorrect: false },
			{
				id: 'b',
				label: 'Em bé tặng anh',
				isCorrect: true,
				responseMessage: 'Món quà tuyệt vời nhất!',
			},
			{ id: 'c', label: 'Bi tự đến', isCorrect: false },
		],
		reward: {
			id: 'voucher-massage',
			title: 'Thẻ Massage',
			description: 'Anh sẽ massage cho em 30 phút. Không được kêu ca!',
			icon: '🦶',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-day3',
		date: '2026-01-17',
		question: 'Lần đầu mình hun nhau là ở đâu?',
		image: '/images/easter-eggs/first-time-at-West-Lake-Flower-Valley.JPG',
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
				responseMessage: 'Em còn không thè lưỡi ra cơ mà!',
			},
		],
		reward: {
			id: 'voucher-king',
			title: 'Hoàng Hậu Lệnh',
			description: 'Em nói gì anh cũng phải nghe theo trong vòng 1 tiếng.',
			icon: '👑',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-generic-1',
		question: 'Món ăn nào anh nấu mà em khen ngon nhất?',
		image:
			'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpeg',
		options: [
			{ id: 'a', label: 'Trứng ốp', isCorrect: false },
			{
				id: 'b',
				label: 'Beef Steak',
				isCorrect: true,
				responseMessage: 'Chuẩn cơm mẹ nấu!',
			},
			{ id: 'c', label: 'Mì tôm', isCorrect: false },
		],
		reward: {
			id: 'voucher-cook',
			title: 'Voucher Đầu Bếp',
			description: 'Anh sẽ nấu bất cứ món gì em yêu cầu (trong khả năng).',
			icon: '👨‍🍳',
			isRedeemed: false,
			isUsed: false,
		},
	},
	{
		id: 'quiz-generic-2',
		question: 'Tật xấu nào của em mà anh thấy đáng yêu nhất?',
		image: '/images/easter-eggs/embarrassing-photo-wakeup.jpeg',
		options: [
			{
				id: 'a',
				label: 'Ngủ nướng',
				isCorrect: true,
				responseMessage: 'Nhìn lúc ngủ like an angel!',
			},
			{ id: 'b', label: 'Hay dỗi', isCorrect: false },
			{ id: 'c', label: 'Ăn chậm', isCorrect: false },
		],
		reward: {
			id: 'voucher-sleep',
			title: 'Voucher Ngủ Nướng',
			description: 'Được phép ngủ nướng thêm 30p vào buổi sáng.',
			icon: '💤',
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
						'/images/easter-eggs/we-sleep-all-night-at-West-Lake-Flower-Valley-with-your-first-flowers-i-bouth.JPG',
						'/images/easter-eggs/you-are-so-wet-in-homestay-bed-when-we-have-a-celebrate-love.jpeg',
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
						'/images/easter-eggs/im-cook-beef-steak-when-we-have-a-celebrate-love.jpeg',
						'/images/easter-eggs/you-love-eat-chicken-so-we-are-going-to-eat-fride-chicken.JPG',
						'/images/easter-eggs/another-cute-photo-when-we-are-eat-sushi.jpeg',
					],
					message: 'Đi ăn thôi! Anh sẽ vỗ gầy em như những ngày qua hehe.',
				},
			},
			{
				id: 'happy',
				icon: '🥰',
				label: 'Hạnh phúc',
				response: {
					images: [
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-1.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-2.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-3.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-4.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-5.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-6.jpeg',
						'/images/easter-eggs/you-are-showing-to-me-your-beautyful-image-7.jpeg',
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
						'/images/easter-eggs/i-dont-like-take-my-photo-but-this-time-im-takeing-a-photo-with-action-kiss-you.jpeg',
						'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo.jpeg',
						'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo-2.jpeg',
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
						'/images/easter-eggs/embarrassing-photo-bad-face.jpeg',
						'/images/easter-eggs/embarrassing-photo-toothache.jpeg',
						'/images/easter-eggs/take-a-photo-you-have-bad-face-at-our-company.jpeg',
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
						'/images/easter-eggs/we-are-going-to-beautyful-cafe-name-rouge-cafe-and-bistro.JPG',
						'/images/easter-eggs/you-are-so-sexy-sweet-in-Rouge-cafe-and-bistro-with-my-dress-im-bouth-to-you.jpeg',
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
		image: '/images/easter-eggs/embarrassing-photo-wakeup.jpeg',
		comment: 'Chào buổi sáng! Đầu tóc bù xù thấy ghét chưa ^^',
	},
	{
		id: 'funny-wakeup-2',
		image: '/images/easter-eggs/embarrassing-photo-wakeup-2.jpeg',
		comment: 'Lại là em lúc mới ngủ dậy đây haha.',
	},
	{
		id: 'funny-drunk',
		image:
			'/images/easter-eggs/you-are-take-your-photo-and-sent-to-me-your-cute-photo-when-you-are-drunk.jpeg',
		comment: 'Ai đây ta? Xỉn mà vẫn cute phết.',
	},
	{
		id: 'funny-badface',
		image: '/images/easter-eggs/embarrassing-photo-bad-face.jpeg',
		comment: 'Mặt xấu chưa kìa :v',
	},
	{
		id: 'funny-hair-fail',
		image:
			'/images/easter-eggs/embarrassing-photo-first-time-you-are-hair-colored.jpeg',
		comment: 'Kỷ niệm lần đầu nhuộm tóc... hơi fail nhưng vẫn yêu!',
	},
	{
		id: 'funny-company',
		image:
			'/images/easter-eggs/embarrassing-photo-cute-face-at-our-company.jpeg',
		comment: 'Làm việc hay làm trò đấy cô nương?',
	},
	{
		id: 'funny-young',
		image: '/images/easter-eggs/embarrassing-photo-your-old-young-photo.jpeg',
		comment: 'Hồi xửa hồi xưa...',
	},
	{
		id: 'funny-young-2',
		image: '/images/easter-eggs/embarrassing-photo-your-old-young-photo-2.jpeg',
		comment: 'Ngố tàu chưa kìa!',
	},
	{
		id: 'funny-dimhang',
		image: '/images/easter-eggs/dim-hang.jpg',
		comment: 'Dìm hàng time!',
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
