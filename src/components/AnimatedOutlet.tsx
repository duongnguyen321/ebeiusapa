import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import { cloneElement, isValidElement } from 'react';

const getRouteKey = (pathname: string) => {
	// Group MainLayout routes to prevent layout remounting
	if (
		pathname.startsWith('/timeline') ||
		pathname.startsWith('/passport') ||
		pathname.startsWith('/games')
	) {
		return 'main-layout';
	}
	return pathname;
};

export function AnimatedOutlet() {
	const location = useLocation();
	const element = useOutlet();

	return (
		<AnimatePresence mode='wait' initial={false}>
			{element &&
				isValidElement(element) &&
				cloneElement(element, { key: getRouteKey(location.pathname) } as any)}
		</AnimatePresence>
	);
}
