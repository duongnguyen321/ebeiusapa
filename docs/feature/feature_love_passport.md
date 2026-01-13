# Feature Documentation: Sapa Love Compass (Passport)

> **Core Philosophy:** "Low Tech - High Touch".
> Because Sapa has weak signal and no Backend, this feature operates **100% Offline**. The connection between two people is not via Server but via **Physical Interaction** (Speech, Eye contact, Action).

## 1. Architecture: Offline & Manual Sync

Instead of GPS or Server, we use a **"Verbal Sync"** mechanism.

- **Role Setup:**

  - Device A selects: **I am "Anh"** (Theme: _Cloud Blue_).
  - Device B selects: **I am "Em"** (Theme: _Misty Pink_).
  - Save to `localStorage`.

- **"Cross-Unlock" Logic (The Love Protocol):**
  - **Step 1:** "Anh" receives a mission (e.g., Buy Ginger Tea).
  - **Step 2:** "Anh" completes it -> App shows **4-Digit Code** (e.g., `1601`).
  - **Step 3:** "Anh" reads the code to "Em".
  - **Step 4:** "Em" enters the code on her device -> Unlocks reward/message.
  - _Meaning:_ Forces the couple to communicate and look at each other, rather than just staring at screens.

---

## 2. Expanded Game Content (Daily Storyline)

*Based on Master Plan (docs/plan.md) & Itinerary Data (src/data/itinerary.ts)*

### **DAY 1 (15/01): THE RECOVERY (Phục Hồi)**
*Theme: Mưa phùn & Sương mù. Goal: Giữ sức & Làm quen.*

| Time | Role "Anh" (Guardian) | Role "Em" (Princess) | Interaction (Sync) |
| :--- | :--- | :--- | :--- |
| **14:00**<br>(Arrival) | **Mission:** "Safe Landing"<br>Gọi Taxi ngay (0214 363 63 63). Tuyệt đối không để Em xách nặng. | **Status:** "Dizzy Mode"<br>Em được quyền nhõng nhẽo. Không cần làm gì cả. | Anh xách đồ lên xe -> Nhập code `ARRIVED` -> Mở khóa "Chế độ công chúa". |
| **14:30**<br>(Check-in) | **Quest:** "Ginger Hero"<br>Xin lễ tân Sapa House 1 cốc trà gừng nóng ngay khi nhận phòng. | **Comfort:** "Warm Hug"<br>Uống trà và ôm Anh để hồi phục tiền đình. | Anh mang trà -> Nhập code `WARM` -> Em nhận thẻ "Phiếu Bé Ngoan". |
| **15:00**<br>(Nap) | **Action:** "Human Heater"<br>Làm túi sưởi 37 độ cho Em ngủ. Không làm ồn. | **Rest:** "Recovery Sleep"<br>Ngủ một giấc thật sâu để lại sức. | Không cần sync. Tận hưởng sự yên tĩnh. |
| **18:30**<br>(Dinner) | **Quest:** "The Cốn Sủi Hunter"<br>Đến quán Ông Há (436 ĐBP). Order bát Cốn Sủi nóng hổi, *không cay*. | **Trivia:** "Đố Em biết 'Cốn Sủi' nghĩa là gì?"<br>(A. Phở khan / B. Mì nước). | Em ăn xong -> Anh tick "Đã ăn" -> Hiện code `YUMMY` -> Mở khóa "Năng lượng phục hồi". |
| **20:00**<br>(Walk) | **Quest:** "Foggy Knight"<br>Dắt tay Em đi dạo quanh Nhà Thờ Đá. Che ô cho Em nếu mưa. | **Photo Op:** "Moody Vibes"<br>Chụp ảnh dưới ánh đèn vàng mờ ảo của quảng trường. | Check-in tại Nhà Thờ -> Anh chụp ảnh -> Nhập code `FOGGY` -> Mở khóa Quest ngày mai. |
| **21:30**<br>(Night) | **Action:** "Bed Warmer"<br>Bật đệm điện trước 15p. Chuẩn bị nước ấm đánh răng cho Em. | **Mood:** "Rainy Lullaby"<br>Mở tab "Âm thanh mưa" trong app. | Anh bật đệm xong -> Bấm "Good Night" -> Em nhận thông báo "Chúc bé ngủ ngon". |

### **DAY 2 (16/01): THE BIRTHDAY (Tỏa Sáng)**
*Theme: Sinh nhật & Lãng mạn. Goal: Nuông chiều cảm xúc.*

| Time | Role "Anh" (Planner) | Role "Em" (Muse) | Interaction (Sync) |
| :--- | :--- | :--- | :--- |
| **10:00**<br>(Morning) | **Secret Mission:** "The Sneaky Cake"<br>Gọi điện confirm lại bánh với tiệm Chị Híp (14 Thác Bạc) lúc Em đang ngủ/tắm. | **Status:** "Sleeping Beauty"<br>Em ngủ nướng thỏa thích. Khi nào dậy thì make-up thật xinh đẹp. | Anh confirm xong -> Đọc code `CAKE` -> Máy Em hiện pop-up: "Chuẩn bị xinh đẹp đi!" |
| **13:00**<br>(Lunch) | **Quest:** "Cốn Sủi Hunter"<br>Đưa Em đi ăn Cốn Sủi Ông Há (591 ĐBP). Gọi thêm sủi cảo chiên. | **Quest:** "Foodie Gram"<br>Thưởng thức đặc sản và chụp ảnh lưu niệm món ăn lạ này. | Ăn xong -> Nhập mã `YUMMY` -> Mở khóa "Voucher Bj Thượng Hạng" / "Quyền Bón Ăn". |
| **14:00**<br>(Photo) | **Quest:** "Cameraman"<br>Chụp cháy máy cho Em tại Sun Plaza & Nhà thờ đá. Lăn xả, nằm đất chụp góc rộng. | **Model:** "Paris Vibes"<br>Diễn sâu tại trời Âu (fake). Mặc váy len body sang chảnh. | Chụp ảnh xong -> Nhập code `PARIS` -> Mở khóa "Voucher Khám Phá". |
| **17:30**<br>(Spa) | **Mission:** "Red Dao Healer"<br>Đến Dao's Center. Đảm bảo Em được ngâm bồn thoải mái nhất. | **Sensory:** "Herbal Immersion"<br>Ngâm lá thuốc Dao Đỏ thư giãn. Tắt điện thoại, tận hưởng mùi thảo mộc. | Anh thanh toán -> Nhập code `RELAX` -> Mở khóa "Voucher La Hét" / "Spa Tình Yêu". |
| **21:00**<br>(Party) | **Event:** "Make a Wish"<br>Bất ngờ!! Tổ chức Tiệc sinh nhật tại phòng. Bánh kem, nến, nhạc. | **Action:** "Blow the Candles"<br>Thổi nến và ước. Mở quà của Anh. | Em thổi nến -> Nhập code `WISH` -> Mở khóa "Show Thoát Y" / "Ghế Người". |

### **DAY 3 (17/01): THE ADVENTURE (Khám Phá)**
*Theme: Nắng đẹp & Ảnh đẹp. Goal: Săn mây & Văn hóa.*

| Time | Role "Anh" (Sherpa) | Role "Em" (Model) | Interaction (Sync) |
| :--- | :--- | :--- | :--- |
| **13:00**<br>(Hàm Rồng) | **Guide:** "Sherpa Lead"<br>Dẫn đường lên Vườn Lan 1 -> Sân Mây (đỉnh cao nhất). Đỡ Em những đoạn dốc. | **Pose:** "High Fashion"<br>Leo núi nhưng vẫn phải xinh. Lên Sân Mây ngắm toàn cảnh thị trấn. | Anh chụp ảnh -> Nhập code `PEAK` -> Mở khóa "Voucher Nuốt Trọn" / "Triển Lãm Kín". |
| **15:15**<br>(Moana) | **Assistant:** "Living Prop"<br>Cầm đồ cho Em thay. Hạ thấp máy sát mặt nước chụp ảnh. | **Star:** "Infinity Pool"<br>Tạo dáng bên hồ vô cực, tượng cô gái. | Chụp xong -> Nhập code `MOANA` -> Mở khóa "Voucher Gối Đầu". |
| **17:00**<br>(Walk) | **Partner:** "Hand in Hand"<br>Đi bộ xuôi dốc từ Moana về Homestay. | **Dreamer:** "Sunset Walk"<br>Tản bộ ngắm cảnh thung lũng hoàng hôn. | Về đến nơi -> Nhập code `WALK` -> Mở khóa "Voucher Public". |
| **20:00**<br>(Dinner) | **VIP:** "Sturgeon King"<br>Ăn tối Lẩu Cá Tầm/Thắng Cố tại A Quỳnh. | **Gourmet:** "Sapa Feast"<br>Ăn sập Sapa. Thử món Thắng Cố (nếu dám). | Ăn xong -> Nhập code `FEAST` -> Mở khóa "Quyền Xâm Nhập" / "Tiệc Nyotaimori". |

### **DAY 4 (18/01): THE FAREWELL (Lưu Luyến)**
*Theme: Nắng nhẹ. Goal: Tạm biệt & Hẹn gặp lại.*

| Time | Role "Anh" (Porter) | Role "Em" (Accountant) | Interaction (Sync) |
| :--- | :--- | :--- | :--- |
| **08:00**<br>(Packing) | **Check:** "Luggage Master"<br>Rà soát gầm giường, nhà tắm, tủ quần áo (Sạc, Mĩ phẩm, Quần áo). | **Review:** "Souvenir Check"<br>Đã đóng gói kỹ rượu/đồ dễ vỡ chưa? | Anh check xong -> Bấm "All Clear" -> Em confirm. |
| **10:00**<br>(View) | **Quest:** "Cloud Coffee"<br>Tại Viettrekking (33 Hoàng Liên): Tìm view thấy tàu hỏa leo núi Mường Hoa. | **Reflection:** "Love Letter"<br>Viết 3 điều thích nhất chuyến đi này vào App. | Viết xong -> Đưa máy cho nhau đọc lời nhắn bí mật. |
| **12:00**<br>(Checkout) | **Action:** "Bill Settler"<br>Thanh toán tiền phòng và các chi phí phát sinh. | **Confirm:** "Ready to Go"<br>Check-out xong xuôi. Tạm biệt Sapa House. | Hai máy cùng bấm `HOME` -> Kết thúc hành trình Passport -> App hiện Video Recap (nếu có). |
| **13:30**<br>(Departure) | **Last Mission:** "Safe Return"<br>Lên xe Hà Sơn Hải Vân. Ổn định chỗ nằm. | **Rest:** "Dreamy Road"<br>Ngủ bù để về Hà Nội tươi tắn. | Xe chạy -> App gửi thông báo: "Hẹn gặp lại Sapa". |

---

## 3. Tech Specs Update (Webapp Optimized)

### 3.1. Local Storage Schema

No Database. Data resides completely in the browser.

```typescript
// Key: 'sapa_passport_data_v1'
interface PassportState {
  role: "anh" | "em" | null;
  unlockedStamps: string[]; // ['stamp_church', 'stamp_spa']
  completedQuests: string[]; // ['day1_tea', 'day2_cake']
  memories: {
    id: string;
    note: string; // User inputs text
    rating?: number;
    timestamp: number;
  }[];
  // Config
  theme: "pink" | "blue";
}
```

### 3.2. Detailed Components & Flows (Mobile First)

#### **A. Role Selector (Onboarding)**
*The Gateway: Where the users choose their identity for the trip.*

- **Component Path:** `src/components/RoleSelector.tsx` (New)
- **Reference Component:** `src/components/IntroView.tsx` (for layout & entrance animations).
- **Feature Flow:**
  1.  User opens the Feature Passport (first time).
  2.  Screen displays two large, beautiful cards: "Anh" (Blue Theme) and "Em" (Pink Theme).
  3.  User taps a card.
  4.  App saves the choice to generic storage.
  5.  App redirects to the main **Dashboard**.
- **Component Flow:**
  - **Mount:** Check `useLocalStorage('sapa_passport_role')`. If exists, redirect to Dashboard.
  - **Render:** Two `motion.div` cards (styled like `DayCard.tsx` glassmorphism).
  - **Action:** `onClick` -> `setRole('anh' | 'em')` -> `onComplete()` callback to switch view.

#### **B. Dashboard (The Compass)**
*The Main Hub: Visualizing time and current mission.*

- **Component Path:** `src/components/PassportDashboard.tsx` (New)
- **Reference Component:** `src/components/TimelineView.tsx` (structure) & `src/components/TripHeader.tsx` (header style).
- **Data Source:** `src/data/itinerary.ts` (primary timeline data).
- **Feature Flow:**
  1.  **Header:** Shows current Date, simulated Weather, and greeting based on Role.
  2.  **Timeline:** Vertical scrolling list of time slots (derived from `itinerary.ts`).
  3.  **Active State:** The time slot corresponding to the current time is highlighted (Glowing/Pulsing).
  4.  **Interaction:** User taps a time slot -> Opens **Quest Modal** for that specific activity.
- **Component Flow:**
  - **State:** `[currentTime, setCurrentTime]` (updates every minute).
  - **Logic:** `isCurrentSlot(slotTime)` helper to determine active style.
  - **Render:** Iterate through `itinerary` -> Render modified `TimelineItem.tsx` components.

#### **C. Quest Modal (The Game - Verbal Sync)**
*The Core Interaction: Manual synchronization via "Love Protocol".*

- **Component Path:** `src/components/QuestModal.tsx` (New)
- **Reference Component:** `src/components/VoucherRedeemModal.tsx` (Input & Success Logic).
- **Effect Reference:** `src/components/BirthdayCelebration.tsx` (Confetti `triggerCelebration`).
- **Feature Flow:**
  1.  User clicks a Timeline Item.
  2.  **If Role == "Anh" (Guardian):**
      - Show **Mission Instruction** (e.g., "Buy Ginger Tea").
      - Show **"Complete" Button**.
      - *Action:* Click "Complete" -> Show **4-Digit Code** (e.g., "1997") generated from the task ID.
  3.  **If Role == "Em" (Princess):**
      - Show **Waiting Instruction** (e.g., "Wait for him...").
      - Show **Input Field** (Pin Code style).
      - *Action:* Enter Code -> Validate against Task ID hash.
      - *Success:* Trigger **Confetti**, play sound, show "Reward/Message" card.
- **Component Flow:**
  - **Props:** `task: TimelineItem`, `role: 'anh' | 'em'`.
  - **Logic:** `validateCode(input, taskId)` (Simple hash or pre-defined map).
  - **UI Reuse:**
    - Input Field: Reuse CSS from `VoucherRedeemModal.tsx`.
    - Icons: use `lucide-react` (Lock, Unlock, Gift).

#### **D. SOS Floating Button**
*The Safety Net: Immediate access to help.*

- **Component Path:** `src/components/FloatingSOS.tsx` (New)
- **Reference Component:** `src/components/EmergencyPanel.tsx` (Content Layout).
- **Data Source:** `src/data/itinerary.ts` (`emergencyContacts` array).
- **Feature Flow:**
  1.  A small, pulsing Red Circle Icon sits fixed at the bottom-right corner.
  2.  User taps the button.
  3.  **Menu Expands** (upwards) showing 3 quick options:
      - 📞 **Taxi** (Direct Call).
      - 🏥 **Pharmacy** (Map Image/Link).
      - 💸 **ATM** (List).
- **Component Flow:**
  - **Position:** `fixed bottom-24 right-4 z-50`.
  - **State:** `[isOpen, setIsOpen]`.
  - **Render:**
    - Button: `motion.button` with `animate-pulse`.
    - Content: Reuse `EmergencyPanel.tsx` list items but styled as a small popup popover instead of full BottomSheet.
### 3.3. Design & Styling (Liquid Glass System)
*Reference: `docs/design.md`*

**Core Philosophy:** Fluidity, Refraction, Active Response.
Elements should feel like "water" or "glass" that reacts to touch.

#### **A. Global Tailwind Utilities (To be added)**
```css
/* Core Liquid Glass Effect */
.glass-liquid {
  @apply bg-white/20 backdrop-blur-xl border border-white/20 shadow-xl;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.5);
}
```

#### **B. Component Samples**

**1. Liquid Card (Role Selector / Dashboard Item)**
```tsx
// Tailwind: bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl animate-morphIn
<motion.div 
  className="relative overflow-hidden bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Refraction Layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
  {children}
</motion.div>
```

**2. Liquid Button (Quest Completion)**
```tsx
// Tailwind: bg-white/25 backdrop-blur-lg rounded-full shadow-md active:brightness-125
<button className="
  relative px-8 py-4 rounded-full 
  bg-white/20 backdrop-blur-md 
  border border-white/40 
  shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]
  transition-all duration-300
  hover:bg-white/30 hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.6)]
  active:scale-95 active:brightness-125
">
  <span className="relative z-10 font-bold text-white drop-shadow-md">
    Hoàn Thành
  </span>
</button>
```

**3. Morphing Modal (Quest Details)**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8, borderRadius: "100%" }}
  animate={{ opacity: 1, scale: 1, borderRadius: "24px" }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="bg-white/30 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden"
>
  {/* Fluid Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 mix-blend-overlay" />
  {content}
</motion.div>
```

### 3.5. Liquid Glass Theme Matrix (Role-Based Tokens)
*Refining the "Liquid Glass" look for specific characters.*

| Feature | Theme "Misty Pink" (Em/Princess) | Theme "Cloud Blue" (Anh/Guardian) |
| :--- | :--- | :--- |
| **Color Base** | `pink-500`, `rose-400` | `cyan-500`, `sky-400` |
| **Glass Bg** | `bg-pink-500/10` | `bg-cyan-500/10` |
| **Gradient** | `bg-gradient-to-br from-pink-500/20 to-rose-500/5` | `bg-gradient-to-br from-cyan-500/20 to-blue-500/5` |
| **Border** | `border-pink-200/30` | `border-cyan-200/30` |
| **Glow Shadow** | `shadow-[0_0_20px_rgba(236,72,153,0.3)]` | `shadow-[0_0_20px_rgba(6,182,212,0.3)]` |
| **Text Highlight**| `text-pink-200` | `text-cyan-200` |
| **Icon Style** | `text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]` | `text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]` |
| **Active State** | `animate-pulse bg-pink-500/20` | `animate-pulse bg-cyan-500/20` |

---

## 4. Implementation Plan

### Phase 1: Foundation & Entry Point
**Goal:** Integrate "Love Passport" into the app navigation and set up routing.

1.  **Route Setup:**
    -   File: `src/App.tsx`
    -   Action: Add new route `/passport`.
    -   Component: `PassportPage` (New).

2.  **Navigation Entry (The "Icon"):**
    -   File: `src/components/BottomNavbar.tsx` (or `TimelineView.tsx` navigation area).
    -   Action: Add a **"Passport"** icon button.
    -   **Icon:** `BookHeart` (from `lucide-react`).
    -   **Behavior:** `onClick` -> Navigate to `/passport`.
    -   **Style:** Gold/Amber glow to signify "Special Feature".

3.  **Data Schema:**
    -   File: `src/data/itinerary.ts`
    -   Action: Extend `TimelineItem` interface.
    -   Add fields: `questCode?: string` (Code for Anh to input) and `questReward?: string` (Code/Msg for Em to receive).

### Phase 2: Core Components (The "Passport" Engine)
**Goal:** Build the logical flow (Role -> Dashboard -> Interaction).

1.  **Page Wrapper:**
    -   File: `src/pages/PassportPage.tsx`
    -   Logic: Check `localStorage.getItem('passport_role')`.
    -   If `null` -> Render `RoleSelector`.
    -   If `valid` -> Render `PassportDashboard`.

2.  **Role Selector:**
    -   File: `src/components/passport/RoleSelector.tsx`
    -   **UI:** Split screen or Two Cards.
    -   **Icons:**
        -   **Anh:** `Sword` or `Shield` (Lucide: `ShieldCheck`). Color: Blue/Cyan (Liquid Glass).
        -   **Em:** `Crown` or `Heart` (Lucide: `Crown`). Color: Pink/Rose.
    -   **Action:** Click -> Save role to LocalStorage -> Animation Morph -> Enter Dashboard.

3.  **Passport Dashboard:**
    -   File: `src/components/passport/PassportDashboard.tsx`
    -   **Reusability:** Reuse `TimelineItem` component for rendering each row to maintain consistency.
    -   **UI:** Vertical Timeline (Reuse `TimelineView` layout structure).
    -   **Content:** Filter `itinerary` items that have `questCode`.
    -   **Status Icons:**
        -   Locked: `Lock` (Gray glass).
        -   Active: `Zap` (Pulse animation).
        -   Completed: `CheckCircle2` (Green/Gold).

### Phase 3: The Interaction (Quest Modal)
**Goal:** The "Game" element - Code Input and Rewards.

1.  **Quest Modal:**
    -   File: `src/components/passport/QuestModal.tsx`
    -   **Reusability:** Clone & Adapt `VoucherRedeemModal.tsx`. Keep the input logic and glass styling.
    -   **Props:** `quest: TimelineItem`, `role: 'anh' | 'em'`.
    -   **Logic:**
        -   **If Role = Anh:** Show Input Field ("Nhập code Em đưa").
        -   **If Role = Em:** Show Quest Code ("Đọc code này cho Anh").
        -   **Validation:** Verify input against hardcoded logic/hash.
    -   **Success:** Trigger `Confetti` -> Save state to `localStorage` -> Update Badge.

2.  **Floating SOS:**
    -   File: `src/components/passport/FloatingSOS.tsx`.
    -   **Icon:** `LifeBuoy` (Red/White).
    -   **Position:** Fixed Bottom-Right (z-index 50).
    -   **Action:** Expand to show "Say xe", "Đau bụng", "Cần ôm".

### Phase 4: Polish & Assets (Liquid Glass)
**Goal:** WOW factor.

1.  **Styling:**
    -   Apply `backdrop-blur-xl`, `bg-white/20`, and `border-white/20` to all cards.
    -   Use `framer-motion` for "Morph" transitions between Role Selector and Dashboard.

2.  **Micro-animations:**
    -   Button Hover: Scale 1.05 + Brightness.
    -   Modal Open: Spring animation (bouncy).

### Execution Checklist
- [ ] Create `PassportPage.tsx` & Route.
- [ ] Create `RoleSelector` with Icons.
- [ ] Create `PassportDashboard` skeleton.
- [ ] Implement `QuestModal` logic (Input/Code).
- [ ] Connect Data (Map `itinerary.ts`).
- [ ] Verify Code Sync flow.
