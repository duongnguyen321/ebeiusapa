import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import type { DaySchedule } from '@/data/itinerary';
import type { ActiveTimelineState } from '@/hooks/useActiveTimeline';
import DayCard from './DayCard';
import TripHeader from './TripHeader';
import EmergencyPanel from './EmergencyPanel';
import { ScratchCard } from './ScratchCard';
import { LetterCard, SecretLetter } from './SecretLetter';
import { loveLetters } from '@/data/letters';
import BottomNavbar from './BottomNavbar';
import GamesModal from './GamesModal';
import { MistWhispersGame, HighlandDiceGame, LoveSwipeGame } from './games';

interface TimelineViewProps {
	itinerary: DaySchedule[];
	expandedDay: number | null;
	onToggleDay: (dayId: number) => void;
	onReset: () => void;
	activeTimeline?: ActiveTimelineState;
}

const TimelineView = ({
	itinerary,
	expandedDay,
	onToggleDay,
	onReset,
	activeTimeline,
}: TimelineViewProps) => {
	const [showScratchCard, setShowScratchCard] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
	const [showLetters, setShowLetters] = useState(false);
	const [showEmergency, setShowEmergency] = useState(false);
	const [showGames, setShowGames] = useState(false);
	const [activeGame, setActiveGame] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleSelectGame = (gameId: string) => {
		setActiveGame(gameId);
		setShowGames(false);
	};

	const handleCloseGame = () => {
		setActiveGame(null);
		setShowGames(true); // Re-open game selection
	};

	return (
		<motion.div
			key='timeline'
			ref={containerRef}
			className='min-h-screen p-6 pb-24 md:p-12 md:pb-28 relative z-10'
			initial={{ opacity: 0, scale: 1.02 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
		>
			{/* Emergency Panel */}
			<EmergencyPanel
				isOpen={showEmergency}
				onClose={() => setShowEmergency(false)}
			/>

			{/* Bottom Navigation Bar - Liquid Glass Style */}
			<BottomNavbar
				onEmergency={() => setShowEmergency(true)}
				onScratchCard={() => setShowScratchCard(true)}
				onLetters={() => setShowLetters(!showLetters)}
				onGames={() => setShowGames(true)}
				onExit={onReset}
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
								onToggle={() => onToggleDay(day.id)}
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
			{showLetters && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm'
					onClick={() => setShowLetters(false)}
				>
					<motion.div
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: '100%', opacity: 0 }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className='w-full md:max-w-lg md:mx-4'
					>
						<div className='glass-card rounded-t-3xl md:rounded-2xl overflow-hidden'>
							{/* Handle bar for mobile */}
							<div className='flex justify-center pt-3 pb-1 md:hidden'>
								<div className='w-10 h-1 bg-white/30 rounded-full' />
							</div>

							{/* Header */}
							<div className='p-4 pb-2 flex items-center justify-between border-b border-white/10'>
								<h3 className='text-lg font-display text-white flex items-center gap-2'>
									<Heart className='w-5 h-5 text-pink-400 fill-pink-400' />
									Thư bí mật mỗi ngày
								</h3>
								<button
									onClick={() => setShowLetters(false)}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
									aria-label='Đóng'
								>
									<svg
										className='w-5 h-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							</div>

							{/* Letter cards - horizontal scroll on mobile, grid on desktop */}
							<div className='p-4 max-h-[60vh] overflow-y-auto'>
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
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Scratch Card Modal */}
			{showScratchCard && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
					onClick={() => setShowScratchCard(false)}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						onClick={(e) => e.stopPropagation()}
						className='w-full max-w-sm'
					>
						<div className='glass-card p-6'>
							<h3 className='text-xl font-display text-white mb-4 text-center'>
								🎁 Thẻ Cào May Mắn
							</h3>
							<ScratchCard onComplete={() => {}} />
							<button
								onClick={() => setShowScratchCard(false)}
								className='mt-4 w-full glass-button py-3 text-center'
							>
								Đóng
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}

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

			{/* Active Game Components */}
			{activeGame === 'mist-whispers' && (
				<MistWhispersGame onClose={handleCloseGame} />
			)}
			{activeGame === 'highland-dice' && (
				<HighlandDiceGame onClose={handleCloseGame} />
			)}
			{activeGame === 'love-swipe' && (
				<LoveSwipeGame onClose={handleCloseGame} />
			)}
		</motion.div>
	);
};

export default TimelineView;
