import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
	Car,
	Home,
	UtensilsCrossed,
	Ticket,
	ShoppingBag,
	MoreHorizontal,
	Check,
	Pencil,
	Trash2,
} from 'lucide-react';
import { BudgetCategory, BudgetItem } from '@/contexts/BudgetContext';
import { forwardRef } from 'react';

interface BudgetListItemProps {
	item: BudgetItem;
	isAnhView: boolean;
	onTogglePaid: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

const categoryIcons: Record<BudgetCategory, typeof Car> = {
	transport: Car,
	stay: Home,
	food: UtensilsCrossed,
	ticket: Ticket,
	shopping: ShoppingBag,
	other: MoreHorizontal,
};

const categoryColors: Record<BudgetCategory, string> = {
	transport: 'text-blue-400',
	stay: 'text-purple-400',
	food: 'text-orange-400',
	ticket: 'text-green-400',
	shopping: 'text-pink-400',
	other: 'text-gray-400',
};

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

export const BudgetListItem = forwardRef<HTMLDivElement, BudgetListItemProps>(
	(
		{ item, isAnhView, onTogglePaid, onEdit, onDelete }: BudgetListItemProps,
		ref
	) => {
		const Icon = categoryIcons[item.category];
		const colorClass = categoryColors[item.category];
		const displayAmount = item.actualAmount || item.estimatedAmount;

		return (
			<motion.div
				ref={ref}
				layout
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, x: -100 }}
				className={cn(
					'relative rounded-xl p-3 transition-all duration-300',
					isAnhView
						? // Anh view: Glass strips
						  item.isPaid
							? 'bg-white/5 border border-white/5'
							: 'glass-panel border-white/15'
						: // Em view: Bubble items
						  item.isPaid
							? 'bg-pink-500/5 border border-pink-500/10 rounded-2xl'
							: 'bg-pink-500/10 border border-pink-500/20 rounded-2xl'
				)}
			>
				<div className='flex items-center gap-3'>
					{/* Checkbox */}
					<button
						onClick={onTogglePaid}
						className={cn(
							'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
							item.isPaid
								? isAnhView
									? 'bg-cyan-500 border-cyan-500 text-white'
									: 'bg-pink-500 border-pink-500 text-white'
								: 'border-white/30 hover:border-white/50'
						)}
					>
						{item.isPaid && <Check className='w-3.5 h-3.5' />}
					</button>

					{/* Icon */}
					<div
						className={cn(
							'w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm',
							item.isPaid ? 'bg-white/5' : 'bg-white/10',
							colorClass
						)}
					>
						<Icon className='w-4 h-4' />
					</div>

					{/* Content */}
					<div className='flex-1 min-w-0'>
						<p
							className={cn(
								'text-sm font-medium truncate transition-all',
								item.isPaid ? 'text-white/50 line-through' : 'text-white'
							)}
						>
							{item.title}
						</p>
						<p
							className={cn(
								'text-xs transition-all',
								item.isPaid ? 'text-white/30' : 'text-white/60'
							)}
						>
							{
								item.estimatedAmount > 0 &&
								item.actualAmount > 0 &&
								item.actualAmount !== item.estimatedAmount
									? `Dự kiến: ${formatCurrency(item.estimatedAmount)}`
									: null
							}
						</p>
					</div>

					{/* Amount */}
					<div className='text-right'>
						<p
							className={cn(
								'text-sm font-semibold tabular-nums transition-all',
								item.isPaid
									? 'text-white/50'
									: isAnhView
									? 'text-cyan-400'
									: 'text-pink-400'
							)}
						>
							{formatCurrency(displayAmount)}
						</p>
					</div>

					{/* Actions */}
					<div className='flex items-center gap-1 ml-1'>
						<button
							onClick={onEdit}
							className='p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors'
						>
							<Pencil className='w-3.5 h-3.5' />
						</button>
						<button
							onClick={onDelete}
							className='p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors'
						>
							<Trash2 className='w-3.5 h-3.5' />
						</button>
					</div>
				</div>
			</motion.div>
		);
	}
);

BudgetListItem.displayName = 'BudgetListItem';
