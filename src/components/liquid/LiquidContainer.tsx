import { cn } from '@/lib/utils';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidTheme } from '@/data/liquidLuck';
import { Droplets } from 'lucide-react';

interface LiquidContainerProps {
	theme: LiquidTheme;
	onMixComplete: () => void;
}

export function LiquidContainer({ theme, onMixComplete }: LiquidContainerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHolding, setIsHolding] = useState(false);
	const [progress, setProgress] = useState(0);
	const [waveIntensity, setWaveIntensity] = useState(1);
	const holdStartRef = useRef<number>(0);
	const animationRef = useRef<number>(0);

	// Mix progress animation
	useEffect(() => {
		if (isHolding) {
			holdStartRef.current = Date.now();
			
			const animate = () => {
				const elapsed = Date.now() - holdStartRef.current;
				const newProgress = Math.min((elapsed / 2500) * 100, 100); // 2.5 seconds to complete
				setProgress(newProgress);
				setWaveIntensity(1 + newProgress / 25); // Increase wave intensity as mixing

				if (newProgress >= 100) {
					onMixComplete();
					return;
				}

				if (isHolding) {
					animationRef.current = requestAnimationFrame(animate);
				}
			};

			animationRef.current = requestAnimationFrame(animate);
		} else {
			// Slowly decrease progress when not holding
			const decay = () => {
				setProgress((prev) => {
					const newVal = prev - 2;
					if (newVal <= 0) return 0;
					animationRef.current = requestAnimationFrame(decay);
					return newVal;
				});
			};
			animationRef.current = requestAnimationFrame(decay);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isHolding, onMixComplete]);

	const handlePointerDown = useCallback(() => {
		setIsHolding(true);
	}, []);

	const handlePointerUp = useCallback(() => {
		setIsHolding(false);
	}, []);

	return (
		<div
			ref={containerRef}
			className='relative w-64 h-80 mx-auto touch-none select-none'
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerLeave={handlePointerUp}
		>
			{/* Potion Flask Shape */}
			<div
				className={cn(
					'absolute inset-0 rounded-b-[50%] rounded-t-3xl overflow-hidden',
					'border-2 border-white/20',
					'backdrop-blur-sm',
					theme.gradient
				)}
				style={{
					boxShadow: `0 0 ${20 + progress / 2}px ${theme.blobColor}40`,
				}}
			>
				{/* SVG Filter for Liquid Effect */}
				<svg className='absolute inset-0 w-full h-full' viewBox='0 0 100 120'>
					<defs>
						<filter id='liquid-wave'>
							<feTurbulence
								type='fractalNoise'
								baseFrequency={0.01}
								numOctaves={3}
								seed={1}
							>
								<animate
									attributeName='baseFrequency'
									dur={`${3 / waveIntensity}s`}
									values='0.01;0.02;0.01'
									repeatCount='indefinite'
								/>
							</feTurbulence>
							<feDisplacementMap in='SourceGraphic' scale={10 * waveIntensity} />
						</filter>
						<linearGradient id='liquid-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
							<stop offset='0%' stopColor={theme.blobColor} stopOpacity='0.8' />
							<stop offset='100%' stopColor={theme.blobColor} stopOpacity='0.4' />
						</linearGradient>
					</defs>

					{/* Liquid Body */}
					<motion.ellipse
						cx='50'
						initial={{ cy: 90 }}
						rx='45'
						ry='30'
						fill='url(#liquid-gradient)'
						filter='url(#liquid-wave)'
						animate={{
							cy: isHolding 
								? [90 - progress * 0.4, 85 - progress * 0.4, 90 - progress * 0.4] 
								: 90 - progress * 0.4,
						}}
						transition={{
							repeat: isHolding ? Infinity : 0,
							duration: 0.5 / waveIntensity,
							ease: 'easeInOut',
						}}
					/>

					{/* Bubbles */}
					{isHolding && (
						<>
							{[...Array(Math.floor(progress / 20) + 2)].map((_, i) => (
								<motion.circle
									key={i}
									cx={30 + Math.random() * 40}
									cy={100}
									r={2 + Math.random() * 3}
									fill='white'
									fillOpacity={0.6}
									initial={{ cy: 100, opacity: 0 }}
									animate={{
										cy: [100, 50 - progress * 0.3, 30],
										opacity: [0, 0.8, 0],
									}}
									transition={{
										duration: 1 + Math.random(),
										repeat: Infinity,
										delay: i * 0.2,
									}}
								/>
							))}
						</>
					)}
				</svg>

				{/* Glow Effect */}
				<motion.div
					className='absolute inset-0 rounded-b-[50%] rounded-t-3xl'
					animate={{
						boxShadow: isHolding
							? `inset 0 0 ${30 + progress}px ${theme.blobColor}60`
							: `inset 0 0 20px ${theme.blobColor}30`,
					}}
					transition={{ duration: 0.3 }}
				/>
			</div>

			{/* Progress Ring */}
			<div className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20'>
				<svg className='w-full h-full -rotate-90'>
					<circle
						cx='40'
						cy='40'
						r='35'
						stroke='white'
						strokeOpacity='0.1'
						strokeWidth='4'
						fill='none'
					/>
					<motion.circle
						cx='40'
						cy='40'
						r='35'
						stroke={theme.blobColor}
						strokeWidth='4'
						fill='none'
						strokeLinecap='round'
						strokeDasharray={220}
						animate={{
							strokeDashoffset: 220 - (progress / 100) * 220,
						}}
						transition={{ duration: 0.1 }}
					/>
				</svg>
				<div className='absolute inset-0 flex items-center justify-center'>
					<Droplets
						className='w-6 h-6'
						style={{ color: theme.blobColor }}
					/>
				</div>
			</div>

			{/* Instructions */}
			<AnimatePresence>
				{progress < 30 && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='absolute -bottom-16 left-0 right-0 text-center text-sm text-white/60'
					>
						Giữ để lắc bình! 🧪
					</motion.p>
				)}
				{progress >= 30 && progress < 100 && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='absolute -bottom-16 left-0 right-0 text-center text-sm'
						style={{ color: theme.blobColor }}
					>
						{progress < 60 ? 'Đang trộn... ✨' : 'Sắp xong rồi! 🔮'}
					</motion.p>
				)}
			</AnimatePresence>
		</div>
	);
}
