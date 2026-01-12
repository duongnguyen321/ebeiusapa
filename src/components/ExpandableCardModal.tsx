import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface ExpandableCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

const ExpandableCardModal = ({
	isOpen,
	onClose,
	children,
	className,
}: ExpandableCardModalProps) => {
	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<motion.div
				className='fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[90]'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				onClick={onClose}
			/>

			{/* Modal Content - Liquid Glass Slide Up */}
			<motion.div
				className='fixed inset-0 md:inset-8 z-[100] overflow-hidden pointer-events-auto md:rounded-3xl'
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

				{/* Close Button - Prominent */}
				<motion.button
					onClick={onClose}
					className='absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all'
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

				<div
					className={`h-full overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-hide pb-20 ${className}`}
				>
					{children}
				</div>
			</motion.div>
		</>
	);
};

export default ExpandableCardModal;
