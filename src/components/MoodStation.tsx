import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { moodData, type MoodOption } from '@/data/easterEggs';

interface MoodStationProps {
	onClose?: () => void;
}

export default function MoodStation({ onClose }: MoodStationProps) {
	const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	const moodOptions = moodData[0]?.options ?? [];

	const handleMoodSelect = (mood: MoodOption) => {
		setSelectedMood(mood);
		setCurrentImageIndex(0);
		setDirection(0);
	};

	const handleCloseOverlay = () => {
		setSelectedMood(null);
	};

	const goNext = useCallback(() => {
		if (!selectedMood) return;
		setDirection(1);
		setCurrentImageIndex(
			(prev) => (prev + 1) % selectedMood.response.images.length
		);
	}, [selectedMood]);

	const goPrev = useCallback(() => {
		if (!selectedMood) return;
		setDirection(-1);
		setCurrentImageIndex(
			(prev) =>
				(prev - 1 + selectedMood.response.images.length) %
				selectedMood.response.images.length
		);
	}, [selectedMood]);

	// Swipe handler
	const handleDragEnd = useCallback(
		(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			const swipeThreshold = 50;
			if (info.offset.x < -swipeThreshold) {
				goNext();
			} else if (info.offset.x > swipeThreshold) {
				goPrev();
			}
		},
		[goNext, goPrev]
	);

	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir: number) => ({
			x: dir < 0 ? 300 : -300,
			opacity: 0,
		}),
	};

	return (
		<>
			<div className='space-y-4'>
				{/* Mood Selection Grid */}
				<div className='text-center mb-4'>
					<p className='text-white/70'>Chọn tâm trạng của em ngay lúc này:</p>
				</div>

				<div className='grid grid-cols-3 gap-3'>
					{moodOptions.map((mood) => (
						<motion.button
							key={mood.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => handleMoodSelect(mood)}
							className='bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors'
						>
							<span className='text-3xl'>{mood.icon}</span>
							<span className='text-white/80 text-sm'>{mood.label}</span>
						</motion.button>
					))}
				</div>
			</div>

			{/* Full Screen Overlay - Using Portal */}
			{createPortal(
				<AnimatePresence>
					{selectedMood && (
						<>
							{/* Backdrop */}
							<motion.div
								key='mood-backdrop'
								className='fixed inset-0 bg-black/60 backdrop-blur-md z-[200]'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								onClick={handleCloseOverlay}
							/>

							{/* Modal Content */}
							<motion.div
								key='mood-modal'
								className='fixed inset-0 md:inset-8 z-[210] overflow-hidden pointer-events-auto md:rounded-3xl'
								style={{
									background:
										'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.08) 100%)',
									backdropFilter: 'blur(24px) saturate(180%)',
									WebkitBackdropFilter: 'blur(24px) saturate(180%)',
									border: '1px solid rgba(255,255,255,0.15)',
									boxShadow:
										'0 -8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
								}}
								initial={{ opacity: 0, y: '100%', scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: '100%', scale: 0.95 }}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 30,
									mass: 0.8,
								}}
								onClick={(e) => e.stopPropagation()}
							>
								{/* Specular highlight */}
								<div
									className='absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10'
									style={{
										background:
											'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.5) 80%, transparent 100%)',
									}}
								/>

								{/* Close Button */}
								<motion.button
									onClick={handleCloseOverlay}
									className='absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-all'
									style={{
										background:
											'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
										backdropFilter: 'blur(12px)',
										border: '1px solid rgba(255,255,255,0.2)',
										boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
									}}
									whileHover={{
										scale: 1.1,
										backgroundColor: 'rgba(255,255,255,0.2)',
									}}
									whileTap={{ scale: 0.95 }}
									aria-label='Đóng'
								>
									<X className='w-5 h-5 text-white' />
								</motion.button>

								<div className='h-full overflow-hidden flex flex-col'>
									{/* Header - Always visible */}
									<div className='p-4 md:p-6 pr-16 flex-shrink-0'>
										<div className='flex items-center gap-3'>
											<span className='text-4xl'>{selectedMood.icon}</span>
											<div>
												<h2 className='text-2xl md:text-3xl font-playfair text-white'>
													{selectedMood.label}
												</h2>
												<p className='text-white/50 text-sm'>Mood Check-in</p>
											</div>
										</div>
									</div>

									{/* Image Gallery with Swipe */}
									<div className='flex-1 relative flex items-center justify-center px-4 pb-4 overflow-hidden'>
										<AnimatePresence initial={false} custom={direction} mode='wait'>
											<motion.img
												key={currentImageIndex}
												src={selectedMood.response.images[currentImageIndex]}
												alt='Mood response'
												custom={direction}
												variants={slideVariants}
												initial='enter'
												animate='center'
												exit='exit'
												transition={{
													x: { type: 'spring', stiffness: 300, damping: 30 },
													opacity: { duration: 0.15 },
												}}
												drag='x'
												dragConstraints={{ left: 0, right: 0 }}
												dragElastic={0.7}
												onDragEnd={handleDragEnd}
												className='max-w-full max-h-[50vh] md:max-h-[55vh] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing touch-pan-y'
											/>
										</AnimatePresence>

										{/* Navigation arrows */}
										{selectedMood.response.images.length > 1 && (
											<>
												<button
													onClick={goPrev}
													className='absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10'
												>
													<ChevronLeft className='w-6 h-6 text-white' />
												</button>
												<button
													onClick={goNext}
													className='absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10'
												>
													<ChevronRight className='w-6 h-6 text-white' />
												</button>
											</>
										)}
									</div>

									{/* Message & Dots - Bottom section */}
									<div className='flex-shrink-0 p-4 md:p-6 glass-panel mx-4 mb-4 md:mx-6 md:mb-6 rounded-2xl'>
										<p className='text-white text-center text-lg md:text-xl leading-relaxed'>
											{selectedMood.response.message}
										</p>

										{/* Dots indicator */}
										{selectedMood.response.images.length > 1 && (
											<div className='flex justify-center gap-2 mt-4'>
												{selectedMood.response.images.map((_, idx) => (
													<button
														key={idx}
														onClick={() => {
															setDirection(idx > currentImageIndex ? 1 : -1);
															setCurrentImageIndex(idx);
														}}
														className={`h-2 rounded-full transition-all ${
															idx === currentImageIndex
																? 'bg-cyan-400 w-6'
																: 'bg-white/30 hover:bg-white/50 w-2'
														}`}
													/>
												))}
											</div>
										)}
									</div>
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>,
				document.body
			)}
		</>
	);
}
