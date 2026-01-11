import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { MemoryCapsuleData } from '@/data/easterEggs';

interface MemoryModalProps {
	memory: MemoryCapsuleData;
	onClose: () => void;
}

export function EasterEggMemoryModal({ memory, onClose }: MemoryModalProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goNext = () => {
		setCurrentIndex((prev) => (prev + 1) % memory.images.length);
	};

	const goPrev = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + memory.images.length) % memory.images.length
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, y: 30 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.9, y: 30 }}
				className='bg-white/10 backdrop-blur-xl rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/10'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='p-4 border-b border-white/10'>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-lg font-bold text-white flex items-center gap-2'>
								<span className='text-2xl'>💫</span>
								{memory.title}
							</h3>
							<p className='text-white/50 text-sm'>{memory.dateLabel}</p>
						</div>
						<button
							onClick={onClose}
							className='p-2 rounded-full hover:bg-white/10 transition-colors'
						>
							<X className='w-5 h-5 text-white/60' />
						</button>
					</div>
				</div>

				{/* Image Gallery */}
				<div className='relative aspect-[4/3] bg-white/15 backdrop-blur-md'>
					<AnimatePresence mode='wait'>
						<motion.img
							key={currentIndex}
							src={memory.images[currentIndex]}
							alt={`Memory ${currentIndex + 1}`}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							className='w-full h-full object-contain'
						/>
					</AnimatePresence>

					{/* Navigation arrows */}
					{memory.images.length > 1 && (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									goPrev();
								}}
								className='absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors'
							>
								<ChevronLeft className='w-6 h-6 text-white' />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									goNext();
								}}
								className='absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors'
							>
								<ChevronRight className='w-6 h-6 text-white' />
							</button>
						</>
					)}

					{/* Dots indicator */}
					{memory.images.length > 1 && (
						<div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
							{memory.images.map((_, idx) => (
								<button
									key={idx}
									onClick={(e) => {
										e.stopPropagation();
										setCurrentIndex(idx);
									}}
									className={`w-2 h-2 rounded-full transition-all ${
										idx === currentIndex
											? 'bg-white w-4'
											: 'bg-white/40 hover:bg-white/60'
									}`}
								/>
							))}
						</div>
					)}
				</div>

				{/* Description */}
				<div className='p-4'>
					<p className='text-white/80 text-center leading-relaxed'>
						{memory.description}
					</p>
				</div>
			</motion.div>
		</motion.div>
	);
}
