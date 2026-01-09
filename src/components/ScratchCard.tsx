import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';
import { useSurprise } from '@/contexts/SurpriseContext';
import { getTodayReward, type DailyReward } from '@/data/rewards';

interface ScratchCardProps {
	onComplete?: () => void;
}

export function ScratchCard({ onComplete }: ScratchCardProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [scratchPercent, setScratchPercent] = useState(0);
	const [reward, setReward] = useState<DailyReward | null>(null);
	const { canScratchToday, markScratchCardUsed } = useSurprise();
	const isDrawing = useRef(false);

	useEffect(() => {
		const todayReward = getTodayReward();
		setReward(todayReward);

		// If already scratched today, show revealed state
		if (!canScratchToday()) {
			setIsRevealed(true);
			return;
		}

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

			// Fill with scratch overlay pattern
			const gradient = ctx.createLinearGradient(
				0,
				0,
				canvas.width,
				canvas.height
			);
			gradient.addColorStop(0, '#4a1942');
			gradient.addColorStop(0.5, '#2d1b3d');
			gradient.addColorStop(1, '#1a1a2e');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Add sparkle effect
			ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
			for (let i = 0; i < 50; i++) {
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				ctx.beginPath();
				ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
				ctx.fill();
			}

			// Add text
			ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
			ctx.font = 'bold 18px Inter';
			ctx.textAlign = 'center';
			ctx.fillText(
				'✨ Cào để nhận quà ✨',
				canvas.width / 2,
				canvas.height / 2
			);
		};

		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, [canScratchToday]);

	const scratch = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current;
			if (!canvas || isRevealed) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(x, y, 25, 0, Math.PI * 2);
			ctx.fill();

			// Calculate scratch percentage
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let transparent = 0;
			for (let i = 3; i < imageData.data.length; i += 4) {
				if (imageData.data[i] === 0) transparent++;
			}
			const percent = (transparent / (imageData.data.length / 4)) * 100;
			setScratchPercent(percent);

			// Reveal when 60% scratched
			if (percent > 60 && !isRevealed) {
				handleReveal();
			}
		},
		[isRevealed]
	);

	const handleReveal = () => {
		setIsRevealed(true);
		const today = new Date().toISOString().split('T')[0];
		markScratchCardUsed(today);

		// Confetti celebration
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
			colors: ['#ff6b9d', '#a855f7', '#22d3ee', '#fbbf24'],
		});

		onComplete?.();
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

	if (!reward) {
		return (
			<div className='glass-card p-8 text-center'>
				<Gift className='w-12 h-12 mx-auto mb-4 text-white/50' />
				<p className='text-white/70'>Không có thẻ cào cho hôm nay</p>
				<p className='text-sm text-white/50 mt-2'>
					Thẻ cào chỉ khả dụng trong chuyến đi (15-18/01)
				</p>
			</div>
		);
	}

	return (
		<div className='scratch-card relative w-full aspect-[4/3] max-w-sm mx-auto'>
			{/* Reward background */}
			<div
				ref={containerRef}
				className='absolute inset-0 scratch-reward p-6 flex flex-col items-center justify-center'
			>
				<AnimatePresence>
					{isRevealed && (
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className='text-center'
						>
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
								className='text-6xl mb-4'
							>
								{reward.icon}
							</motion.div>
							<div className='whitespace-pre-line text-white text-center leading-relaxed'>
								{reward.message}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{!isRevealed && (
					<div className='text-white/30 text-center'>
						<Sparkles className='w-8 h-8 mx-auto mb-2' />
						<p>Phần thưởng đang ẩn...</p>
					</div>
				)}
			</div>

			{/* Scratch overlay canvas */}
			{!isRevealed && (
				<canvas
					ref={canvasRef}
					className='absolute inset-0 cursor-crosshair touch-none rounded-[20px]'
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerLeave={handlePointerUp}
				/>
			)}

			{/* Progress indicator */}
			{!isRevealed && scratchPercent > 0 && (
				<div className='absolute bottom-2 left-2 right-2'>
					<div className='h-1 bg-white/10 rounded-full overflow-hidden'>
						<motion.div
							className='h-full bg-gradient-to-r from-pink-500 to-purple-500'
							initial={{ width: 0 }}
							animate={{ width: `${scratchPercent}%` }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
