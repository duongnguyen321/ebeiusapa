import { useState, useCallback, useRef } from 'react';
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useTransform,
	PanInfo,
} from 'framer-motion';
import { X, Heart, XCircle, Repeat, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
	getBalancedDeck,
	heatLevelColors,
	heatLevelLabels,
	type SwipeCard,
} from '@/data/games/loveSwipe';

type GamePhase = 'player1' | 'handoff' | 'player2' | 'results';

interface LoveSwipeGameProps {
	onClose: () => void;
}

export function LoveSwipeGame({ onClose }: LoveSwipeGameProps) {
	const [cards] = useState(() => getBalancedDeck(10));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [player1Choices, setPlayer1Choices] = useState<Record<number, boolean>>(
		{}
	);
	const [player2Choices, setPlayer2Choices] = useState<Record<number, boolean>>(
		{}
	);
	const [phase, setPhase] = useState<GamePhase>('player1');
	const [matches, setMatches] = useState<SwipeCard[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const [flyX, setFlyX] = useState(0);

	// Swipe motion values for drag
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 200], [-15, 15]);
	const likeOpacity = useTransform(x, [0, 100], [0, 1]);
	const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

	const currentCard =
		phase === 'player1' || phase === 'player2' ? cards[currentIndex] : null;
	const showControls = phase === 'player1' || phase === 'player2';

	const handleSwipe = useCallback(
		(direction: 'left' | 'right') => {
			if (!currentCard || isAnimating) return;

			setIsAnimating(true);

			// Animate card flying away
			setFlyX(direction === 'right' ? 400 : -400);
			x.set(0);

			const isYes = direction === 'right';

			// After animation, update state
			setTimeout(() => {
				setFlyX(0);
				setIsAnimating(false);

				if (phase === 'player1') {
					setPlayer1Choices((prev) => ({ ...prev, [currentCard.id]: isYes }));
				} else if (phase === 'player2') {
					const newPlayer2Choices = {
						...player2Choices,
						[currentCard.id]: isYes,
					};
					setPlayer2Choices(newPlayer2Choices);

					if (currentIndex + 1 >= cards.length) {
						const matchedCards = cards.filter((card) => {
							const p1Yes = player1Choices[card.id];
							const p2Yes = newPlayer2Choices[card.id];
							return p1Yes && p2Yes;
						});

						setMatches(matchedCards);
						setPhase('results');

						if (matchedCards.length > 0) {
							confetti({
								particleCount: 100 * matchedCards.length,
								spread: 70,
								origin: { y: 0.6 },
								colors: ['#ff6b9d', '#a855f7', '#22d3ee', '#fbbf24'],
							});
						}
						return;
					}
				}

				if (currentIndex + 1 >= cards.length) {
					if (phase === 'player1') {
						setPhase('handoff');
						setCurrentIndex(0);
					}
				} else {
					setCurrentIndex((prev) => prev + 1);
				}
			}, 250);
		},
		[
			cards,
			currentCard,
			currentIndex,
			phase,
			player1Choices,
			player2Choices,
			x,
			isAnimating,
		]
	);

	const handleDragEnd = (_: any, info: PanInfo) => {
		if (isAnimating) return;
		if (info.offset.x > 100 || info.velocity.x > 500) {
			handleSwipe('right');
		} else if (info.offset.x < -100 || info.velocity.x < -500) {
			handleSwipe('left');
		}
	};

	const handleHandoffComplete = () => {
		setPhase('player2');
	};

	const handlePlayAgain = () => {
		setCurrentIndex(0);
		setPlayer1Choices({});
		setPlayer2Choices({});
		setMatches([]);
		setPhase('player1');
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: '100%', scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: '100%', scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
			className='fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-rose-950 via-slate-900 to-red-950'
		>
			{/* Background orbs */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/3 left-1/4 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700' />
			</div>

			{/* Header */}
			<div className='relative z-10 flex items-center justify-between p-4'>
				<div className='flex items-center gap-2'>
					<span className='text-2xl'>💕</span>
					{showControls && (
						<>
							<span
								className={`px-2 py-1 rounded-full text-xs font-bold ${
									phase === 'player1' ? 'bg-blue-500' : 'bg-pink-500'
								} text-white`}
							>
								{phase === 'player1' ? 'Player 1' : 'Player 2'}
							</span>
							<span className='text-white/60 text-sm'>
								{currentIndex + 1} / {cards.length}
							</span>
						</>
					)}
				</div>
				<button
					onClick={onClose}
					className='p-2 rounded-full glass-button text-white/60 hover:text-white'
				>
					<X className='w-6 h-6' />
				</button>
			</div>

			{/* Main content */}
			<div className='flex-1 flex items-center justify-center p-6 relative z-10'>
				<AnimatePresence mode='wait'>
					{/* Handoff screen */}
					{phase === 'handoff' && (
						<motion.div
							key='handoff'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className='text-center'
						>
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
								className='text-8xl mb-6'
							>
								👋
							</motion.div>
							<h2 className='text-2xl font-display text-white mb-2'>
								Đổi máy cho Player 2!
							</h2>
							<p className='text-white/60 mb-8'>Đừng nhìn trộm nhé!</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleHandoffComplete}
								className='px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-lg'
							>
								<Users className='w-5 h-5 inline mr-2' />
								Player 2 sẵn sàng
							</motion.button>
						</motion.div>
					)}

					{/* Results screen */}
					{phase === 'results' && (
						<motion.div
							key='results'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className='w-full max-w-md'
						>
							<div className='text-center mb-6'>
								<span className='text-6xl'>
									{matches.length > 0 ? '💕' : '💔'}
								</span>
								<h2 className='text-2xl font-display text-white mt-4'>
									{matches.length > 0
										? `${matches.length} MATCHES!`
										: 'Không có match nào 😅'}
								</h2>
							</div>

							{matches.length > 0 && (
								<div className='space-y-3 max-h-60 overflow-y-auto mb-6'>
									{matches.map((card, index) => (
										<motion.div
											key={card.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											className='glass-card p-4 rounded-xl'
										>
											<div className='flex items-start gap-3'>
												<span className='text-2xl'>🔥</span>
												<div>
													<p className='text-white font-medium'>
														{card.content}
													</p>
													<span
														className='text-xs px-2 py-0.5 rounded-full mt-1 inline-block'
														style={{
															backgroundColor:
																heatLevelColors[card.heatLevel] + '30',
															color: heatLevelColors[card.heatLevel],
														}}
													>
														{heatLevelLabels[card.heatLevel]}
													</span>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							)}

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handlePlayAgain}
								className='w-full px-6 py-4 rounded-full glass-button text-white font-medium flex items-center justify-center gap-2'
							>
								<Repeat className='w-5 h-5' />
								Chơi lại
							</motion.button>
						</motion.div>
					)}

					{/* Swipe cards */}
					{showControls && currentCard && (
						<motion.div
							key={`swipe-${phase}-${currentIndex}`}
							className='relative w-full max-w-sm'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1, x: flyX }}
							transition={{ type: 'spring', damping: 20, stiffness: 200 }}
						>
							{/* Card stack illusion */}
							<div className='absolute inset-4 rounded-3xl glass-card opacity-30' />
							<div className='absolute inset-2 rounded-3xl glass-card opacity-50' />

							{/* Swipeable card */}
							<motion.div
								drag={!isAnimating ? 'x' : false}
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={0.5}
								onDragEnd={handleDragEnd}
								style={{
									x: isAnimating ? 0 : x,
									rotate: isAnimating ? 0 : rotate,
								}}
								className='relative aspect-[3/4] rounded-3xl glass-card overflow-hidden cursor-grab active:cursor-grabbing'
							>
								{/* Swipe indicators */}
								<motion.div
									className='absolute inset-0 flex items-center justify-center bg-green-500/30 rounded-3xl pointer-events-none'
									style={{ opacity: isAnimating ? 0 : likeOpacity }}
								>
									<Heart className='w-20 h-20 text-green-400' />
								</motion.div>
								<motion.div
									className='absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-3xl pointer-events-none'
									style={{ opacity: isAnimating ? 0 : nopeOpacity }}
								>
									<XCircle className='w-20 h-20 text-red-400' />
								</motion.div>

								{/* Heat indicator */}
								<div
									className='absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10'
									style={{
										backgroundColor:
											heatLevelColors[currentCard.heatLevel] + '30',
										color: heatLevelColors[currentCard.heatLevel],
									}}
								>
									{heatLevelLabels[currentCard.heatLevel]}
								</div>

								{/* Content */}
								<div className='absolute inset-0 flex items-center justify-center p-8'>
									<p className='text-white text-xl text-center leading-relaxed font-medium'>
										{currentCard.content}
									</p>
								</div>

								{/* Swipe hint */}
								<div className='absolute bottom-4 left-0 right-0 text-center'>
									<p className='text-white/40 text-xs'>
										← Không | Quẹt để chọn | Đồng ý →
									</p>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Controls */}
			{showControls && (
				<div className='relative z-10 p-4 pb-8'>
					<div className='max-w-sm mx-auto flex items-center justify-center gap-6'>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => handleSwipe('left')}
							disabled={isAnimating}
							className='p-5 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg disabled:opacity-50'
						>
							<XCircle className='w-8 h-8' />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => handleSwipe('right')}
							disabled={isAnimating}
							className='p-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg disabled:opacity-50'
						>
							<Heart className='w-8 h-8' />
						</motion.button>
					</div>
					<p className='text-center text-white/40 text-sm mt-4'>
						❌ Không | ❤️ Đồng ý
					</p>
				</div>
			)}
		</motion.div>
	);
}

export default LoveSwipeGame;
