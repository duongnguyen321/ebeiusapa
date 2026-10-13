import { cn } from '@/lib/utils';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LiquidTheme } from '@/data/liquidLuck';
import { VoucherDisplay } from '@/data/vouchers/types';
import { X, Sparkles } from 'lucide-react';

interface LiquidScratchRevealProps {
	task: VoucherDisplay;
	theme: LiquidTheme;
	onClose: () => void;
	onReveal?: () => void;
	role?: 'anh' | 'em'; // Optional, to determining confetti brand colors
}

export function LiquidScratchReveal({
	task,
	theme,
	onClose,
	onReveal,
	role,
}: LiquidScratchRevealProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [scratchPercent, setScratchPercent] = useState(0);
	const isDrawing = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const drawOverlay = (width: number, height: number) => {
			// Fill with frosted glass overlay
			ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Slightly more opaque
			ctx.fillRect(0, 0, width, height);

			// Add shimmer/noise
			const imageData = ctx.getImageData(0, 0, width, height);
			const data = imageData.data;
			for (let i = 0; i < data.length; i += 4) {
				const noise = Math.random() * 20;
				data[i] = Math.min(255, data[i] + noise);
				data[i + 1] = Math.min(255, data[i + 1] + noise);
				data[i + 2] = Math.min(255, data[i + 2] + noise);
			}
			ctx.putImageData(imageData, 0, 0);

			// Add sparkle dots
			ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
			for (let i = 0; i < 60; i++) {
				const x = Math.random() * width;
				const y = Math.random() * height;
				ctx.beginPath();
				ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
				ctx.fill();
			}

			// Add text hint
			ctx.save();
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.font = '600 16px "Inter", sans-serif';
			ctx.textAlign = 'center';
			ctx.shadowColor = 'rgba(0,0,0,0.5)';
			ctx.shadowBlur = 4;
			ctx.fillText('✨ Cào để xem kết quả ✨', width / 2, height / 2);
			ctx.restore();
		};

		// ResizeObserver to handle animation/layout changes
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				// Set actual canvas size to match display size
				canvas.width = width;
				canvas.height = height;
				drawOverlay(width, height);
			}
		});

		if (canvas.parentElement) {
			resizeObserver.observe(canvas.parentElement);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const scratch = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current;
			if (!canvas || isRevealed) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// Draw the scratch (Fast)
			// Enable erasing
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(x, y, 45, 0, Math.PI * 2);
			ctx.fill();

			// OPTIMIZATION: Don't calculate percentage on every move!
			// This causes a synchronous readback (getImageData) which kills performance.
			// We only calculate if enough time has passed or explicitly requested.
		},
		[isRevealed]
	);

	// Throttled percentage check
	const checkScratchPercentage = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas || isRevealed) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Use a smaller sample area / stride for performance
		const stride = 15; // Increased stride
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;
		let clearPixels = 0;
		let totalPixels = 0;

		for (let i = 0; i < data.length; i += stride * 4) {
			totalPixels++;
			if (data[i + 3] === 0) {
				clearPixels++;
			}
		}

		const percent = (clearPixels / totalPixels) * 100;
		setScratchPercent(percent);

		if (percent > 35 && !isRevealed) {
			handleReveal();
		}
	}, [isRevealed]);

	// Batch checks using a ref to track if we need to check
	const lastCheckRef = useRef(0);
	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDrawing.current || isRevealed) return;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);

			// Throttle check to every 200ms
			const now = Date.now();
			if (now - lastCheckRef.current > 200) {
				// Use requestIdleCallback when available to prevent main thread blocking
				if ('requestIdleCallback' in window) {
					(
						window as Window & {
							requestIdleCallback: (
								cb: () => void,
								opts?: { timeout: number }
							) => void;
						}
					).requestIdleCallback(() => checkScratchPercentage(), {
						timeout: 100,
					});
				} else {
					checkScratchPercentage();
				}
				lastCheckRef.current = now;
			}
		}
	};

	const handleReveal = () => {
		setIsRevealed(true);
		onReveal?.();

		// Trigger Confetti
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
			gravity: 0.8,
			ticks: 300,
			colors:
				role === 'anh'
					? ['#22d3ee', '#3b82f6', '#ffffff'] // Brand colors for Anh
					: ['#f472b6', '#fb7185', '#ffffff'], // Brand colors for Em
		});
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		if (isRevealed) return;
		isDrawing.current = true;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);
		}
	};

	const handlePointerUp = () => {
		isDrawing.current = false;
		// Perform a final accurate check on release
		checkScratchPercentage();
	};

	// Helper to determine badge style
	const getBadgeStyle = () => {
		switch (task.category) {
			case 'spicy':
				return 'bg-rose-600/80 text-white';
			case 'sensual':
				return 'bg-purple-500/80 text-white'; // New color for sensual
			case 'service':
				return 'bg-emerald-500/80 text-white';
			case 'fun':
				return 'bg-amber-500/80 text-white';
			default:
				return 'bg-blue-500/80 text-white';
		}
	};

	const getBadgeText = () => {
		switch (task.category) {
			case 'spicy':
				return '🔥 NỒNG NHIỆT';
			case 'sensual':
				return '✨ QUYẾN RŨ';
			case 'service':
				return '🎁 SERVICE';
			case 'fun':
				return '⚡ FUN & CUTE';
			default:
				return '✨ SPECIAL';
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ type: 'spring', damping: 20 }}
				className={cn(
					'relative w-full max-w-sm aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl',
					theme.gradient,
					theme.shadow
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header Actions */}
				<div className='absolute top-4 right-4 z-30'>
					<button
						onClick={onClose}
						className='p-2 rounded-full bg-black/20 text-white/70 hover:bg-black/40 hover:text-white transition-all'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Hidden Content (Revealed after scratch) */}
				<div className='absolute inset-0 p-8 flex flex-col items-center justify-center text-center'>
					<AnimatePresence>
						{isRevealed && (
							<motion.div
								initial={{ scale: 0.8, opacity: 0, y: 20 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								transition={{ delay: 0.1, duration: 0.4 }}
								className='flex flex-col items-center'
							>
								{/* Result Badge */}
								<div
									className={cn(
										'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-md shadow-lg border border-white/10',
										getBadgeStyle()
									)}
								>
									{getBadgeText()}
								</div>

								{/* Big Icon */}
								<motion.div
									initial={{ rotate: -10, scale: 0 }}
									animate={{ rotate: 0, scale: 1 }}
									transition={{ type: 'spring', delay: 0.2 }}
									className='mb-6 p-6 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-inner'
								>
									{/* Use string emoji directly */}
									<span className='text-6xl filter drop-shadow-lg'>
										{task.icon}
									</span>
								</motion.div>

								{/* Content */}
								<h3 className='text-3xl font-black text-white mb-4 leading-tight drop-shadow-md'>
									{task.title}
								</h3>

								{task.description && (
									<p className='text-white/90 text-lg leading-relaxed font-medium max-w-[280px]'>
										{task.description}
									</p>
								)}
							</motion.div>
						)}
					</AnimatePresence>

					{/* Hint when hidden */}
					{!isRevealed && (
						<div className='absolute inset-0 flex flex-col items-center justify-center z-0 opacity-50 pointer-events-none'>
							<Sparkles className='w-32 h-32 text-white/20 animate-pulse' />
						</div>
					)}
				</div>

				{/* Scratch Canvas Overlay */}
				<canvas
					ref={canvasRef}
					className={cn(
						'absolute inset-0 touch-none z-10 transition-opacity duration-700',
						isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
					)}
					style={{ touchAction: 'none' }}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerLeave={handlePointerUp}
				/>

				{/* Progress Bar (Bottom) */}
				<div
					className={cn(
						'absolute bottom-0 left-0 h-1.5 bg-white transition-all duration-300 z-20',
						isRevealed ? 'opacity-0' : 'opacity-100'
					)}
					style={{ width: `${scratchPercent}%` }}
				/>
			</motion.div>
		</motion.div>
	);
}
