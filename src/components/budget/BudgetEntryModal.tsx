import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete } from 'lucide-react';
import { BudgetCategory, BudgetItem } from '@/contexts/BudgetContext';
import { useLockBodyScrollWhen } from '@/hooks/useLockBodyScroll';

interface BudgetEntryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: { title: string; category: BudgetCategory; amount: number }) => void;
	initialData?: Partial<BudgetItem>;
	isAnhView: boolean;
}

const quickTags: { label: string; category: BudgetCategory }[] = [
	{ label: 'Taxi', category: 'transport' },
	{ label: 'Cafe', category: 'food' },
	{ label: 'Ăn vặt', category: 'food' },
	{ label: 'Quà', category: 'shopping' },
	{ label: 'Vé', category: 'ticket' },
	{ label: 'Khác', category: 'other' },
];

const categoryLabels: Record<BudgetCategory, string> = {
	transport: 'Di chuyển',
	stay: 'Lưu trú',
	food: 'Ăn uống',
	ticket: 'Vé',
	shopping: 'Mua sắm',
	other: 'Khác',
};

export function BudgetEntryModal({
	isOpen,
	onClose,
	onSave,
	initialData,
	isAnhView,
}: BudgetEntryModalProps) {
	const [title, setTitle] = useState(initialData?.title || '');
	const [category, setCategory] = useState<BudgetCategory>(initialData?.category || 'other');
	const [amountString, setAmountString] = useState(
		initialData?.actualAmount?.toString() || initialData?.estimatedAmount?.toString() || ''
	);

	useLockBodyScrollWhen(isOpen);

	useEffect(() => {
		if (isOpen) {
			setTitle(initialData?.title || '');
			setCategory(initialData?.category || 'other');
			setAmountString(
				initialData?.actualAmount?.toString() || initialData?.estimatedAmount?.toString() || ''
			);
		}
	}, [isOpen, initialData]);

	const handleNumpadPress = (value: string) => {
		if (value === 'delete') {
			setAmountString((prev) => prev.slice(0, -1));
		} else if (value === 'k') {
			// Multiply by 1000
			const num = parseInt(amountString) || 0;
			if (num > 0) {
				setAmountString((num * 1000).toString());
			}
		} else if (value === 'clear') {
			setAmountString('');
		} else {
			// Prevent leading zeros
			if (amountString === '0' && value !== '.') {
				setAmountString(value);
			} else {
				setAmountString((prev) => prev + value);
			}
		}
	};

	const handleQuickTag = (tag: typeof quickTags[0]) => {
		if (!title) {
			setTitle(tag.label);
		}
		setCategory(tag.category);
	};

	const handleSave = () => {
		const amount = parseInt(amountString) || 0;
		if (title.trim() && amount > 0) {
			onSave({ title: title.trim(), category, amount });
			onClose();
		}
	};

	const themeColor = isAnhView ? 'cyan' : 'pink';
	const amount = parseInt(amountString) || 0;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm'
					onClick={onClose}
				>
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className='w-full max-w-md'
					>
						<div className='glass-panel rounded-t-3xl overflow-hidden'>
							{/* Header */}
							<div className='p-4 flex items-center justify-between border-b border-white/10'>
								<h3 className='text-lg font-display text-white'>
									{initialData ? 'Chỉnh sửa' : 'Thêm chi tiêu'}
								</h3>
								<button
									onClick={onClose}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
								>
									<X className='w-5 h-5' />
								</button>
							</div>

							<div className='p-4 space-y-4'>
								{/* Title Input */}
								<input
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder='Tên chi tiêu...'
									className={cn(
										'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10',
										'text-white placeholder-white/40 focus:outline-none',
										`focus:border-${themeColor}-500/50 focus:ring-1 focus:ring-${themeColor}-500/30`
									)}
								/>

								{/* Quick Tags */}
								<div className='flex flex-wrap gap-2'>
									{quickTags.map((tag) => (
										<button
											key={tag.label}
											onClick={() => handleQuickTag(tag)}
											className={cn(
												'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
												category === tag.category
													? isAnhView
														? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
														: 'bg-pink-500/30 text-pink-300 border border-pink-500/50'
													: 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
											)}
										>
											{tag.label}
										</button>
									))}
								</div>

								{/* Category Selector */}
								<div className='flex flex-wrap gap-2'>
									{Object.entries(categoryLabels).map(([key, label]) => (
										<button
											key={key}
											onClick={() => setCategory(key as BudgetCategory)}
											className={cn(
												'px-3 py-1.5 rounded-lg text-xs transition-all',
												category === key
													? 'bg-white/15 text-white border border-white/20'
													: 'bg-white/5 text-white/50 hover:bg-white/10'
											)}
										>
											{label}
										</button>
									))}
								</div>

								{/* Amount Display */}
								<div
									className={cn(
										'text-center py-4 rounded-xl bg-white/5 border border-white/10'
									)}
								>
									<p className='text-xs text-white/40 mb-1'>Số tiền</p>
									<p
										className={cn(
											'text-3xl font-bold tabular-nums',
											isAnhView ? 'text-cyan-400' : 'text-pink-400'
										)}
									>
										{amount > 0
											? new Intl.NumberFormat('vi-VN').format(amount) + ' ₫'
											: '0 ₫'}
									</p>
								</div>

								{/* Numpad */}
								<div className='grid grid-cols-4 gap-2'>
									{['1', '2', '3', 'k'].map((key) => (
										<button
											key={key}
											onClick={() => handleNumpadPress(key)}
											className={cn(
												'py-3 rounded-xl text-lg font-medium transition-all active:scale-95',
												key === 'k'
													? isAnhView
														? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
														: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'
													: 'bg-white/5 text-white hover:bg-white/10'
											)}
										>
											{key === 'k' ? '×1K' : key}
										</button>
									))}
									{['4', '5', '6', 'clear'].map((key) => (
										<button
											key={key}
											onClick={() => handleNumpadPress(key)}
											className={cn(
												'py-3 rounded-xl text-lg font-medium transition-all active:scale-95',
												key === 'clear'
													? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 text-sm'
													: 'bg-white/5 text-white hover:bg-white/10'
											)}
										>
											{key === 'clear' ? 'Xóa' : key}
										</button>
									))}
									{['7', '8', '9', 'delete'].map((key) => (
										<button
											key={key}
											onClick={() => handleNumpadPress(key)}
											className={cn(
												'py-3 rounded-xl text-lg font-medium transition-all active:scale-95',
												key === 'delete'
													? 'bg-white/5 text-white/60 hover:bg-white/10'
													: 'bg-white/5 text-white hover:bg-white/10'
											)}
										>
											{key === 'delete' ? <Delete className='w-5 h-5 mx-auto' /> : key}
										</button>
									))}
									<button
										onClick={() => handleNumpadPress('0')}
										className='py-3 rounded-xl text-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95 col-span-2'
									>
										0
									</button>
									<button
										onClick={handleSave}
										disabled={!title.trim() || amount <= 0}
										className={cn(
											'py-3 rounded-xl text-lg font-semibold transition-all active:scale-95 col-span-2',
											title.trim() && amount > 0
												? isAnhView
													? 'bg-cyan-500 text-white hover:bg-cyan-600'
													: 'bg-pink-500 text-white hover:bg-pink-600'
												: 'bg-white/10 text-white/30 cursor-not-allowed'
										)}
									>
										Lưu
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
