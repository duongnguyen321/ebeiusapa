import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { itinerary, targetDate } from '@/data/itinerary';
import NoiseBackground from '@/components/NoiseBackground';
import IntroView from '@/components/IntroView';
import TimelineView from '@/components/TimelineView';
import { BirthdayCelebration } from '@/components/BirthdayCelebration';
import { SurpriseProvider } from '@/contexts/SurpriseContext';
import { useActiveTimeline } from '@/hooks/useActiveTimeline';
import { useNotifications } from '@/hooks/useNotifications';

const IndexContent = () => {
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [expandedDay, setExpandedDay] = useState<number | null>(null);
	const activeTimeline = useActiveTimeline();
	const { scheduleNotifications, permission, isSupported } = useNotifications();

	// Auto-expand active day
	useEffect(() => {
		if (isUnlocked && activeTimeline.activeDay) {
			setExpandedDay(activeTimeline.activeDay.id);
		}
	}, [isUnlocked, activeTimeline.activeDay?.id]);

	// Schedule notifications when unlocked
	useEffect(() => {
		if (isUnlocked && isSupported && permission === 'granted') {
			scheduleNotifications();
		}
	}, [isUnlocked, isSupported, permission, scheduleNotifications]);

	const handleToggleDay = (dayId: number) => {
		setExpandedDay(expandedDay === dayId ? null : dayId);
	};

	const handleReset = () => {
		setExpandedDay(null);
		setIsUnlocked(false);
	};

	return (
		<div className='min-h-screen overflow-x-hidden relative bg-slate-900'>
			<NoiseBackground />

			<AnimatePresence mode='wait'>
				{!isUnlocked ? (
					<IntroView
						targetDate={targetDate}
						onUnlock={() => setIsUnlocked(true)}
					/>
				) : (
					<TimelineView
						itinerary={itinerary}
						expandedDay={expandedDay}
						onToggleDay={handleToggleDay}
						onReset={handleReset}
						activeTimeline={activeTimeline}
					/>
				)}
			</AnimatePresence>

			{/* Birthday Celebration - triggers on 16/01/2026 */}
			<BirthdayCelebration />
		</div>
	);
};

const Index = () => {
	return (
		<SurpriseProvider>
			<IndexContent />
		</SurpriseProvider>
	);
};

export default Index;
