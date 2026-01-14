import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";

import type { GlobalRole } from '@/types/quest';
export type BudgetRole = GlobalRole | null;
import { useGlobalRole } from './GlobalRoleContext';
export type BudgetCategory =
  | "transport"
  | "stay"
  | "food"
  | "ticket"
  | "shopping"
  | "other";

export interface BudgetItem {
  id: string;
  title: string;
  category: BudgetCategory;
  estimatedAmount: number;
  actualAmount: number;
  isPaid: boolean;
  isActive: boolean;
  createdAt: number;
  day?: number; // 1-4 for trip days
}

export interface BudgetState {
  // role managed globally
  maxBudget: number;
  currencyUnit: "VNĐ";
  items: BudgetItem[];
  lastRemindedAt: number;
}

interface BudgetContextType {
  role: BudgetRole;
  maxBudget: number;
  currencyUnit: "VNĐ";
  items: BudgetItem[];
  totalSpent: number;
  totalEstimated: number;
  remainingBudget: number;
  spendingPercent: number;
  // setRole removed
  setMaxBudget: (amount: number) => void;
  addItem: (item: Omit<BudgetItem, "id" | "createdAt">) => void;
  updateItem: (id: string, updates: Partial<BudgetItem>) => void;
  removeItem: (id: string) => void;
  togglePaid: (id: string) => void;
  resetBudget: () => void;
  updateLastReminded: () => void;
  lastRemindedAt: number;
}

import { STORAGE_KEYS } from "@/config/storage";
const MAX_BUDGET = 6_377_500; // 6.377.500 VNĐ

// const STORAGE_KEY = "sapa_budget_v1"; // Removed

// Pre-defined items for "Anh" role - Imported from data
import { anhDefaultItems } from "@/data/budget";

const defaultState: BudgetState = {
  maxBudget: MAX_BUDGET,
  currencyUnit: "VNĐ",
  items: [],
  lastRemindedAt: 0,
};

const BudgetContext = createContext<BudgetContextType | null>(null);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const { role: globalRole } = useGlobalRole();
  const prevRoleRef = useRef<BudgetRole>(null);

  const [state, setState] = useState<BudgetState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUDGET.STATE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return defaultState;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGET.STATE, JSON.stringify(state));
  }, [state]);

	// Sync with Global Role & Initialize Data
	useEffect(() => {
    const currentRole = globalRole;
    const prevRole = prevRoleRef.current;

    // Only run logic if role effectively changed or on first significant mount
		if (currentRole && currentRole !== prevRole) {
      setState((prev) => {
        // If selecting Anh and no items yet, populate with default items
        const items =
          currentRole === "anh" && prev.items.length === 0
            ? anhDefaultItems.map((item, index) => ({
                ...item,
                id: `anh_item_${index}`,
                createdAt: Date.now(),
              }))
            : prev.items;

        // Initialize maxBudget based on role CHANGE
        // Anh: See full trip budget
        // Em: Start with 0 budget (User request)
        const maxBudget =
          currentRole === "em" ? 0 : currentRole === "anh" ? MAX_BUDGET : prev.maxBudget;

        return {
          ...prev,
          items,
          maxBudget,
        };
      });
		}
    prevRoleRef.current = currentRole;
	}, [globalRole]);

  const setMaxBudget = useCallback((amount: number) => {
    setState((prev) => {
      let newItems = [...prev.items];

      // Auto-balancing logic for "Anh" role
      if (globalRole === "anh") {
        // Reset all to active first to start fresh calculation?
        // Or keep existing inactive? User said "inactive it... until done".
        // Implicitly, if we raise budget, we might want to reactive?
        // Let's activate all first, then cut down. This ensures optimal cut.
        newItems = newItems.map((i) => ({ ...i, isActive: true }));

        let currentTotal = newItems.reduce(
          (sum, item) => sum + (item.actualAmount || item.estimatedAmount),
          0
        );
        let deficit = currentTotal - amount;

        while (deficit > 0) {
          // Find active, unpaid items (can't cut paid items)
          const candidates = newItems.filter((i) => i.isActive && !i.isPaid);

          if (candidates.length === 0) break; // Can't cut anymore

          // Find item closest to deficit
          // minimize |item.amount - deficit|
          let bestCandidateIndex = -1;
          let minDiff = Infinity;

          candidates.forEach((item) => {
            const amount = item.actualAmount || item.estimatedAmount;
            const diff = Math.abs(amount - deficit);
            if (diff < minDiff) {
              minDiff = diff;
              bestCandidateIndex = newItems.findIndex((i) => i.id === item.id);
            }
          });

          if (bestCandidateIndex !== -1) {
            // Inactive it
            newItems[bestCandidateIndex].isActive = false;
            const cutAmount =
              newItems[bestCandidateIndex].actualAmount ||
              newItems[bestCandidateIndex].estimatedAmount;
            deficit -= cutAmount;
          } else {
            break;
          }
        }
      }

      return {
        ...prev,
        maxBudget: amount,
        items: newItems,
      };
    });
  }, []);

  const addItem = useCallback((item: Omit<BudgetItem, "id" | "createdAt">) => {
    const newItem: BudgetItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: Date.now(),
      isActive: true,
    };
    setState((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<BudgetItem>) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const togglePaid = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      ),
    }));
  }, []);

  const resetBudget = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEYS.BUDGET.STATE);
  }, []);

  const updateLastReminded = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lastRemindedAt: Date.now(),
    }));
  }, []);

  // Computed values
  const { totalSpent, totalEstimated, remainingBudget, spendingPercent } =
    useMemo(() => {
      const activeItems = state.items.filter((item) => item.isActive);

      const totalSpent = activeItems
        .filter((item) => item.isPaid)
        .reduce(
          (sum, item) => sum + (item.actualAmount || item.estimatedAmount),
          0
        );

      const totalEstimated = activeItems.reduce(
        (sum, item) => sum + item.estimatedAmount,
        0
      );

      const remainingBudget = state.maxBudget - totalSpent;
      const spendingPercent = Math.min(
        (totalSpent / state.maxBudget) * 100,
        100
      );

      return { totalSpent, totalEstimated, remainingBudget, spendingPercent };
    }, [state.items, state.maxBudget]);

  return (
    <BudgetContext.Provider
      value={{
        role: globalRole,
        maxBudget: state.maxBudget,
        currencyUnit: state.currencyUnit,
        items: state.items,
        totalSpent,
        totalEstimated,
        remainingBudget,
        spendingPercent,
        // setRole removed
        setMaxBudget,
        addItem,
        updateItem,
        removeItem,
        togglePaid,
        resetBudget,
        updateLastReminded,
        lastRemindedAt: state.lastRemindedAt,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
