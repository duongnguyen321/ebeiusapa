import { toast } from 'sonner';

// Date to unlock features: Jan 15, 2026 00:00:00
// Note: Month is 0-indexed in JS Date constructor if passing numbers, but date string is parsed standardly.
// '2026-01-15T00:00:00' works clearly.
export const UNLOCK_DATE = new Date('2026-01-14T00:00:00+07:00'); // Assuming +07:00 timezone based on user context or local time

export const isRestricted = (): boolean => {
	if (process.env.NODE_ENV === 'development') return false;
	const now = new Date();
	return now < UNLOCK_DATE;
};

export const handleRestrictedAction = (actionName: string): boolean => {
	if (isRestricted()) {
		const unlockDate = UNLOCK_DATE.toLocaleDateString('vi-VN');
		toast.error(`Tính năng "${actionName}" sẽ được mở vào ngày ${unlockDate}!`, {
			description: 'Hãy quay lại sau nhé ❤️',
			duration: 3000,
		});
		return true; // Action was restricted
	}
	return false; // Action allowed
};
