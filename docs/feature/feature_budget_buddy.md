# Feature Documentation: Budget Buddy (Finance Tracker)

> **Core Philosophy:** "Shared Responsibility, Individual Freedom."
> A finance management feature designed for the specific needs of the couple: "Anh" manages the macro budget (Fixed Costs & Shared Expenses), while "Em" tracks micro personal spending.
> **Tech Constraint:** Offline First. No Backend. LocalStorage Persistence.

## 1. Architecture: Frontend-Only & Persistence

Following the "Love Passport" offline philosophy, this feature uses `localStorage` as the primary database.

-   **Data Independence:**
    -   **Device A ("Anh"):** Manages the **Master Checklist**. Data maps from the Itinerary.
    -   **Device B ("Em"):** Manages the **Personal Wishlist**. Free-form data entry.
    -   *Sync Policy:* No realtime sync required. Each device manages its own allocated budget.

-   **Time-Based Activation (The "Cronjob" Logic):**
    -   **Active Window:** 15/01/2026 - 18/01/2026.
    -   **Reminder Engine:**
        -   **Status:** Checks every 2 hours (08:00 - 22:00).
        -   **Foreground:** Display `Sonner` Toast ("Don't forget to log expenses!").
        -   **Background:** Use **Notification API** (if allowed) or Fallback to **"Catch-up Popup"** (checks `last_active_time` on next app open).

---

## 2. Expanded Content (Budget Breakdown)

*Strictly aligned with **`docs/plan.md` (Section 5 - Adjusted Strategy)**.*

### 2.1. The "Anh" Checklist (Fixed & Shared)
*Role: Treasurer. Responsibility: Logistics, Meals, Tickets.*

| Day | Item ID | Title | Est. Price (VNĐ) | Note from Plan |
| :-- | :-- | :-- | :-- | :-- |
| **Pre-Trip**| `stay_hotel`| Sapa House Hotel (3 Nights)| 2,000,000 | Fixed |
| **Pre-Trip**| `trans_bus` | Hanoi - Sapa Bus (Return) | 1,500,000 | Fixed |
| **Active** | | **Activity Budget** | **~3,100,000** | **Adjusted (Section 5)**|
| **Day 1** | `d1_taxi_all` | Taxi Travel (Day 1) | 100,000 | Rain Contingency |
| **Day 1** | `d1_dinner` | Dinner: Ong Ha Consui | 100,000 | Light Dinner |
| **Day 2** | `d2_logistics`| Supply Run (Cake, Wine) | 200,000 | Optimized |
| **Day 2** | `d2_spa` | Relax Spa (x2) | 300,000 | *Adjusted from Sapa Green* |
| **Day 2** | `d2_dinner` | Birthday Dinner (Sturgeon) | 700,000 | Main Event |
| **Day 2** | `d2_travel` | Taxi/Xe Om to Cat Cat | 200,000 | Safety First |
| **Day 2** | `d2_tickets` | Tickets: Cat Cat (x2) | 300,000 | Fixed |
| **Day 3** | `d3_tickets` | Tickets: Ham Rong (x2) | 140,000 | Fixed |
| **Day 3** | `d3_lunch` | Lunch: Peppery Chicken | 300,000 | Local Specialty |
| **Day 3** | `d3_dinner` | BBQ Street Food | 300,000 | |
| **Day 4** | `d4_cafe` | Cafe View (Viettrekking) | 150,000 | |
| **Day 4** | `d4_souvenir` | Souvenirs (Chestnuts) | 300,000 | Optional |
| **Total** | | **Grand Total** | **~6,600,000** | **Range 6-7M** |

### 2.2. The "Em" Todo List (Personal)
*Role: Shopper. Responsibility: Personal Mood & Souvenirs.*

-   **Structure:** Free-form list. "Em" adds items as she shops.
-   **Allocation:** *Zero-based Budgeting*. Any spending here comes from "Savings" if Anh manages to haggle prices down or skip items in the Master List.

---

## 3. Tech Specs Update

### 3.1. Data Schema
```typescript
// Key: 'sapa_budget_v1'
interface BudgetState {
  role: "anh" | "em" | null;
  maxBudget: number; // Config: 6,600,000
  currencyUnit: "VNĐ";
  
  // The Lists
  items: BudgetItem[];
  
  // Logic
  lastRemindedAt: number; // Timestamp
}

interface BudgetItem {
  id: string;
  title: string;
  category: 'transport' | 'stay' | 'food' | 'ticket' | 'shopping' | 'other';
  estimatedAmount: number; // 0 for "Em" items
  actualAmount: number;    // User Input
  isPaid: boolean;         // Checkbox
  createdAt: number;
}
```

### 3.2. Component Architecture

#### **A. Budget Dashboard (Main View)**
*   **Path:** `src/components/budget/BudgetDashboard.tsx`
*   **Logic:**
    *   **Header:** Shows Total Budget vs Total Spent (Progress Bar).
    *   **Body:** List of `BudgetListItem`.
    *   **Footer:** "Add Item" Button (Floating).

#### **B. Smart Input Modal (Action)**
*   **Path:** `src/components/budget/BudgetEntryModal.tsx`
*   **Context:** Used when "Anh" adjusts a price or "Em" adds a new item.
*   **Features:**
    *   Quick Suggestions (Tags: "Taxi", "Cafe").
    *   Numpad with "k" shortcut (e.g., type `50` -> `50,000`).

#### **C. Reminder Service (Hook)**
*   **Path:** `src/hooks/useBudgetReminder.ts`
*   **Logic:**
    *   `useInterval` running every minute.
    *   Checks `now()` vs `lastRemindedAt`.
    *   Checks `document.visibilityState`.
    *   Triggers `toast` or `Notification` accordingly.

---

## 4. UI/UX Design (Liquid Glass System)
*Reference: `docs/design.md`*

### 4.1. The "Liquid Wallet" Card
A visually stunning header card representing the wallet status.

-   **Style:**
    *   **Background:** `bg-white/10` with `backdrop-blur-xl`.
    *   **Border:** `border-white/20`.
    *   **Animation:** The background gradient shifts from **Green** (Safe) to **Orange** (Caution) to **Red** (Over Budget) based on spending %.
    *   **Refraction:** An SVG ripple effect behind the numbers that moves slowly like water.

### 4.2. List Items
-   **"Anh" view:** Glass Strips.
    -   *Unpaid:* Frosted glass, slightly opaque.
    -   *Paid:* Becomes transparent/clearer, text dims, a "Check" mark glows.
-   **"Em" view:** Bubble Items.
    -   Items appear as floating bubbles or rounded cards.
    -   **Add Button:** A large, glowing orb `bg-pink-500/20` that distorts/ripples on press (Liquid Glass Button).

### 4.3. Typography & Icons
-   **Font:** *Inter* or *Outfit* (Modern, Clean numbers).
-   **Icons:** Use `Lucide React` with thin strokes, glowing drop-shadows tailored to the theme (Cyan for Anh, Pink for Em).
