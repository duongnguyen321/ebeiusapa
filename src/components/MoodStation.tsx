import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { moodData, type MoodOption } from '@/data/easterEggs';

interface MoodStationProps {
	onClose?: () => void;
}

export default function MoodStation({ onClose }: MoodStationProps) {
	const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const moodOptions = moodData[0]?.options ?? [];

	const handleMoodSelect = (mood: MoodOption) => {
		setSelectedMood(mood);
		setCurrentImageIndex(0);
	};

	const handleCloseOverlay = () => {
		setSelectedMood(null);
	};

	const goNext = () => {
		if (!selectedMood) return;
		setCurrentImageIndex(
			(prev) => (prev + 1) % selectedMood.response.images.length
		);
	};

	const goPrev = () => {
		if (!selectedMood) return;
		setCurrentImageIndex(
			(prev) =>
				(prev - 1 + selectedMood.response.images.length) %
				selectedMood.response.images.length
		);
	};

	// Full screen overlay using portal to escape BottomSheet container
	const FullScreenOverlay = () => {
		if (!selectedMood) return null;

		return createPortal(
			<AnimatePresence>
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

					{/* Modal Content - Liquid Glass Slide Up */}
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

						<div className='h-full overflow-y-auto flex flex-col'>
							{/* Header - Always visible */}
							<div className='p-4 md:p-6 pr-16'>
								<motion.div
									className='flex items-center gap-3 mb-2'
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
								>
									<span className='text-4xl'>{selectedMood.icon}</span>
									<div>
										<h2 className='text-2xl md:text-3xl font-playfair text-white'>
											{selectedMood.label}
										</h2>
										<p className='text-white/50 text-sm'>Mood Check-in</p>
									</div>
								</motion.div>
							</div>

							{/* Image Gallery - Takes most of the space */}
							<div className='flex-1 relative flex items-center justify-center px-4 pb-4'>
								<AnimatePresence mode='wait'>
									<motion.img
										key={currentImageIndex}
										src={selectedMood.response.images[currentImageIndex]}
										alt='Mood response'
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.2 }}
										className='max-w-full max-h-[50vh] md:max-h-[55vh] object-contain rounded-2xl shadow-2xl'
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
							<div className='p-4 md:p-6 glass-panel mx-4 mb-4 md:mx-6 md:mb-6 rounded-2xl'>
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className='text-white text-center text-lg md:text-xl leading-relaxed'
								>
									{selectedMood.response.message}
								</motion.p>

								{/* Dots indicator */}
								{selectedMood.response.images.length > 1 && (
									<div className='flex justify-center gap-2 mt-4'>
										{selectedMood.response.images.map((_, idx) => (
											<button
												key={idx}
												onClick={() => setCurrentImageIndex(idx)}
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
			</AnimatePresence>,
			document.body
		);
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

			{/* Full Screen Overlay - Rendered via Portal */}
			{selectedMood && <FullScreenOverlay />}
		</>
	);
}
