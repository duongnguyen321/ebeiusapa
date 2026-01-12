import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useCallback, forwardRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { funnyMoments, type FunnyMomentData } from '@/data/easterEggs';

interface FunnyModalProps {
	funny: FunnyMomentData;
	onClose: () => void;
}

// Inner component for Zoom + Loading + Slide
const FunnyModalImage = forwardRef<
	HTMLDivElement,
	{
		funny: FunnyMomentData;
		direction: number;
		onDragEnd: (
			event: MouseEvent | TouchEvent | PointerEvent,
			info: PanInfo
		) => void;
		index: number;
		total: number;
	}
>(({ funny, direction, onDragEnd, index, total }, ref) => {
	const [isLoading, setIsLoading] = useState(true);

	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? '100%' : '-100%',
			opacity: 0,
			rotate: dir > 0 ? 10 : -10,
		}),
		center: {
			x: 0,
			opacity: 1,
			rotate: 0,
		},
		exit: (dir: number) => ({
			x: dir < 0 ? '100%' : '-100%',
			opacity: 0,
			rotate: dir < 0 ? 10 : -10,
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
				rotate: { type: 'spring', stiffness: 200, damping: 30 },
				opacity: { duration: 0.2 },
			}}
			drag='x'
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.2}
			onDragEnd={onDragEnd}
			className='bg-white p-3 pb-24 rounded-sm shadow-2xl transform cursor-grab active:cursor-grabbing touch-pan-y relative h-auto'
		>
			{/* Image Container */}
			<div className='relative overflow-hidden bg-gray-100 h-[50vh] w-full flex items-center justify-center'>
				{isLoading && (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-20'>
						<Loader2 className='w-8 h-8 text-black/20 animate-spin' />
					</div>
				)}

				<TransformWrapper
					initialScale={1}
					minScale={1}
					maxScale={4}
					centerOnInit
					wheel={{ disabled: true }}
					doubleClick={{ disabled: false, mode: 'reset' }}
				>
					{/* @ts-ignore */}
					{({ zoomIn, resetTransform }: any) => (
						<TransformComponent
							wrapperClass='!w-full !h-full'
							contentClass='!w-full !h-full flex items-center justify-center'
						>
							<div className='relative w-full h-full flex items-center justify-center'>
								<img
									src={funny.image}
									alt='Funny moment'
									onLoad={() => setIsLoading(false)}
									className={cn(
										"max-w-full max-h-full object-contain select-none transition-opacity duration-300",
										isLoading ? 'opacity-0' : 'opacity-100'
									)}
									draggable={false}
								/>
								{/* Fun sticker overlay - inside zoom to scale with image */}
								{!isLoading && (
									<motion.div
										initial={{ scale: 0, rotate: -20 }}
										animate={{ scale: 1, rotate: 12 }}
										transition={{ delay: 0.3, type: 'spring' }}
										className='absolute top-3 right-3 text-4xl pointer-events-none'
									>
										😂
									</motion.div>
								)}
							</div>
						</TransformComponent>
					)}
				</TransformWrapper>
			</div>

			{/* Caption */}
			<div className='absolute bottom-3 left-3 right-3'>
				<p className='text-slate-800 font-handwriting text-lg text-center italic leading-tight'>
					{funny.comment}
				</p>
				<p className='mt-2 text-center text-[10px] text-slate-400 font-sans tracking-widest uppercase'>
					Funny Moment {index + 1}/{total}
				</p>
			</div>

			{/* Tape effect */}
			<div className='absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/80 rotate-[-2deg] shadow-sm z-10' />
		</motion.div>
	);
});

FunnyModalImage.displayName = 'FunnyModalImage';

export function EasterEggFunnyModal({ funny, onClose }: FunnyModalProps) {
	// Find the initial index based on the passed 'funny' item
	const initialIndex = funnyMoments.findIndex((item) => item.id === funny.id);
	const [currentIndex, setCurrentIndex] = useState(
		initialIndex >= 0 ? initialIndex : 0
	);
	const [direction, setDirection] = useState(0);

	const goNext = useCallback(() => {
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % funnyMoments.length);
	}, []);

	const goPrev = useCallback(() => {
		setDirection(-1);
		setCurrentIndex(
			(prev) => (prev - 1 + funnyMoments.length) % funnyMoments.length
		);
	}, []);

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
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.8 }}
				className='relative max-w-sm w-full'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Navigation Buttons (Desktop) */}
				<button
					onClick={goPrev}
					className='absolute -left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block'
				>
					<ChevronLeft size={40} />
				</button>
				<button
					onClick={goNext}
					className='absolute -right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block'
				>
					<ChevronRight size={40} />
				</button>

				<AnimatePresence initial={false} custom={direction} mode='wait'>
					<FunnyModalImage
						key={currentIndex}
						funny={funnyMoments[currentIndex]}
						direction={direction}
						onDragEnd={handleDragEnd}
						index={currentIndex}
						total={funnyMoments.length}
					/>
				</AnimatePresence>

				{/* Close button - Fixed relative to container */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={onClose}
					className='absolute -top-10 -right-2 md:-right-14 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-50'
				>
					<X className='w-5 h-5 text-white' />
				</motion.button>
			</motion.div>
		</motion.div>
	);
}
