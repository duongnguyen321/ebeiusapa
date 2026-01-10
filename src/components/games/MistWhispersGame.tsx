import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Wine } from 'lucide-react';
import {
	shuffleCards,
	allWhisperCards,
	type WhisperCard,
} from '@/data/games/mistWhispers';

interface MistWhispersGameProps {
	onClose: () => void;
}

export function MistWhispersGame({ onClose }: MistWhispersGameProps) {
	const [cards] = useState(() => shuffleCards(allWhisperCards));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	const currentCard = cards[currentIndex];

	const handleNextCard = useCallback(() => {
		setIsFlipped(false);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % cards.length);
		}, 300);
	}, [cards.length]);

	const handleFlip = () => {
		if (!isFlipped) {
			setIsFlipped(true);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: '100%', scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: '100%', scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
			className='fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'
		>
			{/* Background orbs */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
			</div>

			{/* Header */}
			<div className='relative z-10 flex items-center justify-between p-4'>
				<div className='flex items-center gap-2'>
					<span className='text-2xl'>💭</span>
					<span className='text-white/80 text-sm font-medium'>
						{currentIndex + 1} / {cards.length}
					</span>
				</div>
				<button
					onClick={onClose}
					className='p-2 rounded-full glass-button text-white/60 hover:text-white'
				>
					<X className='w-6 h-6' />
				</button>
			</div>

			{/* Card area */}
			<div className='flex-1 flex items-center justify-center p-6 relative z-10'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8, x: 100 }}
						transition={{ type: 'spring', damping: 20, stiffness: 200 }}
						onClick={handleFlip}
						className='w-full max-w-sm aspect-[3/4] cursor-pointer'
						style={{ perspective: '1000px' }}
					>
						<motion.div
							className='relative w-full h-full'
							style={{ transformStyle: 'preserve-3d' }}
							animate={{ rotateY: isFlipped ? 180 : 0 }}
							transition={{ type: 'spring', damping: 20, stiffness: 200 }}
						>
							{/* Card Front (Back of card - shown when not flipped) */}
							<div
								className={`
									absolute inset-0 rounded-3xl glass-card 
									${currentCard?.type === 'world' ? 'border-cyan-500/30' : 'border-pink-500/30'}
									border-2 overflow-hidden flex flex-col items-center justify-center p-6
								`}
								style={{ backfaceVisibility: 'hidden' }}
							>
								{/* Fog effect */}
								<div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent' />

								{/* Sparkles - use fixed positions */}
								{Array.from({ length: 20 }, (_, i) => (
									<div
										key={i}
										className='absolute w-1 h-1 bg-white/30 rounded-full animate-pulse'
										style={{
											top: `${(i * 17) % 100}%`,
											left: `${(i * 23) % 100}%`,
											animationDelay: `${i * 0.1}s`,
										}}
									/>
								))}

								<span className='text-6xl mb-4 relative z-10'>☁️</span>
								<p className='text-white/70 text-center relative z-10'>
									Chạm để lật thẻ
								</p>
							</div>

							{/* Card Back (Content - shown when flipped) */}
							<div
								className={`
									absolute inset-0 rounded-3xl glass-card 
									${currentCard?.type === 'world' ? 'border-cyan-500/30' : 'border-pink-500/30'}
									border-2 overflow-hidden flex flex-col items-center justify-center p-6 text-center
								`}
								style={{
									backfaceVisibility: 'hidden',
									transform: 'rotateY(180deg)',
								}}
							>
								{/* Type badge */}
								<div
									className={`
										absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium
										${
											currentCard?.type === 'world'
												? 'bg-cyan-500/20 text-cyan-300'
												: 'bg-pink-500/20 text-pink-300'
										}
									`}
								>
									{currentCard?.type === 'world' ? '🌍 Quan sát' : '💕 Cặp đôi'}
								</div>

								{/* Question */}
								<p className='text-white text-lg md:text-xl leading-relaxed font-medium'>
									{currentCard?.question}
								</p>
							</div>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Controls */}
			<div className='relative z-10 p-4 pb-8'>
				<div className='max-w-sm mx-auto flex items-center justify-center gap-6'>
					{/* Drink button */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleNextCard}
						className='p-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg flex items-center gap-2'
						aria-label='Uống & Tiếp'
					>
						<Wine className='w-7 h-7' />
					</motion.button>

					{/* Skip button */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleNextCard}
						className='p-5 rounded-full glass-button text-white/60 hover:text-white'
						aria-label='Bỏ qua'
					>
						<RefreshCw className='w-7 h-7' />
					</motion.button>
				</div>
				<p className='text-center text-white/40 text-sm mt-4'>
					🍷 Uống & Tiếp | 🔄 Bỏ qua
				</p>
			</div>
		</motion.div>
	);
}

export default MistWhispersGame;
