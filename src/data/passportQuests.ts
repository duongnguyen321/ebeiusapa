// Quest data for the Love Passport feature
// Based on docs/feature_love_passport.md
import type { VoucherReward } from './easterEggs';

export interface PassportQuest {
	id: string;
	dayId: number;
	time: string;
	titleAnh: string;
	titleEm: string;
	descriptionAnh: string;
	descriptionEm: string;
	code: string;
	rewardAnh: VoucherReward;
	rewardEm: VoucherReward;
	stampId?: string;
}

export const passportQuests: PassportQuest[] = [
	// ==================== DAY 1: HẠ CÁNH & PHỤC HỒI ====================
	{
		id: 'day1_arrival',
		dayId: 1,
		time: '14:00',
		titleAnh: 'Hạ Cánh Nơi Anh',
		titleEm: 'Chế Độ Công Chúa',
		descriptionAnh:
			'Gọi Taxi ngay (0214 363 63 63). Tuyệt đối không để Em xách nặng. Xách đồ xong làm mặt "lực sĩ" rồi nhập code.',
		descriptionEm:
			'Em là công chúa, cấm đụng tay chân. Chụp lén Anh đang khệ nệ xách đồ (nhớ dìm hàng) rồi chờ code!',
		code: 'ARRIVED',
		rewardAnh: {
			id: 'voucher-luggage',
			title: 'Được Em Đấm Lưng',
			description: 'Sử dụng voucher để yêu cầu Em đấm lưng cho Anh trong 5 phút ngay lập tức.',
			icon: '💆‍♂️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-princess-mode',
			title: 'Chế Độ Công Chúa',
			description: 'Voucher đặc quyền: Anh phải phục vụ Em A-Z trong 1 tiếng khi Em kích hoạt.',
			icon: '👑',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_tea',
		dayId: 1,
		time: '14:30',
		titleAnh: 'Trà Gừng Dâng Nàng',
		titleEm: 'Hoàng Hậu Giá Lâm',
		descriptionAnh:
			'Xin lễ tân trà gừng nóng. Khi mang về phòng phải quỳ 1 chân dâng trà như phim cổ trang. Diễn sâu vào!',
		descriptionEm:
			'Ngồi kiêu sa trên giường chờ dâng trà. Quay video cảnh Anh đang "diễn" (để sau này tống tiền).',
		code: 'WARM',
		rewardAnh: {
			id: 'voucher-actor',
			title: 'Diễn Viên Triển Vọng',
			description: 'Yêu cầu Em phải dành lời khen ngợi cho khả năng diễn xuất của Anh (hoặc thưởng 1 cái hôn).',
			icon: '🎭',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-queen',
			title: 'Quyền Lực Tối Thượng',
			description: 'Khi sử dụng, Anh buộc phải trả lời "Dạ, thưa Hoàng Hậu" với mọi câu nói của Em trong 30p.',
			icon: '👸',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_tea',
	},
	{
		id: 'day1_game',
		dayId: 1,
		time: '16:00',
		titleAnh: 'Thánh Ngủ Nướng',
		titleEm: 'Bé Koala',
		descriptionAnh:
			'Ôm Em ngủ một giấc thật ngon. Ai dậy trước người đó thắng (nhưng nhớ đừng làm Em thức).',
		descriptionEm:
			'Biến thành gấu Koala bám chặt lấy cây bạch đàn (là Anh). Ngủ một giấc lấy lại sức!',
		code: 'KOALA',
		rewardAnh: {
			id: 'voucher-pillow',
			title: 'Gối Ôm Cao Cấp',
			description: 'Được Em ôm ngủ cả đêm nay (cấm Em đẩy ra dù có nóng).',
			icon: '🛌',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-battery',
			title: 'Sạc Pin Tình Yêu',
			description: 'Được Anh nạp đầy 100% năng lượng yêu thương bất cứ lúc nào Em muốn.',
			icon: '🔋',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_game1',
	},
	{
		id: 'day1_dinner',
		dayId: 1,
		time: '18:30',
		titleAnh: 'Thợ Săn Cốn Sủi',
		titleEm: 'Thực Thần Tái Xuất',
		descriptionAnh:
			'Đến quán Ông Há (436 ĐBP). Order Cốn Sủi *không cay*. Trước khi ăn phải múa đũa 3 vòng.',
		descriptionEm:
			'Đố vui: "Cốn Sủi" tiếng Hoa nghĩa là gì? (Món ăn khô trong nước sốt). Ăn xong nhớ lau miệng cho Anh.',
		code: 'YUMMY',
		rewardAnh: {
			id: 'voucher-chef',
			title: 'Bếp Trưởng Tài Ba',
			description: 'Được Em lau miệng và khen "Anh chọn quán ngon quá!".',
			icon: '👨‍🍳',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-foodie',
			title: 'Cái Bụng No Căng',
			description: 'Thẻ bài miễn tử: Em được miễn làm việc nhà/rửa bát/dọn dẹp trong tối nay.',
			icon: '🍜',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_church',
		dayId: 1,
		time: '20:00',
		titleAnh: 'Hiệp Sĩ Trong Sương',
		titleEm: 'Nàng Thơ Moody',
		descriptionAnh:
			'Dắt tay Em đi dạo Nhà Thờ Đá. Nếu mưa thì che ô. Thử thách: Hôn trộm Em một cái giữa quảng trường.',
		descriptionEm:
			'Chụp ảnh "so deep" dưới ánh đèn vàng. Tạo dáng "lạnh lùng girl" cho Anh chụp mỏi tay thì thôi.',
		code: 'FOGGY',
		rewardAnh: {
			id: 'voucher-knight',
			title: 'Hiệp Sĩ Bảo Vệ',
			description: 'Yêu cầu Em phải nắm tay Anh không buông trong suốt buổi đi dạo tối nay.',
			icon: '🛡️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-model',
			title: 'Siêu Mẫu Ảnh',
			description: 'Sở hữu album ảnh "Sương mù Sapa" do nhiếp ảnh gia Anh chụp.',
			icon: '📸',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_church',
	},

	// ==================== DAY 2: SINH NHẬT RỰC RỠ ====================
	{
		id: 'day2_cake',
		dayId: 2,
		time: '09:00',
		titleAnh: 'Điệp Vụ Bánh Kem',
		titleEm: 'Gương Thần Kia Ơi',
		descriptionAnh:
			'Gọi confirm bánh với tiệm Chị Híp (bí mật). Sau đó lén chụp Em lúc đang ngủ (đừng để bị đánh).',
		descriptionEm:
			'Selfie trước gương với bộ đồ xinh nhất (OOTD). Chu mỏ, nháy mắt các kiểu. Sẵn sàng tỏa sáng!',
		code: 'CAKE',
		rewardAnh: {
			id: 'voucher-paparazzi',
			title: 'Paparazzi',
			description: 'Giữ đống ảnh dìm hàng của Em làm "vũ khí".',
			icon: '📷',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-beauty',
			title: 'Xinh Đẹp Tuyệt Trần',
			description: 'Kích hoạt để Anh phải khen Em xinh đẹp mỗi 30 phút/lần trong ngày hôm nay.',
			icon: '💄',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cake',
	},
	{
		id: 'day2_cafe',
		dayId: 2,
		time: '11:00',
		titleAnh: 'Góc Paris Nhỏ',
		titleEm: 'Quý Cô Sang Chảnh',
		descriptionAnh:
			'Tại Le Gecko: Tìm góc ban công đẹp nhất. Thử thách: Làm thơ 2 câu tán tỉnh Em (phải có vần).',
		descriptionEm:
			'Gọi Cacao nóng. Vừa uống vừa nhìn xa xăm diễn "MV ca nhạc". Bắt anh quay video slow-motion.',
		code: 'CAFE',
		rewardAnh: {
			id: 'voucher-poet',
			title: 'Nhà Thơ Tình',
			description: 'Được Em hôn má thưởng vì bài thơ tán tỉnh quá "sến".',
			icon: '📜',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-playlist',
			title: 'DJ Riêng',
			description: 'Toàn quyền quyết định nhạc trên xe/trong phòng.',
			icon: '🎵',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cafe',
	},
	{
		id: 'day2_funny',
		dayId: 2,
		time: '12:00',
		titleAnh: 'Thách Đấu Mặt Xấu',
		titleEm: 'Thách Đấu Mặt Xấu',
		descriptionAnh:
			'Thi xem ai làm mặt xấu dị hơn (trợn mắt, chu mỏ). Chụp lại làm bằng chứng!',
		descriptionEm:
			'Thi làm mặt xấu. Ai cười trước người đó thua và phải bao chầu nước tiếp theo!',
		code: 'UGLY',
		rewardAnh: {
			id: 'voucher-meme-king',
			title: 'Vua Meme',
			description: 'Được lưu ảnh mặt xấu của Em làm sticker.',
			icon: '🤪',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-meme-queen',
			title: 'Nữ Hoàng Meme',
			description: 'Voucher xóa ảnh: Yêu cầu Anh xóa ngay tấm ảnh dìm hàng vừa chụp.',
			icon: '🤡',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_funny1',
	},
	{
		id: 'day2_supply',
		dayId: 2,
		time: '13:00',
		titleAnh: 'Đội Trưởng Hậu Cần',
		titleEm: 'DJ Tiệc Tùng',
		descriptionAnh:
			'Siêu thị Xuân Trường: Mua Nến, Rượu, Snack. Thử thách: Đội gói bim bim lên đầu chụp ảnh.',
		descriptionEm:
			'Chọn nhạc cho lúc tắm lá thuốc. Duyệt danh sách nhạc và nhảy một điệu ngắn tại siêu thị.',
		code: 'READY',
		rewardAnh: {
			id: 'voucher-shipper',
			title: 'Shipper Cao Cấp',
			description: 'Được Em bóc bim bim cho ăn.',
			icon: '🛒',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-party',
			title: 'Voucher Tiệc Tùng',
			description: 'Được quyền yêu cầu Anh nhảy múa mua vui.',
			icon: '🎉',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_supply',
	},
	{
		id: 'day2_spa',
		dayId: 2,
		time: '14:30',
		titleAnh: 'Thầy Lang Dao Đỏ',
		titleEm: 'Tiên Nữ Giáng Trần',
		descriptionAnh:
			'Đến Sapa Green Spa. Chọn bồn Pơ-mu. Trong lúc chờ, bóp vai cho Em 5 phút.',
		descriptionEm:
			'Ngâm lá thuốc 20p. Tưởng tượng mình là tiên nữ đang tắm suối. Phê pha nhưng đừng ngủ gật!',
		code: 'RELAX',
		rewardAnh: {
			id: 'voucher-massage-man',
			title: 'Thợ Massage',
			description: 'Được Em khen là "tay nghề cao" (hy vọng thế).',
			icon: '💆‍♂️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-relax',
			title: 'Phiếu Bé Ngoan',
			description: 'Voucher spa tại gia: Yêu cầu Anh sấy tóc cho Em ngay sau khi tắm.',
			icon: '🧖‍♀️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_spa',
	},
	{
		id: 'day2_dinner',
		dayId: 2,
		time: '17:30',
		titleAnh: 'Vua Cá Tầm',
		titleEm: 'Giám Khảo MasterChef',
		descriptionAnh:
			'Nhà hàng A Quỳnh: Gắp miếng sụn giòn nhất cho Em. Cụng ly và nói "Chúc mừng sinh nhật Bà Xã/Em Yêu".',
		descriptionEm:
			'Chấm điểm món Lẩu: 1-10? Biểu cảm khuôn mặt "ngon ngất ngây" khi ăn miếng đầu tiên.',
		code: 'CHEERS',
		rewardAnh: {
			id: 'voucher-toast',
			title: 'Người Đàn Ông Ga Lăng',
			description: 'Thẻ bài miễn tội: Em sẽ bỏ qua một lỗi lầm nhỏ của Anh trong ngày.',
			icon: '🥂',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-yummy',
			title: 'Thẻ Ăn Ngon',
			description: 'Được Anh gắp hết những miếng ngon nhất trong nồi lẩu.',
			icon: '🥘',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cheers',
	},
	{
		id: 'day2_birthday',
		dayId: 2,
		time: '21:00',
		titleAnh: 'Thắp Nến Ước Nguyện',
		titleEm: 'Công Chúa Thổi Nến',
		descriptionAnh:
			'Thắp nến, tắt đèn. Hát Happy Birthday phiên bản "Opera" (hát thật to).',
		descriptionEm:
			'Nhắm mắt, ước một điều thật tham lam. Thổi nến cái phù! Mở quà thôi!!!',
		code: 'WISH',
		rewardAnh: {
			id: 'voucher-singer',
			title: 'Ca Sĩ Opera',
			description: 'Yêu cầu Em phải vỗ tay cổ vũ nhiệt tình cho màn trình diễn của Anh.',
			icon: '🎤',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-gift',
			title: 'Quà Sinh Nhật',
			description: 'Mở gói quà bí mật to bự từ Anh!',
			icon: '🎁',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_birthday',
	},

	// ==================== DAY 3: CHINH PHỤC ĐỈNH CAO ====================
	{
		id: 'day3_hamrong',
		dayId: 3,
		time: '09:00',
		titleAnh: 'Nhiếp Ảnh Gia Có Tâm',
		titleEm: 'Siêu Mẫu Đỉnh Núi',
		descriptionAnh:
			'Leo Hàm Rồng. Tại Sân Mây, phải lăn xả nằm rạp xuống đất để chụp cho Em tấm ảnh chân dài miên man.',
		descriptionEm:
			'Tại Sân Mây: Tạo 3 dáng (Cute, Cool ngầu, Quyến rũ). Bắt Anh chụp lại hết!',
		code: 'PEAK',
		rewardAnh: {
			id: 'voucher-cameraman',
			title: 'Nhiếp Ảnh Gia',
			description: 'Được Em lau mồ hôi và cho uống nước.',
			icon: '📸',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-top-model',
			title: 'Huy Hiệu Leo Núi',
			description: 'Chứng nhận đã chinh phục đỉnh Hàm Rồng.',
			icon: '🏔️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_peak',
	},
	{
		id: 'day3_lunch',
		dayId: 3,
		time: '12:00',
		titleAnh: 'Thánh Bóc Gà',
		titleEm: 'Thánh Ăn Cay',
		descriptionAnh:
			'Hải Lâm Quán: Xé gà nướng tiêu xanh, bón cho Em ăn. Cấm ăn mảnh.',
		descriptionEm:
			'Thử thách ăn một hạt tiêu xanh (nếu dám). Quay video reaction độ cay!',
		code: 'SPICY',
		rewardAnh: {
			id: 'voucher-service',
			title: 'Phục Vụ Tận Răng',
			description: 'Được Em bón lại cho 1 miếng gà ngon.',
			icon: '🍗',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-warning',
			title: 'Cảnh Báo Cay',
			description: 'Một nụ hôn "vị tiêu xanh" từ Anh (để giải cay).',
			icon: '💋',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_chicken',
	},
	{
		id: 'day3_catcat',
		dayId: 3,
		time: '15:00',
		titleAnh: 'Chàng Trai Bản',
		titleEm: 'Mị Nương H\'Mông',
		descriptionAnh:
			'Thuê đồ dân tộc (Optional). Thử thách: Nhảy điệu múa khèn (hoặc múa quạt) bên suối.',
		descriptionEm:
			'Hóa thân thành gái bản. Tạo dáng múc nước, dệt vải. Chụp ảnh chung làm mặt xấu.',
		code: 'STREAM',
		rewardAnh: {
			id: 'voucher-dancer',
			title: 'Vũ Công Bản Làng',
			description: 'Được Em quay video lưu niệm điệu nhảy "thần thánh".',
			icon: '💃',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-album',
			title: 'Album H\'Mông',
			description: 'Có ngay bộ ảnh sống ảo nghìn like.',
			icon: '🖼️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_catcat',
	},
	{
		id: 'day3_return',
		dayId: 3,
		time: '16:30',
		titleAnh: 'Giải Cứu Đôi Chân',
		titleEm: 'Nữ Hoàng Xe Ôm',
		descriptionAnh:
			'BẮT BUỘC thuê xe ôm ở cuối bản. Cấm đi bộ ngược lên. Anh trả tiền!',
		descriptionEm:
			'Leo lên xe ôm, ôm chặt... bác tài (đùa đấy, ôm Anh nếu đi cùng xe). Tận hưởng gió lùa!',
		code: 'SAFE',
		rewardAnh: {
			id: 'voucher-hero',
			title: 'Người Hùng Ví Tiền',
			description: 'Được Em cảm ơn vì đã cứu đôi chân Em.',
			icon: '💸',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-legs',
			title: 'Bảo Hiểm Đôi Chân',
			description: 'Đôi chân được bảo toàn, không bị chuột rút.',
			icon: '🦵',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_safe',
	},
	{
		id: 'day3_night',
		dayId: 3,
		time: '20:00',
		titleAnh: 'Đại Gia Chợ Tình',
		titleEm: 'Thực Thần Chợ Đêm',
		descriptionAnh:
			'Mua hạt dẻ nóng, bóc cho Em ăn. Mua quà lưu niệm (móc khóa/thổ cẩm).',
		descriptionEm:
			'Ăn xiên nướng, ăn hạt dẻ, ăn cả thế giới. Chụp ảnh check-in với củ khoai nướng.',
		code: 'MARKET',
		rewardAnh: {
			id: 'voucher-spender',
			title: 'Đại Gia Chịu Chi',
			description: 'Được Em đút cho ăn hạt dẻ.',
			icon: '🌰',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-snack-queen',
			title: 'Nữ Hoàng Ăn Vặt',
			description: 'Được ăn thỏa thích không lo béo (trong tối nay).',
			icon: '🍢',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_market',
	},

	// ==================== DAY 4: NGÀY CHIA TAY ====================
	{
		id: 'day4_packing',
		dayId: 4,
		time: '08:00',
		titleAnh: 'Thánh Soi Đồ',
		titleEm: 'Thánh Nhét Đồ',
		descriptionAnh:
			'Chui xuống gầm giường check xem có rơi rớt gì không. Sạc điện thoại? Vớ? Quần chip?',
		descriptionEm:
			'Nhét hết quà cáp vào vali. Ngồi lên vali để đóng khóa nếu cần (nhờ Anh giúp).',
		code: 'CLEAR',
		rewardAnh: {
			id: 'voucher-checker',
			title: 'Thánh Soi',
			description: 'Được yên tâm là không quên gì cả.',
			icon: '🔍',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-packer',
			title: 'Vali Thần Kỳ',
			description: 'Được Anh hỗ trợ không phải ngồi đè lên vali.',
			icon: '🧳',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_packing',
	},
	{
		id: 'day4_coffee',
		dayId: 4,
		time: '10:00',
		titleAnh: 'Thư Tình Gửi Gió',
		titleEm: 'Tạm Biệt Mùa Đông',
		descriptionAnh:
			'Viettrekking: Viết một note nhỏ vào điện thoại Em: "Kỷ niệm đáng nhớ nhất là..."',
		descriptionEm:
			'Ngắm tàu hỏa Mường Hoa. Hít một hơi thật sâu không khí Sapa để mang về Hà Nội.',
		code: 'LOVE',
		rewardAnh: {
			id: 'voucher-writer',
			title: 'Thư Tình',
			description: 'Nhận được một nụ hôn tạm biệt Sapa nồng cháy.',
			icon: '💌',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-breath',
			title: 'Không Khí Sapa',
			description: 'Gói ghém kỷ niệm đẹp nhất mang về.',
			icon: '🌬️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_coffee',
	},
	{
		id: 'day4_checkout',
		dayId: 4,
		time: '12:00',
		titleAnh: 'Chốt Đơn Ra Về',
		titleEm: 'Hẹn Ngày Tái Ngộ',
		descriptionAnh:
			'Thanh toán, trả phòng. Check-out nhưng tim vẫn để lại nơi này. High-five cái nào!',
		descriptionEm:
			'Chào tạm biệt căn phòng. Vẫy tay chào lễ tân. Cùng nhấn HOME để kết thúc hành trình.',
		code: 'HOME',
		rewardAnh: {
			id: 'voucher-end',
			title: 'Video Recap',
			description: 'Xem lại video hành trình 4 ngày 3 đêm.',
			icon: '🎬',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-end-2',
			title: 'Kỷ Niệm Vô Giá',
			description: 'Một chuyến đi không thể nào quên.',
			icon: '💖',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_home',
	},
];

// Get quests for a specific day
export function getQuestsForDay(dayId: number): PassportQuest[] {
	return passportQuests.filter((q) => q.dayId === dayId);
}

// Get a specific quest by ID
export function getQuestById(id: string): PassportQuest | undefined {
	return passportQuests.find((q) => q.id === id);
}

// Validate a code for a quest
export function validateQuestCode(questId: string, inputCode: string): boolean {
	const quest = getQuestById(questId);
	if (!quest) return false;
	return quest.code.toUpperCase() === inputCode.toUpperCase();
}
