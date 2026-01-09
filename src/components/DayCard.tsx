import { motion } from 'framer-motion';
import {
	X,
	Clock,
	Heart,
	Target,
	AlertTriangle,
	DollarSign,
} from 'lucide-react';
import { useEffect } from 'react';
import type { DaySchedule } from '@/data/itinerary';
import WeatherIcon from './WeatherIcon';
import TimelineItem from './TimelineItem';
import confetti from 'canvas-confetti';

interface DayCardProps {
	day: DaySchedule;
	isExpanded: boolean;
	onToggle: () => void;
}

const DayCard = ({ day, isExpanded, onToggle }: DayCardProps) => {
	// Auto-trigger confetti when birthday modal opens
	useEffect(() => {
		if (isExpanded && day.isBirthday) {
			const duration = 3000;
			const animationEnd = Date.now() + duration;
			const defaults = {
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 9999,
			};

			const randomInRange = (min: number, max: number) =>
				Math.random() * (max - min) + min;

			const interval = setInterval(() => {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					return clearInterval(interval);
				}

				const particleCount = 50 * (timeLeft / duration);

				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				});
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				});
			}, 250);

			return () => clearInterval(interval);
		}
	}, [isExpanded, day.isBirthday]);

	if (isExpanded) {
		return (
			<>
				{/* Backdrop - renders first */}
				<motion.div
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
					onClick={onToggle}
				/>

				{/* Content - fullscreen on mobile, inset on desktop */}
				<motion.div
					layoutId={`day-${day.id}`}
					className='fixed inset-0 md:inset-8 z-[100] glass-panel md:rounded-3xl overflow-hidden pointer-events-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 600,
						damping: 20,
						mass: 0.4,
					}}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button - Prominent */}
					<button
						onClick={onToggle}
						className='absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center glass-panel rounded-full hover:bg-white/20 transition-colors'
						aria-label='Đóng'
					>
						<X className='w-5 h-5 text-white' />
					</button>

					<div className='h-full overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-hide'>
						{/* Header */}
						<div className='mb-4 md:mb-6 pr-12'>
							<div className='flex items-start justify-between mb-3 md:mb-4'>
								<div>
									<motion.div
										className='text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-1 md:mb-2'
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.1 }}
									>
										Ngày {day.id}
									</motion.div>
									<motion.h2
										className='text-xl md:text-2xl lg:text-3xl font-playfair text-amber-400 mb-1 md:mb-2'
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.15 }}
									>
										{day.title}
									</motion.h2>
									<motion.p
										className='text-sm md:text-base text-white/60'
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.2 }}
									>
										{day.dateLabel}
									</motion.p>
								</div>

								<WeatherIcon
									icon={day.weather.icon}
									className='w-10 h-10 md:w-12 md:h-12 text-amber-400'
								/>
							</div>

							{/* Theme & Goals */}
							{day.theme && (
								<motion.div
									className='mb-3 flex items-center gap-2 text-purple-400'
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.22 }}
								>
									<Target className='w-4 h-4' />
									<span className='text-sm font-medium'>{day.theme}</span>
								</motion.div>
							)}

							{/* Goals */}
							{day.goals && day.goals.length > 0 && (
								<motion.div
									className='mb-3 glass-panel p-3 rounded-xl'
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.24 }}
								>
									<div className='text-white/50 text-xs mb-1'>🎯 Mục tiêu</div>
									<ul className='space-y-1'>
										{day.goals.map((goal, idx) => (
											<li
												key={idx}
												className='text-white/80 text-sm flex items-start gap-2'
											>
												<span className='text-amber-400'>•</span>
												{goal}
											</li>
										))}
									</ul>
								</motion.div>
							)}

							{/* Warnings */}
							{day.warnings && day.warnings.length > 0 && (
								<motion.div
									className='mb-3 space-y-1'
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.26 }}
								>
									{day.warnings.map((warning, idx) => (
										<div
											key={idx}
											className='flex items-start gap-2 text-orange-400 text-sm bg-orange-500/10 border border-orange-500/20 px-3 py-2 rounded-lg'
										>
											<AlertTriangle className='w-4 h-4 mt-0.5 flex-shrink-0' />
											<span>{warning}</span>
										</div>
									))}
								</motion.div>
							)}

							<div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm'>
								<div className='glass-panel p-2 md:p-3 rounded-lg md:rounded-xl'>
									<div className='text-white/50 mb-0.5 md:mb-1'>Thời tiết</div>
									<div className='text-white'>{day.weather.description}</div>
								</div>
								<div className='glass-panel p-2 md:p-3 rounded-lg md:rounded-xl'>
									<div className='text-white/50 mb-0.5 md:mb-1'>Nhiệt độ</div>
									<div className='text-amber-400'>{day.weather.temp}</div>
								</div>
								<div className='glass-panel p-2 md:p-3 rounded-lg md:rounded-xl'>
									<div className='text-white/50 mb-0.5 md:mb-1'>
										Outfit gợi ý
									</div>
									<div className='text-white'>{day.outfit}</div>
								</div>
								{day.budgetEstimate && (
									<div className='glass-panel p-2 md:p-3 rounded-lg md:rounded-xl'>
										<div className='text-white/50 mb-0.5 md:mb-1 flex items-center gap-1'>
											<DollarSign className='w-3 h-3' />
											Ngân sách ước tính
										</div>
										<div className='text-emerald-400'>{day.budgetEstimate}</div>
									</div>
								)}
							</div>
						</div>

						{/* Timeline */}
						<div className='space-y-2 md:space-y-3'>
							<h3 className='text-white font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2'>
								<Clock className='w-4 h-4 md:w-5 md:h-5 text-amber-400' />
								Lịch trình chi tiết
							</h3>
							{day.timeline.map((item, idx) => (
								<TimelineItem key={idx} item={item} />
							))}
						</div>
					</div>
				</motion.div>
			</>
		);
	}

	// Collapsed state
	return (
		<motion.div
			layoutId={`day-${day.id}`}
			onClick={onToggle}
			className='glass-panel p-4 md:p-6 rounded-xl md:rounded-2xl cursor-pointer'
			whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
			whileTap={{ scale: 0.99 }}
			transition={{ type: 'spring', stiffness: 250, damping: 35, mass: 1 }}
		>
			<div className='flex items-start justify-between mb-2 md:mb-3'>
				<div>
					<div className='text-3xl md:text-4xl font-playfair text-white mb-1'>
						Ngày {day.id}
					</div>
					<h3 className='text-lg md:text-xl font-playfair text-amber-400 mb-0.5 md:mb-1'>
						{day.title}
					</h3>
					<p className='text-xs md:text-sm text-white/60'>{day.dateLabel}</p>
				</div>
				<WeatherIcon
					icon={day.weather.icon}
					className='w-6 h-6 md:w-8 md:h-8 text-amber-400'
				/>
			</div>

			{/* Theme */}
			{day.theme && (
				<div className='flex items-center gap-2 text-purple-400 text-xs mb-2'>
					<Target className='w-3 h-3' />
					<span>{day.theme}</span>
				</div>
			)}

			<div className='flex items-center gap-2 text-white/50 text-xs md:text-sm'>
				<span>{day.weather.description}</span>
				<span>•</span>
				<span className='text-amber-400/80'>{day.weather.temp}</span>
				{day.budgetEstimate && (
					<>
						<span>•</span>
						<span className='text-emerald-400/80'>{day.budgetEstimate}</span>
					</>
				)}
			</div>

			{day.isBirthday && (
				<div className='mt-2 md:mt-3 flex items-center gap-2 text-pink-400 text-xs md:text-sm'>
					<Heart className='w-3 h-3 md:w-4 md:h-4 fill-pink-400' />
					<span>Ngày đặc biệt</span>
				</div>
			)}
		</motion.div>
	);
};

export default DayCard;
