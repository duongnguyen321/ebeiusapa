import { cn } from '@/lib/utils';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';
import { useSurprise } from '@/contexts/SurpriseContext';
import {
	getNextRewardForDate,
	getRewardsForDate,
	type DailyReward,
} from '@/data/rewards';

interface ScratchCardProps {
	onComplete?: () => void;
}

export function ScratchCard({ onComplete }: ScratchCardProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [scratchPercent, setScratchPercent] = useState(0);
	const [reward, setReward] = useState<DailyReward | null>(null);
	const [totalRewardsToday, setTotalRewardsToday] = useState(0);
	const [remainingRewards, setRemainingRewards] = useState(0);
	const { getScratchedRewardIds, markRewardScratched, isRewardScratched } =
		useSurprise();
	const isDrawing = useRef(false);

	// Calculate today's rewards - only on initial mount
	// Using a ref to track if we've already loaded to prevent reward from being cleared
	const hasLoadedRef = useRef(false);

	useEffect(() => {
		// Skip if already loaded (prevents reward from being cleared after scratching)
		if (hasLoadedRef.current) return;

		const today = new Date().toISOString().split('T')[0];
		const scratchedIds = getScratchedRewardIds();
		const allTodayRewards = getRewardsForDate(today);
		const nextReward = getNextRewardForDate(today, scratchedIds);

		setTotalRewardsToday(allTodayRewards.length);
		setRemainingRewards(
			allTodayRewards.filter((r) => !scratchedIds.includes(r.id)).length
		);

		hasLoadedRef.current = true;

		if (nextReward) {
			// There's an unscratched reward - show it with scratch overlay
			setReward(nextReward);
			if (isRewardScratched(nextReward.id)) {
				setIsRevealed(true);
			}
		} else if (allTodayRewards.length > 0) {
			// All rewards scratched - show the LAST scratched reward in revealed state
			const lastScratched = allTodayRewards[allTodayRewards.length - 1];
			setReward(lastScratched);
			setIsRevealed(true);
		}
	}, [getScratchedRewardIds, isRewardScratched]);

	// Separate effect for canvas painting - only runs when reward is set
	useEffect(() => {
		// Skip if no reward or already revealed
		if (!reward || isRevealed) return;

		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let isPainted = false;

		// Paint the scratch overlay
		const paintOverlay = () => {
			if (isPainted) return; // Don't repaint

			const rect = container.getBoundingClientRect();
			// Skip if container has no size yet (modal still animating)
			if (rect.width < 50 || rect.height < 50) return;

			isPainted = true;
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

		// Use ResizeObserver
		const resizeObserver = new ResizeObserver(() => {
			paintOverlay();
		});
		resizeObserver.observe(container);

		// Also try multiple delayed paints for modal animation
		const t1 = setTimeout(paintOverlay, 50);
		const t2 = setTimeout(paintOverlay, 150);
		const t3 = setTimeout(paintOverlay, 300);

		return () => {
			resizeObserver.disconnect();
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, [reward, isRevealed]);

	const scratch = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current;
			if (!canvas || isRevealed) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// Draw the scratch effect (fast, no percentage calc)
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(x, y, 35, 0, Math.PI * 2); // Larger brush for easier scratching
			ctx.fill();
		},
		[isRevealed]
	);

	// Ref for throttling
	const lastCheckRef = useRef(0);

	// Handle reveal - defined BEFORE checkScratchPercentage to avoid closure issues
	const handleReveal = useCallback(() => {
		if (!reward) return;

		setIsRevealed(true);
		markRewardScratched(reward.id);

		// Confetti celebration
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
			colors: ['#ff6b9d', '#a855f7', '#22d3ee', '#fbbf24'],
		});

		onComplete?.();
	}, [reward, markRewardScratched, onComplete]);

	// Throttled percentage check - separated for performance
	const checkScratchPercentage = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas || isRevealed) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Use stride for performance (sample every 15th pixel)
		const stride = 15;
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

		// Reveal when 35% scratched (like LiquidScratchReveal)
		if (percent > 35 && !isRevealed) {
			handleReveal();
		}
	}, [isRevealed, handleReveal]);

	const handlePointerDown = (e: React.PointerEvent) => {
		e.stopPropagation(); // Prevent modal drag-to-close
		e.preventDefault();
		if (isRevealed) return;
		isDrawing.current = true;
		// Capture pointer to receive events even if pointer leaves canvas
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);
		}
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		e.stopPropagation(); // Prevent modal drag-to-close
		if (!isDrawing.current || isRevealed) return;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			scratch(e.clientX - rect.left, e.clientY - rect.top);

			// Throttle percentage check to every 200ms
			const now = Date.now();
			if (now - lastCheckRef.current > 200) {
				checkScratchPercentage();
				lastCheckRef.current = now;
			}
		}
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		e.stopPropagation(); // Prevent modal drag-to-close
		isDrawing.current = false;
		// Perform a final accurate check on release
		checkScratchPercentage();
	};

	if (!reward) {
		// Check if there were rewards today but all claimed
		if (totalRewardsToday > 0 && remainingRewards === 0) {
			return (
				<div className='glass-card p-8 text-center'>
					<div className='text-5xl mb-4'>🎉</div>
					<p className='text-white/90 font-medium'>
						Em đã nhận hết quà hôm nay rồi!
					</p>
					<p className='text-sm text-white/50 mt-2'>
						Hẹn gặp lại em vào ngày mai nhé! 💕
					</p>
				</div>
			);
		}

		return (
			<div className='glass-card p-8 text-center'>
				<Gift className='w-12 h-12 mx-auto mb-4 text-white/50' />
				<p className='text-white/70'>Không có thẻ cào cho hôm nay</p>
				<p className='text-sm text-white/50 mt-2'>
					Thẻ cào chỉ khả dụng trong chuyến đi (15-17/01)
				</p>
			</div>
		);
	}

	return (
		<div className='scratch-card relative w-full aspect-[4/3] max-w-sm mx-auto'>
			{/* Reward count badge - show when multiple rewards per day */}
			{totalRewardsToday > 1 && (
				<div className='absolute -top-2 -right-2 z-10 px-2 py-1 bg-pink-500 rounded-full text-white text-xs font-bold shadow-lg'>
					{totalRewardsToday - remainingRewards + 1}/{totalRewardsToday}
				</div>
			)}

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
					className='absolute inset-0 z-10 cursor-crosshair touch-none rounded-[20px]'
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
