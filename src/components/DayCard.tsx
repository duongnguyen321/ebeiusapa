import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Target, AlertTriangle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { DaySchedule } from '@/data/itinerary';
import WeatherIcon from './WeatherIcon';
import TimelineItem from './TimelineItem';
import confetti from 'canvas-confetti';
import ExpandableCardModal from './ExpandableCardModal';

interface DayCardProps {
	day: DaySchedule;
	isExpanded: boolean;
	onToggle: () => void;
	isActiveDay?: boolean;
	activeItemIndex?: number;
	upcomingItemIndex?: number;
}

const DayCard = ({
	day,
	isExpanded,
	onToggle,
	isActiveDay = false,
	activeItemIndex = -1,
	upcomingItemIndex = -1,
}: DayCardProps) => {
	const activeItemRef = useRef<HTMLDivElement>(null);

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

	// Auto-scroll to active item when expanded
	useEffect(() => {
		if (isExpanded && isActiveDay && activeItemRef.current) {
			setTimeout(() => {
				activeItemRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}, 300);
		}
	}, [isExpanded, isActiveDay]);

	// Always render collapsed card + modal overlay
	return (
		<>
			{/* Collapsed Card - Always rendered */}
			<motion.div
				onClick={onToggle}
				className={cn(
					'glass-panel p-4 md:p-6 rounded-xl md:rounded-2xl cursor-pointer',
					isActiveDay && 'timeline-active',
					isExpanded && 'invisible'
				)}
				whileHover={
					!isExpanded
						? { y: -3, transition: { duration: 0.3, ease: 'easeOut' } }
						: undefined
				}
				whileTap={!isExpanded ? { scale: 0.99 } : undefined}
				transition={{ type: 'spring', stiffness: 250, damping: 35, mass: 1 }}
			>
				<div className='flex items-start justify-between mb-2 md:mb-3'>
					<div>
						<div className='flex items-center gap-3'>
							<div className='text-3xl md:text-4xl font-playfair text-white mb-1'>
								Ngày {day.id}
							</div>
							{isActiveDay && (
								<span className='badge-active text-xs'>Hôm nay</span>
							)}
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
				</div>

				{day.isBirthday && (
					<div className='mt-2 md:mt-3 flex items-center gap-2 text-pink-400 text-xs md:text-sm'>
						<Heart className='w-3 h-3 md:w-4 md:h-4 fill-pink-400' />
						<span>Ngày đặc biệt</span>
					</div>
				)}
			</motion.div>

			{/* Modal - AnimatePresence for enter/exit animations */}
			<AnimatePresence>
				{isExpanded && (
					<ExpandableCardModal isOpen={isExpanded} onClose={onToggle}>
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

							{/* Active Day Badge */}
							{isActiveDay && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className='inline-flex items-center gap-2 badge-active mb-3'
								>
									<span className='relative flex h-2 w-2'>
										<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75'></span>
										<span className='relative inline-flex rounded-full h-2 w-2 bg-white'></span>
									</span>
									Hôm nay
								</motion.div>
							)}

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
							</div>
						</div>

						{/* Timeline */}
						<div className='space-y-2 md:space-y-3'>
							<h3 className='text-white font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2'>
								<Clock className='w-4 h-4 md:w-5 md:h-5 text-amber-400' />
								Lịch trình chi tiết
							</h3>
							{day.timeline.map((item, idx) => (
								<div
									key={idx}
									ref={idx === activeItemIndex ? activeItemRef : null}
								>
									<TimelineItem
										item={item}
										isActive={idx === activeItemIndex}
										isUpcoming={idx === upcomingItemIndex}
									/>
								</div>
							))}
						</div>
					</ExpandableCardModal>
				)}
			</AnimatePresence>
		</>
	);
};

export default DayCard;
