import { ReactNode } from 'react';
import {
	motion,
	AnimatePresence,
	useDragControls,
	PanInfo,
} from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScrollWhen } from '@/hooks/useLockBodyScroll';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	icon?: ReactNode;
	children: ReactNode;
	maxWidth?: string; // e.g., 'md:max-w-sm', 'md:max-w-md', 'md:max-w-lg'
}

export function BottomSheet({
	isOpen,
	onClose,
	title,
	icon,
	children,
	maxWidth = 'md:max-w-md',
}: BottomSheetProps) {
	const dragControls = useDragControls();

	const handleDragEnd = (_: any, info: PanInfo) => {
		// Close if dragged down more than 100px or with high velocity
		if (info.offset.y > 100 || info.velocity.y > 500) {
			onClose();
		}
	};

	useLockBodyScrollWhen(isOpen);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm'
					onClick={onClose}
				>
					<motion.div
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: '100%', opacity: 0 }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						drag='y'
						dragControls={dragControls}
						dragConstraints={{ top: 0, bottom: 0 }}
						dragElastic={{ top: 0, bottom: 0.5 }}
						onDragEnd={handleDragEnd}
						onClick={(e) => e.stopPropagation()}
						className={`w-full ${maxWidth} md:mx-4`}
					>
						<div className='glass-card rounded-t-3xl md:rounded-2xl overflow-hidden'>
							{/* Handle bar for mobile - drag target */}
							<div
								className='flex justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing touch-none'
								onPointerDown={(e) => dragControls.start(e)}
							>
								<div className='w-10 h-1 bg-white/30 rounded-full' />
							</div>

							{/* Header */}
							<div className='p-4 pb-2 flex items-center justify-between border-b border-white/10'>
								<h3 className='text-lg font-display text-white flex items-center gap-2'>
									{icon}
									{title}
								</h3>
								<button
									onClick={onClose}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
									aria-label='Đóng'
								>
									<X className='w-5 h-5' />
								</button>
							</div>

							{/* Content */}
							<div className='p-4 max-h-[70vh] overflow-y-auto'>{children}</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default BottomSheet;
