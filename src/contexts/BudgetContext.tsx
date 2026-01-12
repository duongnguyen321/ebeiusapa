import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
	useMemo,
} from 'react';

export type BudgetRole = 'anh' | 'em' | null;
export type BudgetCategory = 'transport' | 'stay' | 'food' | 'ticket' | 'shopping' | 'other';

export interface BudgetItem {
	id: string;
	title: string;
	category: BudgetCategory;
	estimatedAmount: number;
	actualAmount: number;
	isPaid: boolean;
	createdAt: number;
	day?: number; // 1-4 for trip days
}

export interface BudgetState {
	role: BudgetRole;
	maxBudget: number;
	currencyUnit: 'VNĐ';
	items: BudgetItem[];
	lastRemindedAt: number;
}

interface BudgetContextType {
	role: BudgetRole;
	maxBudget: number;
	currencyUnit: 'VNĐ';
	items: BudgetItem[];
	totalSpent: number;
	totalEstimated: number;
	remainingBudget: number;
	spendingPercent: number;
	setRole: (role: BudgetRole) => void;
	addItem: (item: Omit<BudgetItem, 'id' | 'createdAt'>) => void;
	updateItem: (id: string, updates: Partial<BudgetItem>) => void;
	removeItem: (id: string) => void;
	togglePaid: (id: string) => void;
	resetBudget: () => void;
	updateLastReminded: () => void;
	lastRemindedAt: number;
}

const STORAGE_KEY = 'sapa_budget_v1';
const MAX_BUDGET = 6_600_000; // 6.6M VNĐ

// Pre-defined items for "Anh" role based on plan.md
const anhDefaultItems: Omit<BudgetItem, 'id' | 'createdAt'>[] = [
	{ title: 'Sapa House Hotel (3 Đêm)', category: 'stay', estimatedAmount: 2_000_000, actualAmount: 0, isPaid: false, day: 0 },
	{ title: 'Xe Hanoi - Sapa (Khứ hồi)', category: 'transport', estimatedAmount: 1_500_000, actualAmount: 0, isPaid: false, day: 0 },
	{ title: 'Taxi di chuyển (Ngày 1)', category: 'transport', estimatedAmount: 100_000, actualAmount: 0, isPaid: false, day: 1 },
	{ title: 'Bữa tối: Ông Hà Consui', category: 'food', estimatedAmount: 100_000, actualAmount: 0, isPaid: false, day: 1 },
	{ title: 'Mua sắm: Bánh, Rượu', category: 'shopping', estimatedAmount: 200_000, actualAmount: 0, isPaid: false, day: 2 },
	{ title: 'Spa thư giãn (x2)', category: 'other', estimatedAmount: 300_000, actualAmount: 0, isPaid: false, day: 2 },
	{ title: 'Tiệc sinh nhật: Cá Tầm', category: 'food', estimatedAmount: 700_000, actualAmount: 0, isPaid: false, day: 2 },
	{ title: 'Taxi/Xe Om đi Cat Cat', category: 'transport', estimatedAmount: 200_000, actualAmount: 0, isPaid: false, day: 2 },
	{ title: 'Vé Cat Cat (x2)', category: 'ticket', estimatedAmount: 300_000, actualAmount: 0, isPaid: false, day: 2 },
	{ title: 'Vé Hàm Rồng (x2)', category: 'ticket', estimatedAmount: 140_000, actualAmount: 0, isPaid: false, day: 3 },
	{ title: 'Trưa: Gà tiêu đen', category: 'food', estimatedAmount: 300_000, actualAmount: 0, isPaid: false, day: 3 },
	{ title: 'BBQ Phố ẩm thực', category: 'food', estimatedAmount: 300_000, actualAmount: 0, isPaid: false, day: 3 },
	{ title: 'Cafe View (Viettrekking)', category: 'food', estimatedAmount: 150_000, actualAmount: 0, isPaid: false, day: 4 },
	{ title: 'Quà: Hạt dẻ Sapa', category: 'shopping', estimatedAmount: 300_000, actualAmount: 0, isPaid: false, day: 4 },
];

const defaultState: BudgetState = {
	role: null,
	maxBudget: MAX_BUDGET,
	currencyUnit: 'VNĐ',
	items: [],
	lastRemindedAt: 0,
};

const BudgetContext = createContext<BudgetContextType | null>(null);

export function BudgetProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<BudgetState>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
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
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state]);

	const setRole = useCallback((role: BudgetRole) => {
		setState((prev) => {
			// If selecting Anh and no items yet, populate with default items
			const items = role === 'anh' && prev.items.length === 0
				? anhDefaultItems.map((item, index) => ({
						...item,
						id: `anh_item_${index}`,
						createdAt: Date.now(),
					}))
				: prev.items;

			return {
				...prev,
				role,
				items,
			};
		});
	}, []);

	const addItem = useCallback((item: Omit<BudgetItem, 'id' | 'createdAt'>) => {
		const newItem: BudgetItem = {
			...item,
			id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			createdAt: Date.now(),
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
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	const updateLastReminded = useCallback(() => {
		setState((prev) => ({
			...prev,
			lastRemindedAt: Date.now(),
		}));
	}, []);

	// Computed values
	const { totalSpent, totalEstimated, remainingBudget, spendingPercent } = useMemo(() => {
		const totalSpent = state.items
			.filter((item) => item.isPaid)
			.reduce((sum, item) => sum + (item.actualAmount || item.estimatedAmount), 0);

		const totalEstimated = state.items.reduce(
			(sum, item) => sum + item.estimatedAmount,
			0
		);

		const remainingBudget = state.maxBudget - totalSpent;
		const spendingPercent = Math.min((totalSpent / state.maxBudget) * 100, 100);

		return { totalSpent, totalEstimated, remainingBudget, spendingPercent };
	}, [state.items, state.maxBudget]);

	return (
		<BudgetContext.Provider
			value={{
				role: state.role,
				maxBudget: state.maxBudget,
				currencyUnit: state.currencyUnit,
				items: state.items,
				totalSpent,
				totalEstimated,
				remainingBudget,
				spendingPercent,
				setRole,
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
		throw new Error('useBudget must be used within a BudgetProvider');
	}
	return context;
}
