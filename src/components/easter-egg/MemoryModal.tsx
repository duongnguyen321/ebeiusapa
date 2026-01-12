import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useCallback, forwardRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { MemoryCapsuleData } from '@/data/easterEggs';

interface MemoryModalProps {
	memory: MemoryCapsuleData;
	onClose: () => void;
}

// Inner component to handle individual image state (loading & zoom)
const ModalImage = forwardRef<
	HTMLDivElement,
	{
		src: string;
		alt: string;
		direction: number;
		onDragEnd: (
			event: MouseEvent | TouchEvent | PointerEvent,
			info: PanInfo
		) => void;
	}
>(({ src, alt, direction, onDragEnd }, ref) => {
	const [isLoading, setIsLoading] = useState(true);

	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? '100%' : '-100%',
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir: number) => ({
			x: dir < 0 ? '100%' : '-100%',
			opacity: 0,
		}),
	};

	return (
		<motion.div
			ref={ref}
			custom={direction}
			variants={slideVariants}
			initial='enter'
			animate='center'
			exit='exit'
			transition={{
				x: { type: 'spring', stiffness: 300, damping: 30 },
				opacity: { duration: 0.2 },
			}}
			drag='x'
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.2}
			onDragEnd={onDragEnd}
			className='absolute inset-0 w-full h-full flex items-center justify-center'
		>
			{/* Loading Skeleton */}
			{isLoading && (
				<div className='absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse rounded-lg'>
					<Loader2 className='w-8 h-8 text-white/30 animate-spin' />
				</div>
			)}

			<TransformWrapper
				initialScale={1}
				minScale={1}
				maxScale={4}
				centerOnInit
				wheel={{ disabled: true }} // Disable wheel zoom to avoid conflict with scrolling if any
				doubleClick={{ disabled: false, mode: 'reset' }} // Double click to reset
			>
				{/* @ts-ignore */}
				{({ zoomIn, resetTransform }: any) => (
					<TransformComponent
						wrapperClass='!w-full !h-full'
						contentClass='!w-full !h-full flex items-center justify-center'
					>
						<img
							src={src}
							alt={alt}
							onLoad={() => setIsLoading(false)}
							onClick={(e) => {
								// Simple click to zoom logic if needed, but double click is better for library
								// e.stopPropagation();
							}}
							className={cn(
								"max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-300",
								isLoading ? 'opacity-0' : 'opacity-100'
							)}
							draggable={false}
						/>
					</TransformComponent>
				)}
			</TransformWrapper>
		</motion.div>
	);
});

ModalImage.displayName = 'ModalImage';

export function EasterEggMemoryModal({ memory, onClose }: MemoryModalProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	const goNext = useCallback(() => {
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % memory.images.length);
	}, [memory.images.length]);

	const goPrev = useCallback(() => {
		setDirection(-1);
		setCurrentIndex(
			(prev) => (prev - 1 + memory.images.length) % memory.images.length
		);
	}, [memory.images.length]);

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		const swipeThreshold = 50;
		if (info.offset.x < -swipeThreshold) {
			goNext();
		} else if (info.offset.x > swipeThreshold) {
			goPrev();
		}
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
				<div className='relative bg-white/15 backdrop-blur-md overflow-hidden h-[50vh] w-full flex items-center justify-center'>
					<AnimatePresence initial={false} custom={direction} mode='wait'>
						<ModalImage
							key={currentIndex}
							src={memory.images[currentIndex]}
							alt={`Memory ${currentIndex + 1}`}
							direction={direction}
							onDragEnd={handleDragEnd}
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
								className='absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10'
							>
								<ChevronLeft className='w-6 h-6 text-white' />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									goNext();
								}}
								className='absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10'
							>
								<ChevronRight className='w-6 h-6 text-white' />
							</button>
						</>
					)}

					{/* Dots indicator */}
					{memory.images.length > 1 && (
						<div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none'>
							{memory.images.map((_, idx) => (
								<button
									key={idx}
									onClick={(e) => {
										e.stopPropagation();
										setDirection(idx > currentIndex ? 1 : -1);
										setCurrentIndex(idx);
									}}
									className={cn(
										"h-2 rounded-full transition-all pointer-events-auto",
										idx === currentIndex
											? 'bg-white w-4'
											: 'bg-white/40 hover:bg-white/60 w-2'
									)}
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
