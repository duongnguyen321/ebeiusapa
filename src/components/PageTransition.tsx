import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
	children: ReactNode;
	variant?: 'slideUp' | 'fade' | 'slideRight';
	className?: string;
}

const variants = {
	slideUp: {
		initial: { y: '100%', opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: '100%', opacity: 0 },
		transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
	},
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.3 },
	},
	slideRight: {
		initial: { x: '100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '100%', opacity: 0 },
		transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
	},
};

export function PageTransition({
	children,
	variant = 'fade',
	className = '',
}: PageTransitionProps) {
	return (
		<motion.div
			initial={variants[variant].initial}
			animate={variants[variant].animate}
			exit={variants[variant].exit}
			transition={variants[variant].transition}
			className={`w-full min-h-screen ${className}`}
		>
			{children}
		</motion.div>
	);
}
