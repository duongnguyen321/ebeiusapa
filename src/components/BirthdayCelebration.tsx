import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles } from 'lucide-react';
import { useSurprise } from '@/contexts/SurpriseContext';
import { itinerary } from '@/data/itinerary';

export function BirthdayCelebration() {
	const [isOpen, setIsOpen] = useState(false);
	const { birthdayCelebrationShown, markBirthdayCelebrationShown } =
		useSurprise();

	const specialDay = itinerary.find((d) => d.isBirthday);
	const celebrationDate = specialDay?.date || '2026-12-30';

	useEffect(() => {
		// Check if it's the special celebration date and not yet shown
		const now = new Date();
		const today = now.toISOString().split('T')[0];

		if (today === celebrationDate && !birthdayCelebrationShown) {
			// Small delay for dramatic effect
			const timer = setTimeout(() => {
				setIsOpen(true);
				triggerCelebration();
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [birthdayCelebrationShown, celebrationDate]);

	const triggerCelebration = () => {
		// Multiple confetti bursts
		const duration = 5000;
		const end = Date.now() + duration;

		const frame = () => {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				colors: ['#ff6b9d', '#a855f7', '#fbbf24', '#22d3ee'],
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				colors: ['#ff6b9d', '#a855f7', '#fbbf24', '#22d3ee'],
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};

		frame();
	};

	const handleClose = () => {
		setIsOpen(false);
		markBirthdayCelebrationShown();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-[100] flex items-center justify-center p-4'
				>
					{/* Gradient backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='absolute inset-0 birthday-modal'
						onClick={handleClose}
					/>

					{/* Floating icons background */}
					<div className='absolute inset-0 overflow-hidden pointer-events-none'>
						{Array.from({ length: 15 }).map((_, i) => (
							<motion.div
								key={i}
								initial={{
									y: '100vh',
									x: `${Math.random() * 100}vw`,
									rotate: Math.random() * 360,
								}}
								animate={{
									y: '-10vh',
									rotate: Math.random() * 360 + 360,
								}}
								transition={{
									duration: 5 + Math.random() * 5,
									repeat: Infinity,
									delay: Math.random() * 3,
									ease: 'linear',
								}}
								className='absolute text-pink-400/40'
							>
								{i % 2 === 0 ? (
									<Heart className='w-6 h-6 fill-pink-400/30' />
								) : (
									<Sparkles className='w-6 h-6 text-amber-300/40' />
								)}
							</motion.div>
						))}
					</div>

					{/* Main content */}
					<motion.div
						initial={{ scale: 0.5, opacity: 0, y: 50 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', damping: 20, stiffness: 200 }}
						className='relative glass-card w-full max-w-md overflow-hidden'
					>
						{/* Close button */}
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 z-10 p-2 rounded-full glass-button'
						>
							<X className='w-4 h-4' />
						</button>

						{/* Decorative header */}
						<div className='relative h-32 bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-transparent overflow-hidden'>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
								className='absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<motion.div
									animate={{
										scale: [1, 1.2, 1],
										rotate: [0, -10, 10, 0],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatDelay: 1,
									}}
									className='flex items-center gap-2'
								>
									<Sparkles className='w-12 h-12 text-amber-300' />
								</motion.div>
							</div>
						</div>

						{/* Content */}
						<div className='p-8 text-center'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<h2 className='font-display text-3xl font-bold text-white mb-2'>
									Khoảnh Khắc Giao Thừa
								</h2>
								<p className='text-pink-400 font-display text-lg mb-6'>
									Đêm pháo hoa ấm áp bên nàng thơ
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className='space-y-4 text-white/80'
							>
								<p className='leading-relaxed'>
									Đêm nay là thời khắc đặc biệt và ý nghĩa nhất trong chuyến đi Sapa của hai đứa mình...
								</p>
								<p className='leading-relaxed'>
									Giữa sương lạnh phố núi, được cùng <span className='text-pink-400 font-medium'>em</span> ngắm que pháo hoa sáng rực rỡ và đếm ngược đón giao thừa là điều tuyệt vời nhất với anh.
								</p>
								<p className='leading-relaxed italic text-white/60'>
									Chúc cho tình yêu của chúng mình luôn ấm áp, bền chặt và cùng nhau đi qua thật nhiều mùa đông tươi đẹp nữa!
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.8, type: 'spring' }}
								className='mt-8 flex justify-center gap-2'
							>
								<motion.div
									animate={{ scale: [1, 1.3, 1] }}
									transition={{ duration: 0.8, repeat: Infinity }}
								>
									<Heart className='w-8 h-8 text-pink-500 fill-pink-500' />
								</motion.div>
							</motion.div>

							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleClose}
								className='mt-8 glass-button-primary px-8 py-3 text-white font-medium'
							>
								<span className='flex items-center gap-2'>
									<Sparkles className='w-4 h-4' />
									Đón khoảnh khắc diệu kỳ
								</span>
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
