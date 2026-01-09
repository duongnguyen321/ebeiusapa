import { motion } from 'framer-motion';
import { Power } from 'lucide-react';
import type { DaySchedule } from '@/data/itinerary';
import DayCard from './DayCard';
import TripHeader from './TripHeader';
import EmergencyPanel from './EmergencyPanel';

interface TimelineViewProps {
	itinerary: DaySchedule[];
	expandedDay: number | null;
	onToggleDay: (dayId: number) => void;
	onReset: () => void;
}

const TimelineView = ({
	itinerary,
	expandedDay,
	onToggleDay,
	onReset,
}: TimelineViewProps) => {
	return (
		<motion.div
			key='timeline'
			className='min-h-screen p-6 md:p-12 relative z-10'
			initial={{ opacity: 0, scale: 1.02 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
		>
			{/* Emergency Panel - Floating Button */}
			<EmergencyPanel />

			{/* Exit Button - Floating Action Button (Bottom Right) */}
			<button
				onClick={onReset}
				className='fixed bottom-8 right-8 z-20 w-14 h-14 flex items-center justify-center glass-panel rounded-full hover:bg-white/20 transition-all hover:scale-110 shadow-2xl'
				aria-label='Thoát'
			>
				<Power className='w-6 h-6 text-white' />
			</button>

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
						Hành trình 4 ngày 3 đêm tại Sapa • 15-18/01/2026
					</p>
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
								onToggle={() => onToggleDay(day.id)}
							/>
						</motion.div>
					))}
				</div>

				{/* Footer */}
				<motion.div
					className='mt-8 md:mt-12 text-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
				>
					<p className='text-white/40 text-sm'>
						Made with ❤️ for an unforgettable journey
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default TimelineView;
