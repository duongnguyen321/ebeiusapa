import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { rollDice, type DiceResult } from '@/data/games/highlandDice';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface HighlandDiceGameProps {
	onClose: () => void;
}

export function HighlandDiceGame({ onClose }: HighlandDiceGameProps) {
	const [result, setResult] = useState<DiceResult | null>(null);
	const [isRolling, setIsRolling] = useState(false);
	const [score, setScore] = useState(0);
	const [showPrize, setShowPrize] = useState(false);

	useLockBodyScroll();

	const handleRoll = useCallback(() => {
		if (isRolling) return;

		setIsRolling(true);
		setResult(null);

		// Simulate rolling animation (faster)
		setTimeout(() => {
			const newResult = rollDice();
			setResult(newResult);
			setIsRolling(false);
		}, 600);
	}, [isRolling]);

	const handleComplete = () => {
		const newScore = score + 1;
		setScore(newScore);

		if (newScore >= 10) {
			// Grand prize!
			setShowPrize(true);
			confetti({
				particleCount: 200,
				spread: 100,
				origin: { y: 0.5 },
				colors: ['#ff6b9d', '#a855f7', '#22d3ee', '#fbbf24'],
			});
		}

		setResult(null);
	};

	const handleClosePrize = () => {
		setShowPrize(false);
		setScore(0); // Reset for next round
	};

	const handleSkip = () => {
		setResult(null);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: '100%', scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: '100%', scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
			className='fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950'
		>
			{/* Background orbs */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/3 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-1/3 right-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700' />
			</div>

			{/* Header */}
			<div className='relative z-10 flex items-center justify-between p-4'>
				<div className='flex items-center gap-3'>
					<span className='text-2xl'>🎲</span>
					<div className='flex items-center gap-2'>
						<div className='px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold'>
							{score} / 10
						</div>
						<Zap className='w-4 h-4 text-yellow-400' />
					</div>
				</div>
				<button
					onClick={onClose}
					className='p-2 rounded-full glass-button text-white/60 hover:text-white'
				>
					<X className='w-6 h-6' />
				</button>
			</div>

			{/* Dice area */}
			<div className='flex-1 flex items-center justify-center p-6 relative z-10'>
				<div className='w-full max-w-md'>
					{/* 3D Dice visualization */}
					<div className='relative h-64 flex items-center justify-center'>
						<AnimatePresence mode='wait'>
							{isRolling ? (
								<motion.div
									key='rolling'
									className='flex gap-4'
									animate={{ rotate: [0, 360] }}
									transition={{
										duration: 0.5,
										repeat: Infinity,
										ease: 'linear',
									}}
								>
									{[1, 2, 3].map((i) => (
										<motion.div
											key={i}
											className='dice-3d w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center'
											animate={{
												rotateX: [0, 360],
												rotateY: [0, 360],
												rotateZ: [0, 360],
											}}
											transition={{
												duration: 0.3,
												repeat: Infinity,
												ease: 'linear',
												delay: i * 0.1,
											}}
										>
											<span className='text-2xl text-white'>?</span>
										</motion.div>
									))}
								</motion.div>
							) : result ? (
								<motion.div
									key='result'
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ type: 'spring', damping: 15 }}
									className='text-center px-4'
								>
									{/* Combined instruction - natural sentence */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3 }}
										className='glass-card p-6 rounded-3xl'
									>
										<p className='text-white text-xl md:text-2xl leading-relaxed'>
											<span className='text-cyan-400 font-bold'>
												{result.action}
											</span>{' '}
											<span className='text-pink-400 font-bold'>
												{result.location}
											</span>{' '}
											<span className='text-purple-300'>{result.modifier}</span>
										</p>
									</motion.div>
								</motion.div>
							) : (
								<motion.div
									key='idle'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='text-center'
								>
									<motion.div
										className='flex gap-4 mb-6'
										animate={{ y: [0, -10, 0] }}
										transition={{ duration: 2, repeat: Infinity }}
									>
										{['🎲', '🎲', '🎲'].map((emoji, i) => (
											<span key={i} className='text-5xl'>
												{emoji}
											</span>
										))}
									</motion.div>
									<p className='text-white/60'>Chạm nút để gieo xúc xắc</p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Controls */}
					<div className='flex justify-center gap-4 mt-8'>
						{result ? (
							<>
								{/* Skip */}
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={handleSkip}
									className='p-4 rounded-full glass-button text-white/60 hover:text-white'
								>
									<RotateCcw className='w-6 h-6' />
								</motion.button>

								{/* Complete */}
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={handleComplete}
									className='px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg flex items-center gap-2'
								>
									<Check className='w-5 h-5' />
									Hoàn thành (+1)
								</motion.button>
							</>
						) : (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleRoll}
								disabled={isRolling}
								className='px-10 py-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-2xl disabled:opacity-50'
							>
								{isRolling ? 'Đang gieo...' : '🎲 Gieo Xúc Xắc'}
							</motion.button>
						)}
					</div>
				</div>
			</div>

			{/* Grand Prize Modal */}
			<AnimatePresence>
				{showPrize && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md'
						onClick={handleClosePrize}
					>
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{ type: 'spring', damping: 15 }}
							className='text-center p-8'
						>
							<span className='text-8xl'>🏆</span>
							<h2 className='text-3xl font-display text-white mt-4'>
								PHẦN THƯỞNG LỚN!
							</h2>
							<p className='text-white/70 mt-2'>
								Bạn đã hoàn thành 10 thử thách!
							</p>
							<p className='text-pink-400 mt-4 text-lg'>
								🎁 Phần thưởng: Một yêu cầu từ đối phương!
							</p>
							<p className='text-white/40 mt-6 text-sm'>Chạm để chơi lại</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default HighlandDiceGame;
