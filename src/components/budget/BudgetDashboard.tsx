import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw } from 'lucide-react';
import { useBudget, BudgetCategory, BudgetItem } from '@/contexts/BudgetContext';
import { BudgetWalletCard } from './BudgetWalletCard';
import { BudgetListItem } from './BudgetListItem';
import { BudgetEntryModal } from './BudgetEntryModal';
import { BudgetRoleSelector } from './BudgetRoleSelector';
import { useBudgetReminder } from '@/hooks/useBudgetReminder';
import { toast } from 'sonner';

interface BudgetDashboardProps {
	onClose?: () => void;
}

export function BudgetDashboard({ onClose }: BudgetDashboardProps) {
	const {
		role,
		items,
		addItem,
		updateItem,
		removeItem,
		togglePaid,
		resetBudget,
	} = useBudget();

	// Initialize budget reminder
	useBudgetReminder();

	const [showEntryModal, setShowEntryModal] = useState(false);
	const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);

	const isAnhView = role === 'anh';

	// Group items by day for Anh view
	const groupedItems = useMemo(() => {
		if (!isAnhView) return { all: items };

		const groups: Record<string, BudgetItem[]> = {
			'Trước chuyến đi': [],
			'Ngày 1': [],
			'Ngày 2': [],
			'Ngày 3': [],
			'Ngày 4': [],
		};

		items.forEach((item) => {
			if (item.day === 0) groups['Trước chuyến đi'].push(item);
			else if (item.day === 1) groups['Ngày 1'].push(item);
			else if (item.day === 2) groups['Ngày 2'].push(item);
			else if (item.day === 3) groups['Ngày 3'].push(item);
			else if (item.day === 4) groups['Ngày 4'].push(item);
			else groups['Ngày 1'].push(item); // Default
		});

		return groups;
	}, [items, isAnhView]);

	const handleAddItem = () => {
		setEditingItem(null);
		setShowEntryModal(true);
	};

	const handleEditItem = (item: BudgetItem) => {
		setEditingItem(item);
		setShowEntryModal(true);
	};

	const handleSaveItem = (data: {
		title: string;
		category: BudgetCategory;
		amount: number;
	}) => {
		if (editingItem) {
			updateItem(editingItem.id, {
				title: data.title,
				category: data.category,
				actualAmount: data.amount,
			});
			toast.success('Đã cập nhật chi tiêu');
		} else {
			addItem({
				title: data.title,
				category: data.category,
				estimatedAmount: 0,
				actualAmount: data.amount,
				isPaid: false,
			});
			toast.success('Đã thêm chi tiêu mới');
		}
	};

	const handleDeleteItem = (id: string) => {
		removeItem(id);
		toast.success('Đã xóa chi tiêu');
	};

	const handleReset = () => {
		if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu chi tiêu?')) {
			resetBudget();
			toast.success('Đã reset Budget Buddy');
		}
	};

	// Show role selector if no role selected
	if (!role) {
		return <BudgetRoleSelector />;
	}

	return (
		<div className='space-y-4'>
			{/* Wallet Card */}
			<BudgetWalletCard />

			{/* Header with Reset Button */}
			<div className='flex items-center justify-between'>
				<h3 className='text-sm font-medium text-white/70'>
					{isAnhView ? 'Danh sách chi phí' : 'Chi tiêu của Em'}
				</h3>
				<button
					onClick={handleReset}
					className='flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors'
				>
					<RotateCcw className='w-3 h-3' />
					Reset
				</button>
			</div>

			{/* Items List */}
			<div className='space-y-3 max-h-[40vh] overflow-y-auto pr-1'>
				{isAnhView ? (
					// Anh view: Grouped by day
					Object.entries(groupedItems).map(([dayLabel, dayItems]) => {
						if (dayItems.length === 0) return null;
						return (
							<div key={dayLabel} className='space-y-2'>
								<p className='text-xs font-medium text-cyan-400/70 pl-1'>
									{dayLabel}
								</p>
								<AnimatePresence mode='popLayout'>
									{dayItems.map((item) => (
										<BudgetListItem
											key={item.id}
											item={item}
											isAnhView={isAnhView}
											onTogglePaid={() => togglePaid(item.id)}
											onEdit={() => handleEditItem(item)}
											onDelete={() => handleDeleteItem(item.id)}
										/>
									))}
								</AnimatePresence>
							</div>
						);
					})
				) : (
					// Em view: Simple list
					<AnimatePresence mode='popLayout'>
						{items.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='text-center py-8'
							>
								<p className='text-white/40 text-sm'>
									Chưa có chi tiêu nào. Thêm mới nào! 🛍️
								</p>
							</motion.div>
						) : (
							items.map((item) => (
								<BudgetListItem
									key={item.id}
									item={item}
									isAnhView={isAnhView}
									onTogglePaid={() => togglePaid(item.id)}
									onEdit={() => handleEditItem(item)}
									onDelete={() => handleDeleteItem(item.id)}
								/>
							))
						)}
					</AnimatePresence>
				)}
			</div>

			{/* Floating Add Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleAddItem}
				className={cn(
					'w-full py-3 rounded-xl font-medium transition-all',
					'flex items-center justify-center gap-2',
					isAnhView
						? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
						: 'bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30'
				)}
			>
				<Plus className='w-5 h-5' />
				Thêm chi tiêu
			</motion.button>

			{/* Entry Modal */}
			<BudgetEntryModal
				isOpen={showEntryModal}
				onClose={() => setShowEntryModal(false)}
				onSave={handleSaveItem}
				initialData={editingItem || undefined}
				isAnhView={isAnhView}
			/>
		</div>
	);
}
