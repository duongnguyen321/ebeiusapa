import { LucideIcon, Heart, Hand, MessageCircle, Mic, Star, Sparkles, Feather, Lock, Coffee, Camera, Music, Gift, Moon, Sun, CloudRain, Utensils, Smile, Eye, Zap, Flame, Crown, Gem, Umbrella } from 'lucide-react';

// ==================== STYLES ====================

export interface LiquidTheme {
  primaryColor: string;
  gradient: string;
  blobColor: string;
  shadow: string;
}

export const LIQUID_THEMES: Record<'anh' | 'em', LiquidTheme> = {
  anh: {
    primaryColor: 'cyan-400',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10',
    blobColor: '#22d3ee', // Cyan-400
    shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
  },
  em: {
    primaryColor: 'pink-400',
    gradient: 'bg-gradient-to-br from-pink-500/20 to-rose-500/10',
    blobColor: '#f472b6', // Pink-400
    shadow: 'shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  },
};

// ==================== INTERFACES ====================

export type TaskType = 'dare' | 'reward' | 'spicy';
export type TimeOfDay = 'morning' | 'afternoon' | 'night' | 'late_night';

export interface LiquidTask {
  id: string;
  content: string; // Tên Voucher
  description?: string; // Hướng dẫn sử dụng
  type: TaskType;
  targetRole: 'anh' | 'em' | 'both';
  spicyLevel: 1 | 2 | 3; // 1: Cute/Service, 2: Sensual/Hot, 3: Spicy 18+
  timeOfDay?: TimeOfDay[];
  icon?: any;
}

// ==================== DATA POOLS (VOUCHER COLLECTION) ====================

export const liquidTasksAnh: LiquidTask[] = [
  // ==================== SERVICE & PAMPERING (Level 1) ====================
  // Phục vụ tận răng, chăm sóc, nuông chiều
  {
    id: 'anh_hair_spa',
    content: 'Thợ Sấy Tóc Hoàng Gia',
    description: 'Voucher sấy tóc và chải tóc cho Em sau khi gội đầu. Kèm 5 phút massage da đầu thư giãn.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'night'],
    icon: Sparkles,
  },
  {
    id: 'anh_human_chair',
    content: 'Chiếc Ghế Êm Ái',
    description: 'Anh làm ghế dựa cho Em ngồi/ngả lưng bất cứ đâu (khi chờ xe, chờ đồ ăn, hay xem TV).',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Feather,
  },
  {
    id: 'anh_shoe_prince',
    content: 'Hoàng Tử Xỏ Giày',
    description: 'Quyền được Anh quỳ gối đeo giày, buộc dây giày hoặc tháo giày cho Em mỗi khi ra/vào cửa.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Star,
  },
  {
    id: 'anh_peel_shrimp',
    content: 'Chuyên Gia Bóc Vỏ',
    description: 'Trong bữa ăn này, Anh chịu trách nhiệm bóc tôm, gỡ xương, cắt thịt. Em chỉ việc ăn.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Utensils,
  },
  {
    id: 'anh_bag_carrier',
    content: 'Móc Treo Đồ Di Động',
    description: 'Anh xách túi xách hoặc túi mua sắm cho Em trong suốt buổi đi chơi.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Lock,
  },
  {
    id: 'anh_umbrella',
    content: 'Dù Che Nắng Mưa',
    description: 'Anh chịu trách nhiệm che nắng/mưa, đảm bảo Em không dính một giọt nước hay tia nắng nào.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Umbrella,
  },
  {
    id: 'anh_drink_run',
    content: 'Shipper Trà Sữa',
    description: 'Anh phải đi mua ngay loại nước Em thích (Cafe, Trà sữa, Nước suối) bất kể lúc nào Em khát.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Coffee,
  },
  {
    id: 'anh_morning_alarm',
    content: 'Báo Thức Bằng Môi',
    description: 'Đánh thức Em dậy bằng những nụ hôn nhẹ nhàng lên trán, má và mắt thay vì chuông điện thoại.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning'],
    icon: Heart,
  },
  {
    id: 'anh_foot_massage',
    content: 'Spa Chân Cao Cấp',
    description: 'Massage chân, bóp bắp chân cho Em trong 15 phút để giảm đau mỏi sau khi đi lại.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['night', 'late_night'],
    icon: Hand,
  },
  {
    id: 'anh_photo_dedication',
    content: 'Nhiếp Ảnh Gia Có Tâm',
    description: 'Chụp hình cho Em đến khi nào Em ưng ý mới thôi. Phải lăn xả tìm góc đẹp.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Camera,
  },
  {
    id: 'anh_piggyback',
    content: 'GrabBike Chạy Bằng Cơm',
    description: 'Cõng Em đi một đoạn đường (khi Em kêu mỏi chân hoặc đơn giản là Em thích).',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Smile,
  },
  {
    id: 'anh_bug_fighter',
    content: 'Hiệp Sĩ Diệt Côn Trùng',
    description: 'Đuổi hoặc bắt bất kỳ con bọ/muỗi nào dám bén mảng đến gần Em.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    icon: Zap,
  },

  // ==================== SENSUAL & ROMANCE (Level 2) ====================
  // Lãng mạn, kích thích nhẹ, tiếp xúc cơ thể
  {
    id: 'anh_neck_kiss',
    content: 'Dấu Yêu Trên Cổ',
    description: 'Hôn và cắn nhẹ (hickey) lên cổ hoặc xương quai xanh để đánh dấu chủ quyền.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    icon: Heart,
  },
  {
    id: 'anh_blind_guess',
    content: 'Bịt Mắt Đoán Vật',
    description: 'Anh nhắm mắt/bịt mắt. Em dùng một vật (đá lạnh, cọ trang điểm, ngón tay) chạm vào người Anh. Anh phải đoán đúng.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    icon: Eye,
  },
  {
    id: 'anh_shower_together',
    content: 'Tắm Chung Ướt Át',
    description: 'Mời Em tắm chung. Anh kỳ lưng và gội đầu cho Em một cách tỉ mỉ.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    icon: CloudRain,
  },
  {
    id: 'anh_full_body_massage',
    content: 'Massage Tinh Dầu',
    description: 'Massage toàn thân cho Em với tinh dầu hoặc lotion. Tập trung vào thắt lưng và đùi.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    timeOfDay: ['night', 'late_night'],
    icon: Hand,
  },
  {
    id: 'anh_worship_talk',
    content: 'Lời Đường Mật',
    description: 'Thì thầm vào tai Em những lời khen ngợi hư hỏng và kích thích nhất trong 2 phút.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    icon: Mic,
  },
  {
    id: 'anh_undress',
    content: 'Người Hầu Thay Đồ',
    description: 'Giúp Em cởi trang phục (hoặc đồ lót) một cách chậm rãi và gợi cảm.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    timeOfDay: ['night', 'late_night'],
    icon: Lock,
  },
  {
    id: 'anh_thigh_pillow',
    content: 'Gối Đùi Êm Ái',
    description: 'Em gối đầu lên đùi Anh. Anh vuốt ve khuôn mặt và tóc Em.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 2,
    icon: Moon,
  },

  // ==================== SPICY & WORSHIP (Level 3) ====================
  // 18+, phục vụ nhu cầu sinh lý, tôn thờ
  {
    id: 'anh_oral_worship',
    content: 'Thưởng Thức Mật Ngọt',
    description: 'Dùng lưỡi chăm sóc "cô bé" của Em một cách điêu luyện cho đến khi Em thỏa mãn nhưng không được dùng tay.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Flame,
  },
  {
    id: 'anh_body_worship_kiss',
    content: 'Bản Đồ Nụ Hôn',
    description: 'Hôn dọc cơ thể Em từ ngón chân, bắp đùi lên đến ngực. Không bỏ sót chỗ nào.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Star,
  },
  {
    id: 'anh_breast_care',
    content: 'Chăm Sóc Đôi Gò Bồng Đảo',
    description: 'Massage, hôn và chăm sóc vòng 1 của Em bằng cả tay và miệng thật nhẹ nhàng.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Heart,
  },
  {
    id: 'anh_dom_play',
    content: 'Sự Chiếm Hữu Mạnh Bạo',
    description: ' "Yêu" Em một cách mạnh mẽ, dứt khoát và áp đảo.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Zap,
  },
  {
    id: 'anh_morning_wood',
    content: 'Chào Cờ Buổi Sáng',
    description: 'Dùng "cậu bé" cứng cáp cọ xát vào người Em để đánh thức (nhưng không được cho vào).',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['morning'],
    icon: Sun,
  },
  {
    id: 'anh_toy_play',
    content: 'Trợ Thủ Đắc Lực',
    description: 'Sử dụng tay hoặc dụng cụ hỗ trợ để đưa Em lên đỉnh mà không cần thâm nhập.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Gem,
  }
];

export const liquidRewardsEm: LiquidTask[] = [
  // ==================== QUEEN'S COMMANDS (Level 1) ====================
  // Quyền lực tối thượng, ra lệnh
  {
    id: 'em_silence_order',
    content: 'Lệnh Im Lặng',
    description: 'Bắt Anh im lặng hoàn toàn trong 10 phút. Chỉ được gật hoặc lắc đầu khi được hỏi.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: MessageCircle,
  },
  {
    id: 'em_freeze_order',
    content: 'Lệnh Đứng Im',
    description: 'Anh phải đứng/ngồi/nằm im như tượng trong 2 phút. Em có thể làm gì trêu chọc tùy thích, Anh không được cử động.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Lock,
  },
  {
    id: 'em_lazy_queen',
    content: 'Nữ Hoàng Lười Biếng',
    description: 'Trong 30 phút tới, Anh phải làm mọi việc vặt: Lấy nước, sạc pin, tắt đèn, tìm đồ... Em chỉ việc nằm.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Crown,
  },
  {
    id: 'em_buy_gift',
    content: 'Thuế Cống Nạp',
    description: 'Buộc Anh phải mua tặng Em một món quà nhỏ hoặc đồ ăn vặt (dưới 100k) ngay lập tức.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Gift,
  },
  {
    id: 'em_music_boss',
    content: 'DJ Độc Quyền',
    description: 'Em toàn quyền chọn nhạc. Anh không được đổi bài.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Music,
  },
  {
    id: 'em_skip_card',
    content: 'Thẻ Bài Miễn Tử',
    description: 'Xóa sạch mọi lỗi lầm, dỗi hờn hoặc hình phạt mà Anh định áp dụng cho Em.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Star,
  },
  {
    id: 'em_truth_card',
    content: 'Thuốc Nói Thật',
    description: 'Hỏi Anh một câu bất kỳ (kể cả chuyện cũ/nhạy cảm). Anh bắt buộc phải trả lời thật lòng 100%.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Eye,
  },

  // ==================== SENSUAL CONTROL (Level 2) ====================
  // Kiểm soát kích thích, trêu chọc
  {
    id: 'em_strip_show',
    content: 'Khán Giả Độc Nhất',
    description: 'Yêu cầu Anh cởi trần đi lại trong phòng để Em ngắm.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 2,
    timeOfDay: ['night', 'late_night'],
    icon: Eye,
  },
  {
    id: 'em_touch_ban',
    content: 'Cấm Chạm',
    description: 'Anh được phép kích thích Em nhưng TUYỆT ĐỐI KHÔNG được chạm tay vào "vùng cấm" cho đến khi Em cho phép.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 2,
    timeOfDay: ['late_night'],
    icon: Lock,
  },
  {
    id: 'em_sexy_pose',
    content: 'Mẫu Ảnh Riêng',
    description: 'Anh và Em chụp ảnh (chỉ chụp lưu hành nội bộ).',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 2,
    icon: Camera,
  },
  {
    id: 'em_kiss_me',
    content: 'Nụ Hôn Theo Lệnh',
    description: 'Chỉ tay vào đâu, Anh phải hôn vào đó ngay lập tức (má, môi, cổ, tay...).',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 2,
    icon: Heart,
  },
  {
    id: 'em_face_seat',
    content: 'Ghế Ngồi 37 Độ',
    description: 'Yêu cầu Anh nằm xuống để Em ngồi lên mặt. Anh có thể dùng lưỡi để phục vụ.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 2,
    timeOfDay: ['late_night'],
    icon: Smile,
  },

  // ==================== SPICY FINISH (Level 3) ====================
  // Kiểm soát khoái cảm, quyết định kết thúc
  {
    id: 'em_finish_chest',
    content: 'Tác Phẩm Trên Ngực',
    description: 'Trong lần này: Anh "xả lũ" lên ngực Em. Em muốn nhìn thấy dòng thác của Anh.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: CloudRain,
  },
  {
    id: 'em_finish_mouth',
    content: 'Bữa Ăn Đêm',
    description: 'Trong lần này: Anh "xả lũ" vào miệng Em. Em sẽ đón nhận tất cả tinh hoa của Anh.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Utensils,
  },
  {
    id: 'em_edging',
    content: 'Đèn Xanh Đèn Đỏ',
    description: 'Em kiểm soát việc "về đích" của Anh. Khi Em hô "Dừng", Anh phải dừng ngay lập tức, cấm được ra.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Zap,
  },
  {
    id: 'em_morning_bj',
    content: 'Đánh Thức "Cậu Bé"',
    description: 'Yêu cầu Anh nằm yên, Em sẽ dùng miệng để đánh thức "cậu bé" chào buổi sáng.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['morning'],
    icon: Flame,
  },
  {
    id: 'em_cowgirl',
    content: 'Nữ Kỵ Sĩ',
    description: 'Trong lần này: Em là người cầm cương (Cowgirl). Anh nằm yên hưởng thụ, tốc độ và độ sâu do Em quyết định.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Crown,
  },
  {
    id: 'em_hand_job',
    content: 'Tự Phục Vụ',
    description: 'Bắt Anh tự dùng tay "xử lý" trước mặt Em để Em ngắm nhìn biểu cảm của Anh.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Hand,
  }
];
