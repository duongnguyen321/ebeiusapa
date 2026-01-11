import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
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

	const handleClose = () => {
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

	return (
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

			{/* Mood Response Overlay */}
			<AnimatePresence>
				{selectedMood && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col'
						onClick={handleClose}
					>
						{/* Close button */}
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
						>
							<X className='w-6 h-6 text-white' />
						</button>

						{/* Image */}
						<div
							className='flex-1 relative flex items-center justify-center'
							onClick={(e) => e.stopPropagation()}
						>
							<AnimatePresence mode='wait'>
								<motion.img
									key={currentImageIndex}
									src={selectedMood.response.images[currentImageIndex]}
									alt='Mood response'
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									className='max-w-full max-h-[70vh] object-contain rounded-lg'
								/>
							</AnimatePresence>

							{/* Navigation */}
							{selectedMood.response.images.length > 1 && (
								<>
									<button
										onClick={(e) => {
											e.stopPropagation();
											goPrev();
										}}
										className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors'
									>
										<ChevronLeft className='w-6 h-6 text-white' />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											goNext();
										}}
										className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors'
									>
										<ChevronRight className='w-6 h-6 text-white' />
									</button>
								</>
							)}
						</div>

						{/* Message */}
						<div className='p-6 text-center'>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className='text-white text-lg leading-relaxed max-w-md mx-auto'
							>
								{selectedMood.response.message}
							</motion.p>

							{/* Dots indicator */}
							{selectedMood.response.images.length > 1 && (
								<div className='flex justify-center gap-2 mt-4'>
									{selectedMood.response.images.map((_, idx) => (
										<button
											key={idx}
											onClick={(e) => {
												e.stopPropagation();
												setCurrentImageIndex(idx);
											}}
											className={`w-2 h-2 rounded-full transition-all ${
												idx === currentImageIndex
													? 'bg-pink-400 w-6'
													: 'bg-white/30 hover:bg-white/50'
											}`}
										/>
									))}
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
