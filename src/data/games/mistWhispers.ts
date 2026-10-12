export interface WhisperCard {
	id: number;
	type: 'world' | 'couple';
	question: string;
}

// World observation questions - for bar/cafe settings
const worldCards: WhisperCard[] = [
	{
		id: 1,
		type: 'world',
		question:
			'Tìm một người đang dùng điện thoại. Bịa ra tin nhắn họ đang gửi.',
	},
	{
		id: 2,
		type: 'world',
		question:
			'Chọn một cặp đôi khác trong quán. Đoán xem họ đã quen nhau bao lâu?',
	},
	{
		id: 3,
		type: 'world',
		question:
			'Tìm vật trang trí xấu nhất trong quán này. Chỉ cho đối phương xem.',
	},
	{
		id: 4,
		type: 'world',
		question: 'Đoán xem bàn bên cạnh đã gọi món gì trước khi phục vụ mang ra.',
	},
	{
		id: 5,
		type: 'world',
		question: 'Tìm một người trông giống người nổi tiếng nào đó.',
	},
	{
		id: 6,
		type: 'world',
		question:
			'Nếu quán này bất ngờ biến thành phim hành động, ai ở đây sẽ là nhân vật phản diện?',
	},
	{
		id: 7,
		type: 'world',
		question: 'Đếm xem có bao nhiêu người đang mặc đồ màu đen trong tầm mắt.',
	},
	{
		id: 8,
		type: 'world',
		question: 'Tìm một người có dáng ngồi kỳ quặc nhất.',
	},
	{
		id: 9,
		type: 'world',
		question: 'Đoán nghề nghiệp của người pha chế/nhân viên phục vụ.',
	},
	{
		id: 10,
		type: 'world',
		question: 'Tìm một món đồ trong quán mà bạn muốn "chôm" về nhà nhất.',
	},
	{
		id: 11,
		type: 'world',
		question: 'Nhìn người ở hướng 3 giờ. Đặt cho họ một biệt danh ngớ ngẩn.',
	},
	{
		id: 12,
		type: 'world',
		question: 'Tìm một cặp đôi đang trong buổi hẹn hò đầu tiên (First date).',
	},
	{
		id: 13,
		type: 'world',
		question: 'Nếu phải trốn trong quán này, chỗ nào là nơi trốn tốt nhất?',
	},
	{
		id: 14,
		type: 'world',
		question: 'Đoán xem ai trong quán này là người giàu nhất?',
	},
	{
		id: 15,
		type: 'world',
		question: 'Tìm một người trông có vẻ đang chán đời.',
	},
	{
		id: 16,
		type: 'world',
		question: 'Nhìn vào menu đồ uống. Chọn món có tên sến súa nhất.',
	},
	{
		id: 17,
		type: 'world',
		question:
			'Nếu Zombie tấn công ngay lúc này, chúng ta sẽ dùng vật gì trên bàn làm vũ khí?',
	},
	{ id: 18, type: 'world', question: 'Tìm một du khách trông lạc lõng nhất.' },
	{
		id: 19,
		type: 'world',
		question:
			'Đoán xem cặp đôi ở góc kia đang nói về chủ đề gì (Công việc/Tình yêu/Chia tay)?',
	},
	{
		id: 20,
		type: 'world',
		question: 'Tìm một người có kiểu tóc ấn tượng nhất.',
	},
	{
		id: 21,
		type: 'world',
		question: 'Ai trong quán này có khả năng là điệp viên ngầm?',
	},
	{
		id: 22,
		type: 'world',
		question: 'Tìm người uống say nhất trong quán hiện tại.',
	},
	{
		id: 23,
		type: 'world',
		question: 'Đánh giá gu âm nhạc của quán thang điểm 1-10.',
	},
	{ id: 24, type: 'world', question: 'Tìm một món đồ màu đỏ nổi bật nhất.' },
	{
		id: 25,
		type: 'world',
		question: 'Đoán giá tiền bộ đồ của người vừa bước vào cửa.',
	},
	{
		id: 26,
		type: 'world',
		question:
			'Nếu chúng ta bỏ phố lên Sapa mở một homestay xinh xắn làm quản gia trọn đời, ai sẽ là người nấu ăn, ai là người dọn phòng?',
	},
	{
		id: 27,
		type: 'world',
		question:
			'Thử thách: Hỏi nhân viên về lịch sử loại rượu đang uống. Nếu ngại không dám hỏi, uống cạn ly.',
	},
	{
		id: 28,
		type: 'world',
		question:
			'Dự đoán thời tiết sáng mai tại Fansipan. Người thua sẽ phải mua cà phê sáng.',
	},
	{
		id: 29,
		type: 'world',
		question:
			'Nếu chúng ta bị lạc trong thung lũng Mường Hoa đêm nay, ai là người sẽ hoảng sợ trước?',
	},
	{
		id: 30,
		type: 'world',
		question:
			"Nếu phải mặc trang phục H'Mông suốt chuyến đi, ai sẽ mặc đẹp hơn?",
	},
	{
		id: 31,
		type: 'world',
		question: 'Tìm một người đang cười một mình. Đoán xem họ đang nghĩ gì?',
	},
	{
		id: 32,
		type: 'world',
		question: 'Chọn bàn nào trong quán là "bàn VIP" trong mắt bạn?',
	},
	{ id: 33, type: 'world', question: 'Nếu quán này có ma, ma sẽ ở góc nào?' },
	{
		id: 34,
		type: 'world',
		question: 'Ai trong quán này trông như đang chờ người yêu?',
	},
	{
		id: 35,
		type: 'world',
		question: 'Tìm vật trang trí liên quan đến Sapa trong quán.',
	},
	{
		id: 36,
		type: 'world',
		question: 'Đoán xem ai là người uống nhiều nhất đêm nay?',
	},
	{
		id: 37,
		type: 'world',
		question: 'Tìm một người có đôi giày đẹp nhất quán.',
	},
	{
		id: 38,
		type: 'world',
		question: 'Nếu bạn là chủ quán, bạn sẽ thay đổi điều gì đầu tiên?',
	},
	{
		id: 39,
		type: 'world',
		question: 'Ai trong quán này sẽ là bạn tốt nếu làm quen?',
	},
	{ id: 40, type: 'world', question: 'Tìm cặp đôi hạnh phúc nhất trong quán.' },
	{
		id: 41,
		type: 'world',
		question: 'Đoán xem nhân viên phục vụ đã làm ở đây bao lâu?',
	},
	{
		id: 42,
		type: 'world',
		question: 'Nếu đây là phim, thể loại phim gì phù hợp nhất?',
	},
	{
		id: 43,
		type: 'world',
		question: 'Tìm người đang đọc sách hoặc làm việc một mình.',
	},
	{
		id: 44,
		type: 'world',
		question: 'Chọn bản nhạc tiếp theo phù hợp với không khí quán.',
	},
	{
		id: 45,
		type: 'world',
		question: 'Ai trong quán này có câu chuyện thú vị nhất?',
	},
	{
		id: 46,
		type: 'world',
		question: 'Tìm chi tiết thiết kế đẹp nhất của quán.',
	},
	{
		id: 47,
		type: 'world',
		question: 'Đoán quốc tịch của một du khách nước ngoài trong quán.',
	},
	{
		id: 48,
		type: 'world',
		question: 'Nếu sương mù dày đặc bất ngờ, ai ở đây sẽ lạc đầu tiên?',
	},
	{
		id: 49,
		type: 'world',
		question: 'Tìm một vật màu vàng trong phạm vi nhìn thấy.',
	},
	{ id: 50, type: 'world', question: 'Ai trong quán này có thể là nghệ sĩ?' },
];

// Couple deep-talk questions - for intimacy
const coupleCards: WhisperCard[] = [
	{
		id: 51,
		type: 'couple',
		question: 'Ấn tượng đầu tiên của anh/em về đối phương trong 3 từ?',
	},
	{
		id: 52,
		type: 'couple',
		question:
			'Kể tên 3 địa điểm chúng ta nhất định phải đi cùng nhau trước khi chết.',
	},
	{
		id: 53,
		type: 'couple',
		question: 'Thói quen xấu nào của anh/em mà em/anh thấy đáng yêu?',
	},
	{
		id: 54,
		type: 'couple',
		question: 'Lần gần nhất chúng ta cười đến đau bụng là khi nào?',
	},
	{
		id: 55,
		type: 'couple',
		question:
			'Nếu trúng số độc đắc ngày mai, việc đầu tiên chúng ta làm cùng nhau là gì?',
	},
	{
		id: 56,
		type: 'couple',
		question: 'Một bí mật nhỏ thời thơ ấu chưa từng kể?',
	},
	{
		id: 57,
		type: 'couple',
		question: 'Bài hát nào mô tả đúng nhất mối quan hệ của chúng ta?',
	},
	{
		id: 58,
		type: 'couple',
		question:
			'Khoảnh khắc nào trong chuyến đi này khiến bạn hạnh phúc nhất đến giờ?',
	},
	{
		id: 59,
		type: 'couple',
		question:
			'Điều điên rồ nhất chúng ta từng làm trên giường (hoặc muốn làm)?',
	},
	{
		id: 60,
		type: 'couple',
		question:
			'Nếu có thể thay đổi một điều ở đối phương, đó là gì? (Cẩn thận!)',
	},
	{
		id: 61,
		type: 'couple',
		question: 'Em/Anh thích được hôn ở đâu nhất (trừ môi)?',
	},
	{ id: 62, type: 'couple', question: 'Mô tả mùi hương của đối phương.' },
	{
		id: 63,
		type: 'couple',
		question: 'Ai là người bừa bộn hơn trong mối quan hệ này?',
	},
	{
		id: 64,
		type: 'couple',
		question: 'Kỷ niệm đáng xấu hổ nhất của bạn mà đối phương chưa biết?',
	},
	{
		id: 65,
		type: 'couple',
		question: 'Nếu chúng ta là nhân vật trong phim, chúng ta là ai?',
	},
	{
		id: 66,
		type: 'couple',
		question: 'Bạn thích phần cơ thể nào của mình nhất?',
	},
	{
		id: 67,
		type: 'couple',
		question: 'Bạn thích phần cơ thể nào của đối phương nhất?',
	},
	{
		id: 68,
		type: 'couple',
		question: 'Điều gì làm bạn sợ hãi nhất trong tình yêu?',
	},
	{
		id: 69,
		type: 'couple',
		question: 'Nhìn vào mắt nhau 30 giây không được cười. Ai cười trước uống.',
	},
	{ id: 70, type: 'couple', question: 'Hôn lên má đối phương ngay bây giờ.' },
	{
		id: 71,
		type: 'couple',
		question: 'Một điều bạn muốn đối phương làm cho mình nhiều hơn?',
	},
	{ id: 72, type: 'couple', question: 'Tật xấu khi ngủ của đối phương là gì?' },
	{
		id: 73,
		type: 'couple',
		question: 'Món quà tệ nhất bạn từng nhận được là gì?',
	},
	{
		id: 74,
		type: 'couple',
		question: 'Nếu có con, bạn muốn con giống ai điểm nào?',
	},
	{ id: 75, type: 'couple', question: 'Ai là người nấu ăn ngon hơn?' },
	{
		id: 76,
		type: 'couple',
		question:
			'Hai thật một giả: Kể về 3 tai nạn du lịch trong quá khứ của bạn.',
	},
	{
		id: 77,
		type: 'couple',
		question: 'Never Have I Ever: Đã từng "say nắng" hướng dẫn viên du lịch.',
	},
	{
		id: 78,
		type: 'couple',
		question:
			'Thói quen du lịch nào của anh/em khiến đối phương khó chịu nhất? (Rủi ro cao!)',
	},
	{
		id: 79,
		type: 'couple',
		question:
			'Hãy cho xem bức ảnh đẹp nhất bạn chụp đối phương trong chuyến đi này.',
	},
	{
		id: 80,
		type: 'couple',
		question:
			'Kể lại buổi hẹn hò đầu tiên của chúng ta. Nếu sai địa điểm, uống.',
	},
	{
		id: 81,
		type: 'couple',
		question:
			'Ai là người định hướng (google maps) giỏi hơn? Người còn lại uống.',
	},
	{
		id: 82,
		type: 'couple',
		question: 'Điều lãng mạn nhất anh/em từng làm cho đối phương là gì?',
	},
	{
		id: 83,
		type: 'couple',
		question:
			'Nếu có thể dịch chuyển tức thời đến bất cứ đâu ngay bây giờ trong 1 giờ, đó sẽ là đâu?',
	},
	{
		id: 84,
		type: 'couple',
		question:
			'Ai có khả năng kết bạn với người bản địa và được mời ăn tối cao hơn?',
	},
	{ id: 85, type: 'couple', question: 'Mô tả đối phương bằng một con vật.' },
	{
		id: 86,
		type: 'couple',
		question: 'Điều gì ở đối phương khiến bạn yêu ngay từ cái nhìn đầu tiên?',
	},
	{
		id: 87,
		type: 'couple',
		question: 'Nếu phải sống không có nhau 1 năm, bạn sẽ nhớ điều gì nhất?',
	},
	{
		id: 88,
		type: 'couple',
		question: 'Bạn thích được đối phương gọi bằng tên gọi nào nhất?',
	},
	{
		id: 89,
		type: 'couple',
		question: 'Kể một giấc mơ có đối phương trong đó.',
	},
	{
		id: 90,
		type: 'couple',
		question: 'Đối phương giống ai trong gia đình họ nhất?',
	},
	{
		id: 91,
		type: 'couple',
		question: 'Nếu có thể đọc suy nghĩ đối phương 1 lần, bạn muốn đọc lúc nào?',
	},
	{
		id: 92,
		type: 'couple',
		question: 'Thú nhận một điều bạn từng ghen tuông trong mối quan hệ này.',
	},
	{ id: 93, type: 'couple', question: 'Bạn thích được ôm kiểu gì nhất?' },
	{
		id: 94,
		type: 'couple',
		question: 'Nếu viết thư tình cho đối phương, dòng đầu tiên sẽ là gì?',
	},
	{
		id: 95,
		type: 'couple',
		question: 'Đối phương có thể làm gì khiến bạn cười ngay lập tức?',
	},
	{
		id: 96,
		type: 'couple',
		question: 'Nếu là ngày cuối cùng bên nhau, bạn sẽ làm gì?',
	},
	{
		id: 97,
		type: 'couple',
		question: 'Hát một đoạn bài hát tặng đối phương ngay bây giờ.',
	},
	{
		id: 98,
		type: 'couple',
		question: 'Bạn đã từng mơ về tương lai của chúng ta như thế nào?',
	},
	{
		id: 99,
		type: 'couple',
		question: 'Nói một lời xin lỗi mà bạn chưa từng nói.',
	},
	{
		id: 100,
		type: 'couple',
		question: 'Thì thầm vào tai đối phương điều bạn yêu nhất ở họ.',
	},
];

export const allWhisperCards: WhisperCard[] = [...worldCards, ...coupleCards];

// Get random card from all cards
export function getRandomCard(): WhisperCard {
	return allWhisperCards[Math.floor(Math.random() * allWhisperCards.length)];
}

// Get cards by type
export function getCardsByType(type: 'world' | 'couple'): WhisperCard[] {
	return allWhisperCards.filter((card) => card.type === type);
}

// Get random card by type
export function getRandomCardByType(type: 'world' | 'couple'): WhisperCard {
	const cards = getCardsByType(type);
	return cards[Math.floor(Math.random() * cards.length)];
}

// Shuffle cards
export function shuffleCards(cards: WhisperCard[]): WhisperCard[] {
	const shuffled = [...cards];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
