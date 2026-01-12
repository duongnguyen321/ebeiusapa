import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete, Wallet } from 'lucide-react';
import { useLockBodyScrollWhen } from '@/hooks/useLockBodyScroll';
import { useBudget } from '@/contexts/BudgetContext';

interface BudgetLimitModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function BudgetLimitModal({ isOpen, onClose }: BudgetLimitModalProps) {
	const { maxBudget, setMaxBudget, role } = useBudget();
	const [amountString, setAmountString] = useState(maxBudget.toString());

	useLockBodyScrollWhen(isOpen);

	useEffect(() => {
		if (isOpen) {
			setAmountString(maxBudget.toString());
		}
	}, [isOpen, maxBudget]);

	const handleNumpadPress = (value: string) => {
		if (value === 'delete') {
			setAmountString((prev) => prev.slice(0, -1));
		} else if (value === 'k') {
			const num = parseInt(amountString) || 0;
			if (num > 0) {
				setAmountString((num * 1000).toString());
			}
		} else if (value === 'clear') {
			setAmountString('');
		} else {
			if (amountString === '0' && value !== '.') {
				setAmountString(value);
			} else {
				setAmountString((prev) => prev + value);
			}
		}
	};

	const handleSave = () => {
		const amount = parseInt(amountString) || 0;
		if (amount > 0) {
			setMaxBudget(amount);
			onClose();
		}
	};

	const themeColor = role === 'anh' ? 'cyan' : 'pink';
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
								<div className='flex items-center gap-2'>
									<div className={cn('p-2 rounded-lg', `bg-${themeColor}-500/20`)}>
										<Wallet className={cn('w-5 h-5', `text-${themeColor}-400`)} />
									</div>
									<h3 className='text-lg font-display text-white'>Thiết lập Ngân sách</h3>
								</div>
								<button
									onClick={onClose}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
								>
									<X className='w-5 h-5' />
								</button>
							</div>

							<div className='p-4 space-y-6'>
								{/* Amount Display */}
								<div className='text-center space-y-2'>
									<p className='text-sm text-white/50'>Tổng ngân sách dự kiến</p>
									<div
										className={cn(
											'py-4 rounded-xl bg-white/5 border border-white/10 transition-colors',
											`border-${themeColor}-500/30`
										)}
									>
										<p
											className={cn(
												'text-4xl font-bold tabular-nums',
												role === 'anh' ? 'text-cyan-400' : 'text-pink-400'
											)}
										>
											{amount > 0
												? new Intl.NumberFormat('vi-VN').format(amount) + ' ₫'
												: '0 ₫'}
										</p>
									</div>
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
													? role === 'anh'
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
										disabled={amount <= 0}
										className={cn(
											'py-3 rounded-xl text-lg font-semibold transition-all active:scale-95 col-span-2',
											amount > 0
												? role === 'anh'
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
