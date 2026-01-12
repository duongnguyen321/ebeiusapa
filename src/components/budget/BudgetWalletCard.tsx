import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { formatCurrency } from './BudgetListItem';
import { BudgetLimitModal } from './BudgetLimitModal';

export function BudgetWalletCard() {
	const { totalSpent, maxBudget, remainingBudget, spendingPercent, role } = useBudget();

	const isAnhView = role === 'anh';

	// Determine status color based on spending percentage
	const getStatusColor = () => {
		if (spendingPercent >= 90) return 'from-red-500/30 to-red-600/20';
		if (spendingPercent >= 70) return 'from-orange-500/30 to-amber-500/20';
		return isAnhView
			? 'from-cyan-500/20 to-teal-500/10'
			: 'from-pink-500/20 to-rose-500/10';
	};

	const getProgressColor = () => {
		if (spendingPercent >= 90) return 'bg-red-500';
		if (spendingPercent >= 70) return 'bg-orange-500';
		return isAnhView ? 'bg-cyan-500' : 'bg-pink-500';
	};

	const getStatusIcon = () => {
		if (spendingPercent >= 90) return <AlertTriangle className='w-4 h-4 text-red-400' />;
		if (spendingPercent >= 70) return <TrendingUp className='w-4 h-4 text-orange-400' />;
		return <TrendingDown className='w-4 h-4 text-green-400' />;
	};

	/* Modal State */
	const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className={cn(
					'relative rounded-2xl p-4 overflow-hidden',
					'bg-gradient-to-br backdrop-blur-xl border border-white/10',
					getStatusColor()
				)}
			>
				{/* Animated ripple background */}
				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.1, 0.2, 0.1],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
						className={cn(
							'absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl',
							isAnhView ? 'bg-cyan-500/20' : 'bg-pink-500/20'
						)}
					/>
				</div>

				{/* Content */}
				<div className='relative z-10'>
					{/* Header */}
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center gap-2'>
							<div
								className={cn(
									'w-10 h-10 rounded-xl flex items-center justify-center',
									isAnhView ? 'bg-cyan-500/20' : 'bg-pink-500/20'
								)}
							>
								<Wallet
									className={cn('w-5 h-5', isAnhView ? 'text-cyan-400' : 'text-pink-400')}
								/>
							</div>
							<div>
								<p className='text-xs text-white/60'>Budget Buddy</p>
								<p className='text-sm font-medium text-white'>
									{isAnhView ? '💼 Anh - Treasurer' : '🛍️ Em - Shopper'}
								</p>
							</div>
						</div>
						{getStatusIcon()}
					</div>

					{/* Main Stats */}
					<div className='grid grid-cols-2 gap-4 mb-4'>
						<div>
							<p className='text-xs text-white/50 mb-1'>Đã chi tiêu</p>
							<p
								className={cn(
									'text-xl font-bold tabular-nums',
									isAnhView ? 'text-cyan-400' : 'text-pink-400'
								)}
							>
								{formatCurrency(totalSpent)}
							</p>
						</div>
						<div className='text-right'>
							<p className='text-xs text-white/50 mb-1'>Còn lại</p>
							<div 
								className='cursor-pointer active:scale-95 transition-transform'
								onClick={() => setIsLimitModalOpen(true)}
							>
								<p
									className={cn(
										'text-xl font-bold tabular-nums',
										remainingBudget < 500000 ? 'text-red-400' : 'text-green-400'
									)}
								>
									{formatCurrency(remainingBudget)}
								</p>
							</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className='space-y-2'>
						<div className='flex justify-between text-xs items-center'>
							<div 
								className='flex items-center gap-2 group cursor-pointer active:opacity-70 transition-opacity' 
								onClick={() => setIsLimitModalOpen(true)}
							>
								<span className='text-white/50 border-b border-dashed border-white/20 hover:border-white/50 transition-colors'>
									Ngân sách: {formatCurrency(maxBudget)}
								</span>
							</div>
							
							<span
								className={cn(
									'font-medium',
									spendingPercent >= 90
										? 'text-red-400'
										: spendingPercent >= 70
										? 'text-orange-400'
										: 'text-white/70'
								)}
							>
								{spendingPercent.toFixed(1)}%
							</span>
						</div>
						<div className='h-2 rounded-full bg-white/10 overflow-hidden'>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${spendingPercent}%` }}
								transition={{ duration: 0.8, ease: 'easeOut' }}
								className={cn('h-full rounded-full', getProgressColor())}
							/>
						</div>
					</div>
				</div>
			</motion.div>

			<BudgetLimitModal 
				isOpen={isLimitModalOpen} 
				onClose={() => setIsLimitModalOpen(false)} 
			/>
		</>
	);
}
