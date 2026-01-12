// Quest data for the Love Passport feature
// Based on docs/feature_love_passport.md
import type { VoucherReward } from '../types/game';

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
	// ==================== DAY 1: HẠ CÁNH & NGỦ ĐÔNG ====================
	{
		id: 'day1_arrival',
		dayId: 1,
		time: '14:00',
		titleAnh: 'Hạ Cánh Nơi Anh',
		titleEm: 'Chế Độ Công Chúa',
		descriptionAnh:
			'Xe đến văn phòng. Gọi xe trung chuyển về 22 Cát Cát. Xách hết đồ, không để Em động tay.',
		descriptionEm:
			'Em là công chúa, cấm đụng tay chân. Chụp lén Anh đang khệ nệ xách đồ (nhớ dìm hàng).',
		code: 'ARRIVED',
		rewardAnh: {
			id: 'voucher-luggage',
			title: 'Voucher Mát-Xa Dưa Hấu',
			description: 'Thời hạn: 15 phút. Em dùng cặp dưa hấu mềm mại massage lưng cho Anh. Anh chỉ việc nằm hưởng thụ, mọi mệt mỏi sẽ tan biến.',
			icon: '💆‍♂️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-princess-mode',
			title: 'Thẻ Bài Nữ Hoàng',
			description: 'Thời hạn: 60 phút. Anh trở thành nô lệ, bắt buộc phải tuân thủ mọi mệnh lệnh và chăm sóc Em vô điều kiện. Không được cãi.',
			icon: '👑',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_arrival',
	},
	{
		id: 'day1_checkin',
		dayId: 1,
		time: '14:15',
		titleAnh: 'Quản Gia Tận Tụy',
		titleEm: 'Nữ Hoàng Nhận Phòng',
		descriptionAnh:
			'Nhận phòng Chill With Home. Đặt ngay Lẩu Gà/Đồ Nướng cho tối nay (20:30). Dặn lễ tân giờ ăn.',
		descriptionEm:
			'Ngồi ghế chờ xinh đẹp. Nhắc anh người yêu đặt lẩu gà ăn tối tại phòng.',
		code: 'WARM',
		rewardAnh: {
			id: 'voucher-actor',
			title: "Voucher 'Mèo Con' Ngoan Ngoãn",
			description: "Thời hạn: 30 phút. Em buộc phải hóa thân thành mèo, chỉ được kêu 'meo meo', cọ sát và phục tùng chủ nhân vô điều kiện.",
			icon: '😈',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-queen',
			title: "Quyền Phạt 'Hư Hỏng'",
			description: 'Thời hạn: 20 phút. Em có quyền trừng phạt Anh bằng cách kích thích nhưng cấm Anh chạm/xuất. Anh phải chịu đựng đến khi hết giờ.',
			icon: '⛓️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_tea',
	},
	{
		id: 'day1_hibernate',
		dayId: 1,
		time: '14:30',
		titleAnh: 'Gấu Ngủ Đông',
		titleEm: 'Bé Koala',
		descriptionAnh:
			'Kéo rèm, bật sưởi. Ôm Em ngủ một giấc thật ngon bù lại quãng đường đi.',
		descriptionEm:
			'Biến thành gấu Koala bám chặt lấy cây bạch đàn (là Anh). Ngủ một giấc lấy lại sức!',
		code: 'KOALA',
		rewardAnh: {
			id: 'voucher-pillow',
			title: "Voucher Ôm Ngủ 'Trần Trụi'",
			description: 'Thời hạn: Cả đêm. Đặc quyền được ôm Em ngủ trong trạng thái không mảnh vải, cảm nhận trọn vẹn hơi ấm da thịt.',
			icon: '🔥',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-battery',
			title: 'Dịch Vụ Đánh Thức Đặc Biệt',
			description: 'Thời hạn: 15 phút. Yêu cầu Anh đánh thức Em dậy bằng những cử chỉ vuốt ve ướt át, đảm bảo Em tỉnh giấc trong sự đê mê.',
			icon: '🔋',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_game1',
	},
	{
		id: 'day1_dinner',
		dayId: 1,
		time: '20:30',
		titleAnh: 'Đầu Bếp Tại Gia',
		titleEm: 'Thực Thần Tại Gia',
		descriptionAnh:
			'Ăn tối tại Homestay (Lẩu Gà/BBQ). Nướng thịt/nhúng rau cho Em ăn.',
		descriptionEm:
			'Chỉ việc ngồi ăn và tận hưởng. Chụp ảnh nồi lẩu nghi ngút khói.',
		code: 'HOMESTAY',
		rewardAnh: {
			id: 'voucher-chef',
			title: "Voucher 'Ăn' Em",
			description: 'Anh toàn quyền chọn Em là món chính cho bữa tối, được quyền khám phá và thưởng thức cơ thể Em theo ý muốn.',
			icon: '🍽️',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-foodie',
			title: 'Dịch Vụ Tắm Rửa Hoàng Gia',
			description: 'Thời hạn: 30 phút. Em chỉ việc đứng im, Anh có nhiệm vụ tắm rửa, kỳ cọ sạch sẽ từng ngóc ngách cơ thể cho Em như phục vụ bà hoàng.',
			icon: '🛁',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_dinner',
	},
	{
		id: 'day1_chill',
		dayId: 1,
		time: '21:30',
		titleAnh: 'Nhiếp Ảnh Gia Ban Công',
		titleEm: 'Nàng Thơ Bên Sưởi',
		descriptionAnh:
			'Chụp cho Em bộ ảnh "Sống ảo tại gia" ở ban công/lò sưởi. Góc chụp từ trên cao.',
		descriptionEm:
			'Tạo dáng cute bên cốc trà nóng/lò sưởi. Bắt anh chụp đến khi nào ưng thì thôi.',
		code: 'CHILL',
		rewardAnh: {
			id: 'voucher-kiss',
			title: 'Voucher Nụ Hôn Kiểu Pháp',
			description: 'Thời hạn: 5 phút. Anh có quyền đòi hỏi một nụ hôn sâu kiểu Pháp bất cứ lúc nào. Em phải dùng lưỡi phục vụ khoang miệng Anh nhiệt tình nhất.',
			icon: '💋',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-model',
			title: 'Quyền Đòi Hỏi Vô Độ',
			description: "Thời hạn: 60 phút. Em được phép nũng nịu và yêu cầu Anh phải lấp đầy cơn khát tình của Em bằng 'vũ khí' của Anh ngay lập tức.",
			icon: '🐱',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_church',
	},

	// ==================== DAY 2: SINH NHẬT RỰC RỠ ====================
	{
		id: 'day2_cake',
		dayId: 2,
		time: '10:00',
		titleAnh: 'Điệp Vụ Bánh Kem',
		titleEm: 'Công Chúa Ngủ Nướng',
		descriptionAnh:
			'LÉN nhắn tin chốt bánh kem với Tiệm Chị Híp (Ship 16h). Đừng để Em biết!',
		descriptionEm:
			'Ngủ nướng thỏa thích. Khi nào dậy thì make-up thật xinh đẹp (lồng lộn lên).',
		code: 'CAKE',
		rewardAnh: {
			id: 'voucher-paparazzi',
			title: 'Voucher Chiêm Ngưỡng Tuyệt Đối',
			description: 'Thời hạn: 10 phút. Anh được quyền ngắm nhìn Em khỏa thân trong chăn để ghi nhớ vẻ đẹp này. Luật bất biến: Cấm chạm.',
			icon: '👀',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-beauty',
			title: "Dịch Vụ 'Chào Cờ' Sáng Sớm",
			description: "Em yêu cầu Anh phải dùng miệng và tay phục vụ, xoa dịu 'cậu bé' buổi sáng của Anh cho đến khi thỏa mãn.",
			icon: '🍆',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cake',
	},
	{
		id: 'day2_lunch',
		dayId: 2,
		time: '13:00',
		titleAnh: 'Thợ Săn Cốn Sủi',
		titleEm: 'Thực Thần Sành Ăn',
		descriptionAnh:
			'Đưa Em đi ăn Cốn Sủi Ông Há (591 ĐBP). Gọi thêm sủi cảo chiên.',
		descriptionEm:
			'Thưởng thức đặc sản. Chụp ảnh lưu niệm món ăn mới lạ này.',
		code: 'YUMMY',
		rewardAnh: {
			id: 'voucher-driver',
			title: 'Voucher Bj Thượng Hạng',
			description: "Anh nằm thư giãn, Em bắt buộc phải trổ hết tài nghệ miệng lưỡi để chăm sóc 'người anh em' của Anh đến khi happy ending.",
			icon: '🍭',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-taster',
			title: 'Quyền Được Bón Ăn Kiểu Mới',
			description: 'Thời hạn: 30 phút. Anh phải dùng miệng của mình để truyền thức ăn hoặc đồ uống sang miệng Em một cách tình cảm nhất.',
			icon: '🥟',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_game1',
	},
	{
		id: 'day2_sunplaza',
		dayId: 2,
		time: '14:00',
		titleAnh: 'Phó Nháy Có Tâm',
		titleEm: 'Siêu Mẫu Sun Plaza',
		descriptionAnh:
			'Chụp cháy máy cho Em tại Sun Plaza & Nhà thờ đá. Lăn xả, nằm đất chụp góc rộng.',
		descriptionEm:
			'Diễn sâu tại trời Âu (fake). Mặc váy len body sang chảnh chụp hình.',
		code: 'PARIS',
		rewardAnh: {
			id: 'voucher-poet',
			title: "Voucher 'Khám Phá' Nơi Công Cộng",
			description: 'Thời hạn: 5 phút. Anh được quyền luồn tay vào váy Em tại nơi đông người (kín đáo). Em bắt buộc phải đứng im chịu đựng sự trêu chọc.',
			icon: '🤫',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-playlist',
			title: "Voucher 'Quickie' Giả",
			description: 'Thời hạn: 10 phút. Em kéo Anh vào góc khuất hoặc nơi công cộng vắng người, yêu cầu Anh thực hiện hành động cọ xát nóng bỏng như đang làm tình thật.',
			icon: '🔥',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cafe',
	},
	{
		id: 'day2_spa',
		dayId: 2,
		time: '17:30',
		titleAnh: 'Thư Ký Tận Tâm',
		titleEm: 'Quý Cô Thư Giãn',
		descriptionAnh:
			'Đến Dao\'s Center. Đảm bảo Em được ngâm bồn thoải mái nhất. Canh giờ 20p gọi Em.',
		descriptionEm:
			'Ngâm lá thuốc Dao Đỏ thư giãn. Tắt điện thoại, tận hưởng mùi thảo mộc.',
		code: 'RELAX',
		rewardAnh: {
			id: 'voucher-massage-man',
			title: "Voucher 'La Hét' Trong Sung Sướng",
			description: 'Một lần làm tình mà Em bắt buộc phải kêu gào thật to, nói những từ ngữ dâm đãng nhất để kích thích Anh tột độ.',
			icon: '🔊',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-relax',
			title: 'Dịch Vụ Spa Tình Yêu',
			description: 'Thời hạn: 20 phút. Anh phải massage và dùng tay kích thích Em trong bồn tắm nước nóng, đảm bảo Em đạt được sự thư giãn tột đỉnh.',
			icon: '🧖‍♀️',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_spa',
	},
	{
		id: 'day2_birthday',
		dayId: 2,
		time: '21:00',
		titleAnh: 'Chủ Tiệc Bí Mật',
		titleEm: 'Nhân Vật Chính',
		descriptionAnh:
			'Bất ngờ!! Tổ chức Tiệc sinh nhật tại phòng. Bánh kem, nến, nhạc, quà.',
		descriptionEm:
			'Bất ngờ chưa?? Thổi nến, ước và nhận quà từ ai-mà-cũng-biết-là-ai-đấy.',
		code: 'WISH',
		rewardAnh: {
			id: 'voucher-singer',
			title: 'Voucher Xem Show Thoát Y',
			description: 'Thời hạn: 1 bài hát. Em phải thực hiện một màn thoát y riêng tư cho Anh. Anh được ngồi ngắm thỏa thích nhưng tuyệt đối không chạm.',
			icon: '💃',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-gift',
			title: "Quyền Sử Dụng 'Ghế' Người",
			description: 'Thời hạn: 30 phút. Anh phải ngồi dựa lưng làm ghế nệm. Em toàn quyền cưỡi lên mặt hoặc đùi Anh, sử dụng Anh để thỏa mãn bản thân.',
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
		time: '13:00',
		titleAnh: 'Sherpa Dẫn Đường',
		titleEm: 'Nhà Leo Núi Xinh Đẹp',
		descriptionAnh:
			'Dẫn Em leo Hàm Rồng. Mục tiêu: Sân Mây. Nhớ cầm nước và đỡ Em những đoạn dốc.',
		descriptionEm:
			'Leo núi nhưng vẫn phải xinh. Lên Sân Mây ngắm toàn cảnh thị trấn.',
		code: 'PEAK',
		rewardAnh: {
			id: 'voucher-cameraman',
			title: "Voucher 'Nuốt Trọn' Tinh Hoa",
			description: 'Em phải dùng kỹ nghệ lưỡi điêu luyện để làm Anh sướng đến khi bắn ra, và phải uống sạch sẽ không chừa một giọt.',
			icon: '🍼',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-top-model',
			title: "Voucher 'Triển Lãm' Kín",
			description: "Thời hạn: 1 phút. Tại góc vắng, Em buộc phải vén váy cho Anh chiêm ngưỡng 'kỳ quan' ướt át. Luật bất biến: Chỉ nhìn, không chạm.",
			icon: '🫣',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_peak',
	},
	{
		id: 'day3_moana',
		dayId: 3,
		time: '15:15',
		titleAnh: 'Trợ Lý Sống Ảo',
		titleEm: 'Nàng Thơ Vô Cực',
		descriptionAnh:
			'Đến Moana Sapa (68 Violet). Chụp ảnh hồ vô cực, tượng cô gái. Cầm đồ cho Em thay.',
		descriptionEm:
			'Tạo dáng bên hồ vô cực, cổng trời. Góc nghiêng thần thánh đâu, show ra!',
		code: 'MOANA',
		rewardAnh: {
			id: 'voucher-hold-bag',
			title: 'Voucher Gối Đầu Dưa Hấu',
			description: 'Thời hạn: 15 phút. Anh được quyền gối đầu, úp mặt vào cặp dưa hấu mềm mại của Em để nghỉ ngơi và tận hưởng hương thơm.',
			icon: '🦵',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-infinite-pic',
			title: 'Voucher Nữ Hoàng Lười Biếng',
			description: 'Em chỉ việc nằm hưởng thụ, Anh phải tự thân vận động và dùng mọi kỹ năng để phục vụ cho đến khi Em ra thì thôi.',
			icon: '👸',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_catcat', // Reusing ID slot to avoid breaking UI map if needed, or update ID
	},
	{
		id: 'day3_walk',
		dayId: 3,
		time: '17:00',
		titleAnh: 'Người Bạn Đồng Hành',
		titleEm: 'Cô Gái Mộng Mơ',
		descriptionAnh:
			'Đi bộ xuống dốc từ Moana về Homestay. Nắm tay Em đi dưới hoàng hôn (nếu có).',
		descriptionEm:
			'Tản bộ ngắm cảnh thung lũng. Hít thở không khí trong lành lần cuối.',
		code: 'WALK',
		rewardAnh: {
			id: 'voucher-hero',
			title: 'Voucher Public',
			description: "Anh được quyền yêu cầu Em thò tay vào quần và chăm sóc 'cậu bé' ngay khi đang đi dạo ngoài đường đến khi thỏa mãn.",
			icon: '✊',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-safe',
			title: 'Dịch Vụ Massage Chân Bằng Miệng',
			description: 'Thời hạn: 20 phút. Anh phải dùng miệng hôn và liếm dọc từ ngón chân, bắp chân lên đến đùi non của Em...',
			icon: '🦶',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_safe',
	},
	{
		id: 'day3_dinner',
		dayId: 3,
		time: '20:00',
		titleAnh: 'Đại Gia Cá Tầm',
		titleEm: 'Thực Thần Sang Chảnh',
		descriptionAnh:
			'Ăn tối Lẩu Cá Tầm/Thắng Cố tại A Quỳnh. Bữa ăn sang nhất chuyến đi!',
		descriptionEm:
			'Ăn sập Sapa. Thử món Thắng Cố (nếu dám) hoặc Cá Tầm. Đánh giá món ăn.',
		code: 'FEAST',
		rewardAnh: {
			id: 'voucher-spender',
			title: 'Quyền Xâm Nhập Tuyệt Đối',
			description: 'Tối nay Em phải hoàn toàn thả lỏng, đón nhận sự xâm nhập sâu nhất và thô bạo nhất từ Anh.',
			icon: '🍌',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-snack-queen',
			title: 'Voucher Bữa Tiệc Nyotaimori',
			description: 'Em muốn ăn trên... người Anh. Anh phải nằm yên làm bàn tiệc để Em bày đồ ăn lên và thưởng thức.',
			icon: '🍣',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_cheers',
	},

	// ==================== DAY 4: TẠM BIỆT ====================
	{
		id: 'day4_morning',
		dayId: 4,
		time: '09:00',
		titleAnh: 'Thợ Săn Nắng',
		titleEm: 'Nàng Thơ Cuối Cùng',
		descriptionAnh:
			'Tranh thủ chụp nốt vài kiểu ảnh nắng sáng tại Homestay trước khi về.',
		descriptionEm:
			'Lưu lại những khoảnh khắc cuối cùng tại "Nhà". Cười thật tươi!',
		code: 'SUNNY',
		rewardAnh: {
			id: 'voucher-checker',
			title: "Voucher 'Morning Sex' Trong Tắm",
			description: 'Quyền được làm tình dưới vòi hoa sen. Em phải phối hợp để cả hai có một hiệp ướt át.',
			icon: '🚿',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-memories',
			title: 'Quyền Đánh Dấu Chủ Quyền',
			description: 'Thời hạn: 5 phút. Em được quyền để lại những dấu hickey đỏ chót trên cổ hoặc ngực Anh để khẳng định Anh là của Em. Anh phải để yên.',
			icon: '💋',
			isRedeemed: false,
			isUsed: false,
		},
		stampId: 'stamp_coffee',
	},
	{
		id: 'day4_checkout',
		dayId: 4,
		time: '11:30',
		titleAnh: 'Thủ Quỹ Tổng Kết',
		titleEm: 'Giám Sát Viên',
		descriptionAnh:
			'Thanh toán hóa đơn ăn tối hôm đầu. Trả phòng. Tạm biệt Chill With Home.',
		descriptionEm:
			'Kiểm tra lại hành lý lần cuối. "Có quên anh người yêu không đấy?".',
		code: 'HOME',
		rewardAnh: {
			id: 'voucher-end',
			title: 'Voucher Xả Lũ Hà Thành',
			description: "Thời hạn: Cả đêm. Đêm nay về Hà Nội, Anh được phép bắn tất cả 'tinh hoa' vào miệng hoặc lên ngực Em. Em phải hứng trọn.",
			icon: '💦',
			isRedeemed: false,
			isUsed: false,
		},
		rewardEm: {
			id: 'voucher-end-2',
			title: 'Thẻ Bài Sai Khiến Tuyệt Đối',
			description: 'Thời hạn: 60 phút. Em có quyền ra lệnh bất cứ điều gì cho Anh. Anh bắt buộc phải tuân theo vô điều kiện.',
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
