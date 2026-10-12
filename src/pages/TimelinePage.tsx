import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/PageTransition';
import DayCard from '@/components/DayCard';
import TripHeader from '@/components/TripHeader';
import { useTrip } from '@/contexts/TripContext';
import { itinerary } from '@/data/itinerary';
import { useActiveTimeline } from '@/hooks/useActiveTimeline';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TimelinePage() {
	const navigate = useNavigate();
	const { isUnlocked } = useTrip();
	const activeTimeline = useActiveTimeline();

	const [expandedDay, setExpandedDay] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Protect route
	useEffect(() => {
		if (!isUnlocked) {
			navigate('/', { replace: true });
		}
	}, [isUnlocked, navigate]);

	// Auto-expand active day
	useEffect(() => {
		if (activeTimeline.activeDay) {
			setExpandedDay(activeTimeline.activeDay.id);
		}
	}, [activeTimeline.activeDay?.id]);

	const handleToggleDay = (dayId: number) => {
		setExpandedDay(expandedDay === dayId ? null : dayId);
	};

	if (!isUnlocked) return null;

	return (
		<PageTransition variant='fade'>
			<div
				ref={containerRef}
				className='min-h-screen p-6 md:p-12 relative z-10'
			>
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<motion.div
						className='text-center mb-6 md:mb-8'
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<h1 className='text-3xl md:text-4xl lg:text-6xl font-playfair text-white mb-2 md:mb-3'>
							THE MISTY DATE
						</h1>
						<p className='text-sm md:text-base text-white/60'>
							Hành trình 6 ngày 5 đêm • Sapa - Lào Cai - Hà Khẩu • 28/12/2026 - 02/01/2027
						</p>

						{/* Status Badge */}
						{activeTimeline?.status === 'during-trip' &&
							activeTimeline.upcomingItem && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='mt-4 inline-flex items-center gap-2 badge-upcoming px-4 py-2 rounded-full'
								>
									<span className='relative flex h-2 w-2'>
										<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
										<span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
									</span>
									<span className='text-sm'>
										Sắp tới: {activeTimeline.upcomingItem.title}
										{activeTimeline.minutesUntilNext &&
											activeTimeline.minutesUntilNext <= 60 && (
												<span className='ml-2 text-cyan-300'>
													({activeTimeline.minutesUntilNext} phút nữa)
												</span>
											)}
									</span>
								</motion.div>
							)}
					</motion.div>

					{/* Trip Info Header */}
					<TripHeader />

					{/* Day Cards */}
					<div className='space-y-4'>
						{itinerary.map((day, idx) => (
							<motion.div
								key={day.id}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									delay: idx * 0.08 + 0.2,
									type: 'spring',
									stiffness: 200,
									damping: 30,
									mass: 0.8,
								}}
							>
								<DayCard
									day={day}
									isExpanded={expandedDay === day.id}
									onToggle={() => handleToggleDay(day.id)}
									isActiveDay={activeTimeline?.activeDayIndex === idx}
									activeItemIndex={
										activeTimeline?.activeDayIndex === idx
											? activeTimeline.activeItemIndex
											: -1
									}
									upcomingItemIndex={
										activeTimeline?.activeDayIndex === idx
											? activeTimeline.upcomingItemIndex
											: -1
									}
								/>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</PageTransition>
	);
}
