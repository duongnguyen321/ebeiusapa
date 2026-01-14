import type { BudgetItem } from '@/contexts/BudgetContext';

/**
 * Budget data aligned with:
 * - docs/plan.md (Section: BẢNG TỔNG HỢP CHI PHÍ)
 * - src/data/itinerary.ts (Timeline activities)
 * 
 * Target: ~3,000,000 VNĐ for activities (excluding pre-paid items)
 */
export const anhDefaultItems: Omit<BudgetItem, "id" | "createdAt">[] = [
  // ==================== PRE-PAID (Đã thanh toán) ====================
  {
    title: "Chill With Home Sapa (3 Đêm)",
    category: "stay",
    estimatedAmount: 1_742_500,
    actualAmount: 1_742_500,
    isPaid: true,
    isActive: true,
    day: 0,
  },
  {
    title: "Xe Hanoi - Sapa (Khứ hồi)",
    category: "transport",
    estimatedAmount: 1_500_000,
    actualAmount: 1_500_000,
    isPaid: true,
    isActive: true,
    day: 0,
  },

  // ==================== DAY 1 (15/01) - HIBERNATION ====================
  // Ref: itinerary.ts Day 1, plan.md "Ngày 1"
  {
    title: "Bữa tối: Lẩu Gà/BBQ tại Homestay",
    category: "food",
    estimatedAmount: 400_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 1,
  },

  // ==================== DAY 2 (16/01) - SINH NHẬT ====================
  // Ref: itinerary.ts Day 2, plan.md "Ngày 2"
  {
    title: "Taxi: Homestay -> Trung tâm (Sáng)",
    category: "transport",
    estimatedAmount: 80_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Ăn trưa: Cốn Sủi Ông Há (2 bát + sủi cảo)",
    category: "food",
    estimatedAmount: 120_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Cafe ngắm phố (Cộng/Viettrekking)",
    category: "food",
    estimatedAmount: 100_000, // Adjusted - plan.md noted as "dự phòng"
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Bánh sinh nhật Bento (Tiệm Chị Híp + Ship)",
    category: "food",
    estimatedAmount: 200_000, // plan.md: 180k-200k
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Spa: Tắm lá thuốc Dao's Center (2 người)",
    category: "other",
    estimatedAmount: 500_000, // plan.md: 200k-250k/người x 2
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Đồ ăn Chợ Đêm (Cơm lam, Thịt nướng, Trâu gác bếp)",
    category: "food",
    estimatedAmount: 250_000, // plan.md: ~250k
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },
  {
    title: "Taxi: Trung tâm -> Homestay (Tối)",
    category: "transport",
    estimatedAmount: 80_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 2,
  },

  // ==================== DAY 3 (17/01) - VINTAGE WALK ====================
  // Ref: itinerary.ts Day 3, plan.md "Ngày 3"
  {
    title: "Taxi: Homestay -> Cổng Núi Hàm Rồng",
    category: "transport",
    estimatedAmount: 80_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Vé tham quan: Núi Hàm Rồng (2 người)",
    category: "ticket",
    estimatedAmount: 140_000, // plan.md: 70k/người x 2
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Taxi: Hàm Rồng -> Moana Sapa",
    category: "transport",
    estimatedAmount: 50_000, // Cách 1km
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Vé tham quan: Moana Sapa (2 người)",
    category: "ticket",
    estimatedAmount: 160_000, // plan.md: 80k/người x 2
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Taxi: Thị trấn -> Homestay (Sau ăn tối)",
    category: "transport",
    estimatedAmount: 80_000,
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },
  {
    title: "Bữa tối: Lẩu Cá Tầm/Thắng Cố A Quỳnh",
    category: "food",
    estimatedAmount: 700_000, // plan.md: 600k-700k (bữa sang nhất)
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 3,
  },

  // ==================== DAY 4 (18/01) - TẠM BIỆT ====================
  // Ref: itinerary.ts Day 4, plan.md "Ngày 4"
  {
    title: "Ăn sáng nhẹ/Cafe chia tay",
    category: "food",
    estimatedAmount: 150_000, // plan.md: dự phòng ăn sáng/cafe
    actualAmount: 0,
    isPaid: false,
    isActive: true,
    day: 4,
  },
];

/**
 * Budget Summary (aligned with plan.md BẢNG TỔNG HỢP CHI PHÍ):
 * 
 * === PRE-PAID ===
 * - Homestay:          1,742,500 VNĐ
 * - Xe khứ hồi:        1,500,000 VNĐ
 * - Subtotal:          3,242,500 VNĐ
 * 
 * === ACTIVITIES ===
 * - Di chuyển (Taxi):    370,000 VNĐ (plan: 500k - adjusted)
 * - Vé tham quan:        300,000 VNĐ (Hàm Rồng + Moana)
 * - Spa:                 500,000 VNĐ
 * - Sinh nhật:           450,000 VNĐ (Bánh 200k + Chợ đêm 250k)
 * - Ăn uống Day 1:       400,000 VNĐ (BBQ Homestay)
 * - Ăn uống Day 2:       220,000 VNĐ (Cốn sủi + Cafe)
 * - Ăn uống Day 3:       700,000 VNĐ (Cá Tầm/Thắng Cố)
 * - Dự phòng Day 4:      150,000 VNĐ
 * - Subtotal:         ~3,090,000 VNĐ
 * 
 * === GRAND TOTAL ===
 * ~6,332,500 VNĐ (Trong ngân sách mục tiêu 6-7 triệu)
 */
