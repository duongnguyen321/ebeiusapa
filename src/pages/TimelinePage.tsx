import BottomNavbar from '@/components/BottomNavbar';
import BottomSheet from '@/components/BottomSheet';
import DayCard from '@/components/DayCard';
import EmergencyPanel from '@/components/EmergencyPanel';
import GamesModal from '@/components/GamesModal';
import { PageTransition } from '@/components/PageTransition';
import { ScratchCard } from '@/components/ScratchCard';
import { LetterCard, SecretLetter } from '@/components/SecretLetter';
import TripHeader from '@/components/TripHeader';
import { useTrip } from '@/contexts/TripContext';
import { itinerary } from '@/data/itinerary';
import { loveLetters } from '@/data/letters';
import { useActiveTimeline } from '@/hooks/useActiveTimeline';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TimelinePage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isUnlocked, lockApp } = useTrip();
	const activeTimeline = useActiveTimeline();

	// Modals State
	const [showScratchCard, setShowScratchCard] = useState(false);
	const [showLetters, setShowLetters] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
	const [showGames, setShowGames] = useState(false);

	const [expandedDay, setExpandedDay] = useState<number | null>(null);
	const [showEmergency, setShowEmergency] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Re-open modals from navigation state
	useEffect(() => {
		if (location.state?.showGames) {
			setShowGames(true);
			// Clear state to prevent reopening on reload/subsequent Navigations if needed
			// navigate('.', { replace: true, state: {} });
			// But careful not to trigger re-render cycle issues.
			// For now leaving it as is, or we can use a ref to track if handled.
		}
	}, [location.state]);

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

	const handleSelectGame = (gameId: string) => {
		setShowGames(false);
		navigate(`/games/${gameId}`);
	};

	if (!isUnlocked) return null;

	return (
		<PageTransition variant='fade'>
			<div
				ref={containerRef}
				className='min-h-screen p-6 pb-24 md:p-12 md:pb-28 relative z-10'
			>
				{/* Emergency Panel */}
				<EmergencyPanel
					isOpen={showEmergency}
					onClose={() => setShowEmergency(false)}
				/>

				{/* Bottom Navigation Bar */}
				<BottomNavbar
					onEmergency={() => setShowEmergency(true)}
					onScratchCard={() => setShowScratchCard(true)}
					onLetters={() => setShowLetters(!showLetters)}
					onGames={() => setShowGames(true)}
					onExit={() => lockApp()}
					showLettersActive={showLetters}
					showGamesActive={showGames}
				/>

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

				{/* Love Letters Bottom Sheet Modal */}
				<BottomSheet
					isOpen={showLetters}
					onClose={() => setShowLetters(false)}
					title='Thư bí mật mỗi ngày'
					icon={<Heart className='w-5 h-5 text-pink-400 fill-pink-400' />}
					maxWidth='md:max-w-lg'
				>
					<div className='flex md:grid md:grid-cols-2 gap-3 overflow-x-auto pb-2 md:overflow-x-visible snap-x snap-mandatory'>
						{loveLetters.map((_, index) => (
							<div
								key={index}
								className='flex-shrink-0 w-[75vw] md:w-full snap-center'
							>
								<LetterCard
									letterIndex={index}
									onClick={() => {
										setSelectedLetter(index);
										setShowLetters(false);
									}}
								/>
							</div>
						))}
					</div>
				</BottomSheet>

				{/* Scratch Card Modal */}
				<BottomSheet
					isOpen={showScratchCard}
					onClose={() => setShowScratchCard(false)}
					title='🎁 Thẻ Cào May Mắn'
					maxWidth='md:max-w-sm'
				>
					<ScratchCard onComplete={() => {}} />
				</BottomSheet>

				{/* Secret Letter Modal */}
				<SecretLetter
					letterIndex={selectedLetter ?? 0}
					isOpen={selectedLetter !== null}
					onClose={() => setSelectedLetter(null)}
				/>

				{/* Games Modal */}
				<GamesModal
					isOpen={showGames}
					onClose={() => setShowGames(false)}
					onSelectGame={handleSelectGame}
				/>
			</div>
		</PageTransition>
	);
}
