import { cn } from '@/lib/utils';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LiquidTask, LiquidTheme } from '@/data/liquidLuck';
import { X, Sparkles } from 'lucide-react';

interface LiquidScratchRevealProps {
	task: LiquidTask;
	theme: LiquidTheme;
	onClose: () => void;
}

export function LiquidScratchReveal({
	task,
	theme,
	onClose,
}: LiquidScratchRevealProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [scratchPercent, setScratchPercent] = useState(0);
	const isDrawing = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		const resize = () => {
			const rect = container.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;

			// Fill with frosted glass overlay
			ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Add sparkle dots
			ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
			for (let i = 0; i < 80; i++) {
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				ctx.beginPath();
				ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
				ctx.fill();
			}

			// Add text
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.font = 'bold 16px Inter';
			ctx.textAlign = 'center';
			ctx.fillText('✨ Cào để xem thử thách ✨', canvas.width / 2, canvas.height / 2);
		};

		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	const scratch = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current;
			if (!canvas || isRevealed) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(x, y, 30, 0, Math.PI * 2);
			ctx.fill();

			// Calculate scratch percentage
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let transparent = 0;
			for (let i = 3; i < imageData.data.length; i += 4) {
				if (imageData.data[i] === 0) transparent++;
			}
			const percent = (transparent / (imageData.data.length / 4)) * 100;
			setScratchPercent(percent);

			// Reveal when 55% scratched
			if (percent > 55 && !isRevealed) {
				handleReveal();
			}
		},
		[isRevealed]
	);

	const handleReveal = () => {
		setIsRevealed(true);

		// Confetti celebration
		confetti({
			particleCount: 80,
			spread: 60,
			origin: { y: 0.6 },
			colors:
				task.targetRole === 'anh'
					? ['#22d3ee', '#0ea5e9', '#3b82f6']
					: ['#ec4899', '#f472b6', '#f43f5e'],
		});
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		isDrawing.current = true;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);
		}
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDrawing.current) return;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);
		}
	};

	const handlePointerUp = () => {
		isDrawing.current = false;
	};

	const TaskIcon = task.icon;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				className={cn(
					'relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden',
					theme.gradient,
					theme.shadow
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
				>
					<X className='w-5 h-5 text-white' />
				</button>

				{/* Content behind scratch overlay */}
				<div
					ref={containerRef}
					className='absolute inset-0 p-6 flex flex-col items-center justify-center'
				>
					<AnimatePresence>
						{isRevealed && (
							<motion.div
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className='text-center'
							>
								{/* Task Type Badge */}
								<motion.div
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
									className={cn(
										'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4',
										task.type === 'dare' && 'bg-amber-500/20 text-amber-300',
										task.type === 'reward' && 'bg-emerald-500/20 text-emerald-300',
										task.type === 'spicy' && 'bg-rose-500/20 text-rose-300'
									)}
								>
									{task.type === 'dare' && '⚡ Thử thách'}
									{task.type === 'reward' && '🎁 Phần thưởng'}
									{task.type === 'spicy' && '🌶️ Spicy'}
									<span className='ml-1'>
										{'🔥'.repeat(task.spicyLevel)}
									</span>
								</motion.div>

								{/* Icon */}
								<motion.div
									animate={{
										rotate: [0, -5, 5, -5, 0],
										scale: [1, 1.1, 1],
									}}
									transition={{
										duration: 0.5,
										repeat: Infinity,
										repeatDelay: 2,
									}}
									className='mb-4'
								>
									{TaskIcon ? (
										<TaskIcon
											className='w-16 h-16 mx-auto'
											style={{ color: theme.blobColor }}
										/>
									) : (
										<Sparkles
											className='w-16 h-16 mx-auto'
											style={{ color: theme.blobColor }}
										/>
									)}
								</motion.div>

								{/* Title */}
								<motion.h3
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className='text-2xl font-bold text-white mb-3'
								>
									{task.content}
								</motion.h3>

								{/* Description */}
								{task.description && (
									<motion.p
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.4 }}
										className='text-white/80 leading-relaxed'
									>
										{task.description}
									</motion.p>
								)}
							</motion.div>
						)}
					</AnimatePresence>

					{!isRevealed && (
						<div className='text-white/30 text-center'>
							<Sparkles className='w-12 h-12 mx-auto mb-2' />
							<p>Thử thách đang ẩn...</p>
						</div>
					)}
				</div>

				{/* Scratch overlay canvas */}
				{!isRevealed && (
					<canvas
						ref={canvasRef}
						className='absolute inset-0 cursor-crosshair touch-none backdrop-blur-md'
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerLeave={handlePointerUp}
					/>
				)}

				{/* Progress indicator */}
				{!isRevealed && scratchPercent > 0 && (
					<div className='absolute bottom-4 left-4 right-4'>
						<div className='h-1 bg-white/10 rounded-full overflow-hidden'>
							<motion.div
								className='h-full'
								style={{ backgroundColor: theme.blobColor }}
								initial={{ width: 0 }}
								animate={{ width: `${scratchPercent}%` }}
							/>
						</div>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
