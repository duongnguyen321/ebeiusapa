import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Car,
	Home,
	UtensilsCrossed,
	Ticket,
	ShoppingBag,
	MoreHorizontal,
	BarChart3,
	PieChart,
} from 'lucide-react';
import { useBudget, BudgetCategory } from '@/contexts/BudgetContext';
import { formatCurrency } from './BudgetListItem';

type ChartView = 'day' | 'category';

const categoryIcons: Record<BudgetCategory, typeof Car> = {
	transport: Car,
	stay: Home,
	food: UtensilsCrossed,
	ticket: Ticket,
	shopping: ShoppingBag,
	other: MoreHorizontal,
};

const categoryLabels: Record<BudgetCategory, string> = {
	transport: 'Di chuyển',
	stay: 'Lưu trú',
	food: 'Ăn uống',
	ticket: 'Vé',
	shopping: 'Mua sắm',
	other: 'Khác',
};

const categoryColors: Record<BudgetCategory, string> = {
	transport: '#60A5FA', // blue-400
	stay: '#C084FC', // purple-400
	food: '#FB923C', // orange-400
	ticket: '#4ADE80', // green-400
	shopping: '#F472B6', // pink-400
	other: '#9CA3AF', // gray-400
};

const dayLabels = ['Trước', 'N1', 'N2', 'N3', 'N4'];

export function BudgetCharts() {
	const { items, role } = useBudget();
	const [view, setView] = useState<ChartView>('category');
	const isAnhView = role === 'anh';

	// Calculate spending by category
	const categoryData = useMemo(() => {
		const data: Record<BudgetCategory, number> = {
			transport: 0,
			stay: 0,
			food: 0,
			ticket: 0,
			shopping: 0,
			other: 0,
		};

		items.forEach((item) => {
			if (item.isPaid) {
				const amount = item.actualAmount || item.estimatedAmount;
				data[item.category] += amount;
			}
		});

		return Object.entries(data)
			.map(([category, amount]) => ({
				category: category as BudgetCategory,
				amount,
				label: categoryLabels[category as BudgetCategory],
				color: categoryColors[category as BudgetCategory],
				Icon: categoryIcons[category as BudgetCategory],
			}))
			.filter((d) => d.amount > 0)
			.sort((a, b) => b.amount - a.amount);
	}, [items]);

	// Calculate spending by day
	const dayData = useMemo(() => {
		const data: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

		items.forEach((item) => {
			if (item.isPaid) {
				const day = item.day ?? 1;
				const amount = item.actualAmount || item.estimatedAmount;
				data[day] += amount;
			}
		});

		return Object.entries(data).map(([day, amount]) => ({
			day: parseInt(day),
			amount,
			label: dayLabels[parseInt(day)],
		}));
	}, [items]);

	const totalSpent = useMemo(() => {
		return items
			.filter((item) => item.isPaid)
			.reduce((sum, item) => sum + (item.actualAmount || item.estimatedAmount), 0);
	}, [items]);

	const maxDayAmount = Math.max(...dayData.map((d) => d.amount), 1);

	// Pie chart calculations
	const pieSegments = useMemo(() => {
		if (totalSpent === 0) return [];

		let currentAngle = -90; // Start from top
		return categoryData.map((d) => {
			const percentage = (d.amount / totalSpent) * 100;
			const angle = (d.amount / totalSpent) * 360;
			const segment = {
				...d,
				percentage,
				startAngle: currentAngle,
				endAngle: currentAngle + angle,
			};
			currentAngle += angle;
			return segment;
		});
	}, [categoryData, totalSpent]);

	// Generate SVG path for pie segment
	const getArcPath = (
		cx: number,
		cy: number,
		r: number,
		startAngle: number,
		endAngle: number
	) => {
		const start = polarToCartesian(cx, cy, r, endAngle);
		const end = polarToCartesian(cx, cy, r, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

		return [
			'M',
			cx,
			cy,
			'L',
			start.x,
			start.y,
			'A',
			r,
			r,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y,
			'Z',
		].join(' ');
	};

	const polarToCartesian = (
		cx: number,
		cy: number,
		r: number,
		angle: number
	) => {
		const rad = (angle * Math.PI) / 180;
		return {
			x: cx + r * Math.cos(rad),
			y: cy + r * Math.sin(rad),
		};
	};

	if (totalSpent === 0) {
		return (
			<div className='text-center py-6'>
				<BarChart3 className='w-10 h-10 mx-auto text-white/20 mb-2' />
				<p className='text-sm text-white/40'>
					Chưa có chi tiêu nào được ghi nhận
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{/* Toggle Buttons */}
			<div className='flex gap-2 p-1 bg-white/5 rounded-xl'>
				<button
					onClick={() => setView('category')}
					className={cn(
						'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2',
						view === 'category'
							? isAnhView
								? 'bg-cyan-500/30 text-cyan-300'
								: 'bg-pink-500/30 text-pink-300'
							: 'text-white/50 hover:text-white/70'
					)}
				>
					<PieChart className='w-4 h-4' />
					Theo loại
				</button>
				<button
					onClick={() => setView('day')}
					className={cn(
						'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2',
						view === 'day'
							? isAnhView
								? 'bg-cyan-500/30 text-cyan-300'
								: 'bg-pink-500/30 text-pink-300'
							: 'text-white/50 hover:text-white/70'
					)}
				>
					<BarChart3 className='w-4 h-4' />
					Theo ngày
				</button>
			</div>

			<AnimatePresence mode='wait'>
				{view === 'category' ? (
					<motion.div
						key='category'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						className='space-y-4'
					>
						{/* Pie Chart */}
						<div className='flex items-center justify-center'>
							<div className='relative'>
								<svg width='160' height='160' viewBox='0 0 160 160'>
									{/* Background circle */}
									<circle
										cx='80'
										cy='80'
										r='70'
										fill='none'
										stroke='rgba(255,255,255,0.1)'
										strokeWidth='2'
									/>

									{/* Pie segments */}
									{pieSegments.map((segment, index) => (
										<motion.path
											key={segment.category}
											d={getArcPath(80, 80, 70, segment.startAngle, segment.endAngle)}
											fill={segment.color}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 0.8, scale: 1 }}
											transition={{ delay: index * 0.1 }}
											className='hover:opacity-100 transition-opacity cursor-pointer'
											style={{
												filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
											}}
										/>
									))}

									{/* Center circle */}
									<circle cx='80' cy='80' r='40' fill='hsl(222, 47%, 11%)' />

									{/* Center text */}
									<text
										x='80'
										y='75'
										textAnchor='middle'
										fill='white'
										fontSize='10'
										opacity='0.6'
									>
										Tổng chi
									</text>
									<text
										x='80'
										y='92'
										textAnchor='middle'
										fill={isAnhView ? '#22D3EE' : '#F472B6'}
										fontSize='12'
										fontWeight='bold'
									>
										{(totalSpent / 1000000).toFixed(1)}M
									</text>
								</svg>
							</div>
						</div>

						{/* Category Legend */}
						<div className='grid grid-cols-2 gap-2'>
							{categoryData.map((item) => {
								const Icon = item.Icon;
								return (
									<motion.div
										key={item.category}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className='flex items-center gap-2 p-2 rounded-lg bg-white/5'
									>
										<div
											className='w-3 h-3 rounded-full'
											style={{ backgroundColor: item.color }}
										/>
										<Icon className='w-4 h-4 text-white/50' />
										<div className='flex-1 min-w-0'>
											<p className='text-xs text-white/70 truncate'>{item.label}</p>
											<p className='text-xs font-medium text-white'>
												{formatCurrency(item.amount)}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				) : (
					<motion.div
						key='day'
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className='space-y-4'
					>
						{/* Bar Chart */}
						<div className='h-40 flex items-end justify-around gap-2 px-2'>
							{dayData.map((item, index) => {
								const heightPercent = (item.amount / maxDayAmount) * 100;
								return (
									<div
										key={item.day}
										className='flex-1 flex flex-col items-center gap-1'
									>
										<motion.div
											initial={{ height: 0 }}
											animate={{ height: `${Math.max(heightPercent, 5)}%` }}
											transition={{ delay: index * 0.1, duration: 0.5 }}
											className={cn(
												'w-full rounded-t-lg relative overflow-hidden',
												isAnhView
													? 'bg-gradient-to-t from-cyan-600 to-cyan-400'
													: 'bg-gradient-to-t from-pink-600 to-pink-400'
											)}
											style={{ minHeight: item.amount > 0 ? '20px' : '4px' }}
										>
											{/* Shimmer effect */}
											<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer' />
										</motion.div>
										<p className='text-xs text-white/50'>{item.label}</p>
									</div>
								);
							})}
						</div>

						{/* Day Details */}
						<div className='space-y-2'>
							{dayData
								.filter((d) => d.amount > 0)
								.map((item) => (
									<div
										key={item.day}
										className='flex items-center justify-between p-2 rounded-lg bg-white/5'
									>
										<div className='flex items-center gap-2'>
											<div
												className={cn(
													'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
													isAnhView ? 'bg-cyan-500/20 text-cyan-300' : 'bg-pink-500/20 text-pink-300'
												)}
											>
												{item.label}
											</div>
											<p className='text-sm text-white/70'>
												{item.day === 0 ? 'Trước chuyến đi' : `Ngày ${item.day}`}
											</p>
										</div>
										<p
											className={cn(
												'text-sm font-semibold tabular-nums',
												isAnhView ? 'text-cyan-400' : 'text-pink-400'
											)}
										>
											{formatCurrency(item.amount)}
										</p>
									</div>
								))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
