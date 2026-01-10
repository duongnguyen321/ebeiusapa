import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import { cloneElement, isValidElement } from 'react';

export function AnimatedOutlet() {
	const location = useLocation();
	const element = useOutlet();

	return (
		<AnimatePresence mode='wait' initial={false}>
			{element &&
				isValidElement(element) &&
				cloneElement(element, { key: location.pathname } as any)}
		</AnimatePresence>
	);
}
