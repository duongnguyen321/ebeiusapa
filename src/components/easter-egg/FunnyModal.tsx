import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { FunnyMomentData } from '@/data/easterEggs';

interface FunnyModalProps {
	funny: FunnyMomentData;
	onClose: () => void;
}

export function EasterEggFunnyModal({ funny, onClose }: FunnyModalProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, rotate: -5 }}
				animate={{ scale: 1, rotate: 0 }}
				exit={{ scale: 0.8, rotate: 5 }}
				className='relative max-w-sm w-full'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Polaroid style frame */}
				<div className='bg-white p-3 pb-16 rounded-sm shadow-2xl transform'>
					{/* Image */}
					<div className='relative overflow-hidden'>
						<img
							src={funny.image}
							alt='Funny moment'
							className='w-full aspect-square object-cover'
						/>
						{/* Fun sticker overlay */}
						<motion.div
							initial={{ scale: 0, rotate: -20 }}
							animate={{ scale: 1, rotate: 12 }}
							transition={{ delay: 0.3, type: 'spring' }}
							className='absolute top-3 right-3 text-4xl'
						>
							😂
						</motion.div>
					</div>

					{/* Caption */}
					<div className='absolute bottom-3 left-3 right-3'>
						<p className='text-slate-800 font-handwriting text-lg text-center italic'>
							{funny.comment}
						</p>
					</div>
				</div>

				{/* Close button */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={onClose}
					className='absolute -top-3 -right-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg'
				>
					<X className='w-5 h-5 text-white' />
				</motion.button>

				{/* Tape effect */}
				<div className='absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/80 rotate-[-2deg] shadow-sm' />
			</motion.div>
		</motion.div>
	);
}
