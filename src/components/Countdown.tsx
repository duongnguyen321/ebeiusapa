import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
	targetDate: Date;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const Countdown = ({ targetDate }: CountdownProps) => {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference = targetDate.getTime() - new Date().getTime();

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				});
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(timer);
	}, [targetDate]);

	return (
		<div className='flex gap-2 md:gap-4 justify-center'>
			{Object.entries(timeLeft).map(([unit, value]) => (
				<motion.div
					key={unit}
					className='px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl min-w-[60px] md:min-w-[80px] relative overflow-hidden'
					style={{
						background:
							'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.1) 100%)',
						backdropFilter: 'blur(20px) saturate(180%)',
						WebkitBackdropFilter: 'blur(20px) saturate(180%)',
						border: '1px solid rgba(255,255,255,0.18)',
						boxShadow:
							'0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.1)',
					}}
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 35,
						mass: 0.8,
					}}
				>
					{/* Specular highlight */}
					<div
						className='absolute top-0 left-0 right-0 h-[1px] pointer-events-none'
						style={{
							background:
								'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.5) 70%, transparent 100%)',
						}}
					/>
					<div className='text-2xl md:text-4xl font-bold text-amber-400 font-playfair relative z-10'>
						{value.toString().padStart(2, '0')}
					</div>
					<div className='text-[10px] md:text-xs text-white/60 uppercase mt-0.5 md:mt-1 tracking-wide relative z-10'>
						{unit}
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default Countdown;
