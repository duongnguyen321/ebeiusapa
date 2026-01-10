import { useEffect } from 'react';

/**
 * Hook để chặn scroll body khi component được mount
 * Hữu ích cho games và modals fullscreen
 */
export function useLockBodyScroll() {
	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);
}

/**
 * Hook để chặn scroll body khi isOpen = true
 * Hữu ích cho modals có thể đóng/mở
 */
export function useLockBodyScrollWhen(isOpen: boolean) {
	useEffect(() => {
		if (isOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';

			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen]);
}
