import { LucideIcon, Heart, Hand, MessageCircle, Mic, Star, Sparkles, Feather, Lock, Coffee, Camera, Music, Gift, Moon, Sun, CloudRain, Utensils, Smile } from 'lucide-react';

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
  content: string;
  description?: string;
  type: TaskType;
  targetRole: 'anh' | 'em' | 'both';
  spicyLevel: 1 | 2 | 3; // 1: Cute, 2: Hot, 3: Spicy (18+)
  timeOfDay?: TimeOfDay[];
  icon?: any;
}

// ==================== DATA POOLS (EXPANDED) ====================

export const liquidTasksAnh: LiquidTask[] = [
  // --- MORNING (Chào buổi sáng & Cafe) ---
  {
    id: 'anh_morning_coffee',
    content: 'Barista Tình Yêu',
    description: 'Pha/Mua cho em một cốc nước ấm hoặc cafe ngay lập tức. Phục vụ tận giường.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning'],
    icon: Coffee,
  },
  {
    id: 'anh_hair_dry',
    content: 'Thợ sấy tóc hoàng gia',
    description: 'Sấy tóc cho em thật khô và tạo kiểu nhẹ nhàng. Cấm làm rối tóc!',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'night'],
    icon: Sparkles,
  },
  {
    id: 'anh_shoe_tier',
    content: 'Cinderella Moment',
    description: 'Đeo giày/buộc dây giày cho em. Quỳ một chân xuống như hoàng tử.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'afternoon'],
    icon: Sparkles,
  },
  {
    id: 'anh_morning_kiss',
    content: 'Nụ hôn đánh thức',
    description: 'Hôn nhẹ lên mắt, mũi, môi để đánh thức công chúa. Không được dùng chuông báo thức.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning'],
    icon: Heart,
  },

  // --- AFTERNOON (Vận động & Chăm sóc) ---
  {
    id: 'anh_photo_slave',
    content: 'Nhiếp ảnh gia có tâm',
    description: 'Chụp cho em 10 tấm ảnh ở góc độ này. Phải lăn xả (nằm, ngồi) để có ảnh đẹp.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'afternoon'],
    icon: Camera,
  },
  {
    id: 'anh_carry_bag',
    content: 'Human Backpack',
    description: 'Cầm túi xách cho em trong suốt 30 phút tiếp theo. Không được kêu ca.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'afternoon'],
    icon: Lock,
  },
  {
    id: 'anh_sunshade',
    content: 'Cây dù di động',
    description: 'Che nắng/che mưa cho em bằng bất cứ thứ gì có thể (áo khoác, tay, ô).',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['morning', 'afternoon'],
    icon: Sun,
  },
  {
    id: 'anh_piggyback_ride',
    content: 'GrabBike 0 đồng',
    description: 'Cõng em đi một đoạn đường dốc hoặc cầu thang.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['afternoon', 'night'],
    icon: Smile,
  },
  {
    id: 'anh_buy_snack',
    content: 'Shipper Đồ Ăn Vặt',
    description: 'Chạy đi mua ngay món ăn vặt mà em đang thèm (xúc xích, hạt dẻ, nước ngọt).',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['afternoon', 'night'],
    icon: Utensils,
  },

  // --- NIGHT (Lãng mạn & Chill) ---
  {
    id: 'anh_massage_foot',
    content: 'Spa Chân VIP',
    description: 'Ngâm chân và massage chân cho em trong 15 phút. Bấm huyệt gan bàn chân.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 2,
    timeOfDay: ['night', 'late_night'],
    icon: Hand,
  },
  {
    id: 'anh_peel_fruit',
    content: 'Bóc tôm/Gọt vỏ',
    description: 'Bóc vỏ tôm, gọt hoa quả, tách hạt. Em chỉ việc há miệng ăn.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['night'],
    icon: Utensils,
  },
  {
    id: 'anh_sing_song',
    content: 'Ca sĩ bất đắc dĩ',
    description: 'Hát (hoặc rap) một bài tặng em. Phải nhìn vào mắt em khi hát.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['night'],
    icon: Music,
  },
  {
    id: 'anh_tell_joke',
    content: 'Joker Sapa',
    description: 'Kể chuyện cười cho đến khi nào em cười thành tiếng mới được dừng.',
    type: 'dare',
    targetRole: 'anh',
    spicyLevel: 1,
    timeOfDay: ['afternoon', 'night'],
    icon: Smile,
  },

  // --- LATE NIGHT (Spicy & 18+) ---
  {
    id: 'anh_kiss_everywhere',
    content: 'Bản đồ nụ hôn',
    description: 'Hôn lên 5 vị trí khác nhau trên cơ thể em (trừ môi).',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    timeOfDay: ['late_night'],
    icon: Heart,
  },
  {
    id: 'anh_blindfold_touch',
    content: 'Đoán vật thể',
    description: 'Em dùng một vật (đá lạnh, lông vũ, ngón tay) chạm vào người anh. Anh phải đoán là gì.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 2,
    timeOfDay: ['late_night'],
    icon: Star,
  },
  {
    id: 'anh_worship_body',
    content: 'Tôn thờ cơ thể',
    description: 'Dành 5 phút chỉ để ngắm và khen ngợi cơ thể em (bằng lời nói hoặc hành động).',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Sparkles,
  },
  {
    id: 'anh_ice_play',
    content: 'Thử thách Đá lạnh',
    description: 'Ngậm một viên đá lạnh và hôn dọc sống lưng em.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: CloudRain,
  },
  {
    id: 'anh_sensual_massage',
    content: 'Massage Dầu Nóng',
    description: 'Massage toàn thân với tinh dầu. Tập trung vào các vùng nhạy cảm (đùi non, cổ).',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Hand,
  },
  {
    id: 'anh_handcuff_role',
    content: 'Tù nhân tình yêu',
    description: 'Giả vờ bị trói tay (hoặc dùng cà vạt trói nhẹ). Em làm gì cũng phải chịu.',
    type: 'spicy',
    targetRole: 'anh',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Lock,
  }
];

export const liquidRewardsEm: LiquidTask[] = [
  // --- QUYỀN LỰC (Dùng bất cứ lúc nào) ---
  {
    id: 'em_skip_card',
    content: 'Thẻ Bài Miễn Tử',
    description: 'Bỏ qua bất kỳ lỗi lầm nào của em. Anh không được giận.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Star,
  },
  {
    id: 'em_silence_king',
    content: 'Vua Im Lặng',
    description: 'Yêu cầu anh im lặng trong 10 phút. Chỉ được gật hoặc lắc.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: MessageCircle,
  },
  {
    id: 'em_buy_ticket',
    content: 'Vé Đặc Quyền',
    description: 'Anh phải mua cho em một món quà nhỏ (dưới 200k) ngay bây giờ.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    timeOfDay: ['morning', 'afternoon'],
    icon: Gift,
  },
  {
    id: 'em_choose_music',
    content: 'DJ Quyền Lực',
    description: 'Được quyền chọn nhạc trong suốt chuyến đi xe/nghỉ ngơi hôm nay.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    icon: Music,
  },
  
  // --- HƯỞNG THỤ (Tối/Đêm) ---
  {
    id: 'em_lazy_mode',
    content: 'Chế Độ Lười Biếng',
    description: 'Trong 1 tiếng tới, anh phải làm tất cả mọi việc (lấy nước, sạc đt, tắt đèn). Em chỉ nằm.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 2,
    timeOfDay: ['night'],
    icon: Moon,
  },
  {
    id: 'em_truth_serum',
    content: 'Thuốc Nói Thật',
    description: 'Được hỏi anh 1 câu hỏi nhạy cảm. Anh bắt buộc phải trả lời thật lòng.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 2,
    timeOfDay: ['night', 'late_night'],
    icon: MessageCircle,
  },
  {
    id: 'em_kinky_queen',
    content: 'Nữ Hoàng Bóng Đêm',
    description: 'Ra lệnh cho anh thực hiện một tư thế do em chọn đêm nay.',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Star,
  },
  {
    id: 'em_finish_control',
    content: 'Người Kiểm Soát',
    description: 'Quyết định khi nào anh được "về đích" (hoặc không).',
    type: 'spicy',
    targetRole: 'em',
    spicyLevel: 3,
    timeOfDay: ['late_night'],
    icon: Lock,
  },
  {
    id: 'em_scratch_back',
    content: 'Gãi lưng phục vụ',
    description: 'Anh gãi lưng/xoa đầu cho em đến khi em ngủ mới được thôi.',
    type: 'reward',
    targetRole: 'em',
    spicyLevel: 1,
    timeOfDay: ['night'],
    icon: Hand,
  }
];
