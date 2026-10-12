import type { BudgetItem } from '@/contexts/BudgetContext';

export const MASTER_TRIP_BUDGET = 22_800_000;
export const PREPARATION_BUDGET = 500_000;

/**
 * Budget data aligned with "Lịch trình đi 6 ngày 5 đêm Sapa - Lào Cai - Hà Khẩu":
 * - Chỗ ở (5 đêm): 8.600.000 VNĐ
 * - Vé xe liên tỉnh: 1.900.000 VNĐ
 * - Taxi nội thành (100% taxi): 1.400.000 VNĐ
 * - Thủ tục Hà Khẩu: 700.000 VNĐ
 * - Vé tham quan & Vui chơi: 4.950.000 VNĐ
 * - Ăn uống (6 ngày 5 đêm): 4.350.000 VNĐ
 * - Mua sắm & Quà mang về: 900.000 VNĐ
 * 
 * Tổng cộng chi phí đi chơi: 22.800.000 VNĐ (~11.400.000 VNĐ / người)
 * Chuẩn bị trước: 500.000 VNĐ (Thuốc men, đồ lặt vặt)
 */
export const anhDefaultItems: Omit<BudgetItem, "id" | "createdAt">[] = [
  // ==================== 1. CHUẨN BỊ TRƯỚC (TÁCH RIÊNG) ====================
  {
    title: "Thuốc men, miếng dán nhiệt, kem nẻ & đồ lặt vặt",
    category: "other",
    estimatedAmount: 500_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 0,
  },

  // ==================== 2. CHỖ Ở (5 ĐÊM) ====================
  {
    title: "Khách sạn Sapa (4 đêm tiêu chuẩn 2 người)",
    category: "stay",
    estimatedAmount: 8_000_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 1,
  },
  {
    title: "Căn hộ / Khách sạn nghỉ dưỡng Hà Khẩu (1 đêm)",
    category: "stay",
    estimatedAmount: 600_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 5,
  },

  // ==================== 3. DI CHUYỂN LIÊN TỈNH (VÉ XE KHÁCH) ====================
  {
    title: "Vé xe Hà Nội - Sapa (07:00, cabin đôi 2 người)",
    category: "transport",
    estimatedAmount: 750_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 1,
  },
  {
    title: "Vé xe khách Sapa - Lào Cai (2 người)",
    category: "transport",
    estimatedAmount: 400_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 5,
  },
  {
    title: "Vé xe khách Lào Cai - Hà Nội (2 người)",
    category: "transport",
    estimatedAmount: 750_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 6,
  },

  // ==================== 4. DI CHUYỂN NỘI THÀNH (100% TAXI) ====================
  {
    title: "Taxi di chuyển tại Sapa (4 ngày)",
    category: "transport",
    estimatedAmount: 1_200_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 1,
  },
  {
    title: "Taxi Lào Cai - Cửa khẩu (khứ hồi Ngày 5 & Ngày 6)",
    category: "transport",
    estimatedAmount: 200_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 5,
  },

  // ==================== 5. THỦ TỤC HÀ KHẨU ====================
  {
    title: "Sổ thông hành Trung Quốc (2 người)",
    category: "other",
    estimatedAmount: 700_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 5,
  },

  // ==================== 6. VÉ THAM QUAN & TRẢI NGHIỆM ====================
  {
    title: "Combo Sun World Fansipan (Cáp treo + Buffet + Tàu hỏa - 2 người)",
    category: "ticket",
    estimatedAmount: 2_500_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Mật Pet - Vé vào chơi thú (2 người)",
    category: "ticket",
    estimatedAmount: 200_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Tàu hỏa trượt núi (Vé 400k + tiền ảnh in lấy ngay 100k - 2 người)",
    category: "ticket",
    estimatedAmount: 500_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Bản Cát Cát (Vé vào cổng 300k + thuê váy phụ kiện 300k - 2 người)",
    category: "ticket",
    estimatedAmount: 600_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Ngâm lá thuốc Dao Đỏ + Gội đầu thư giãn (2 người)",
    category: "ticket",
    estimatedAmount: 500_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Pháo hoa đón giao thừa ấm áp",
    category: "ticket",
    estimatedAmount: 200_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Cầu kính Rồng Mây (2 người)",
    category: "ticket",
    estimatedAmount: 300_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 4,
  },
  {
    title: "Núi Hàm Rồng (2 người)",
    category: "ticket",
    estimatedAmount: 150_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 4,
  },

  // ==================== 7. ĂN UỐNG (6 NGÀY 5 ĐÊM) ====================
  {
    title: "Ngày 1: Lẩu Thắng Cố (500k) + Ăn vặt dạo phố đêm (150k)",
    category: "food",
    estimatedAmount: 650_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 1,
  },
  {
    title: "Ngày 2: Ăn tối nhà hàng (450k) + Ăn vặt chợ đêm (200k)",
    category: "food",
    estimatedAmount: 650_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Ngày 3: Trưa bún rau Cát Cát (150k) + Tối lẩu Cá Hồi/Cá Tầm (750k) + Chợ đêm (150k)",
    category: "food",
    estimatedAmount: 1_050_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Ngày 4: Cafe săn mây view đẹp (150k) + Tối đồ nướng Sapa (550k) + Chợ đêm (100k)",
    category: "food",
    estimatedAmount: 800_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 4,
  },
  {
    title: "Ngày 5: Trưa Sapa (200k) + Cafe Lào Cai (100k) + Tối lẩu/chợ đêm Hà Khẩu (550k)",
    category: "food",
    estimatedAmount: 850_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 5,
  },
  {
    title: "Ngày 6: Ăn vặt trưa Hà Khẩu + Ăn chiều tại Lào Cai chờ xe",
    category: "food",
    estimatedAmount: 350_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 6,
  },

  // ==================== 8. MUA SẮM & QUÀ TẶNG ====================
  {
    title: "Đồ lưu niệm chợ Sapa + Đồ kỳ lưng",
    category: "shopping",
    estimatedAmount: 300_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 4,
  },
  {
    title: "Đồ ăn vặt Trung Quốc mua về + Quà bạn bè (~170 tệ)",
    category: "shopping",
    estimatedAmount: 600_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 6,
  },
];
