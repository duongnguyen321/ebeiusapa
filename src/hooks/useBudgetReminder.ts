import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useBudget } from '@/contexts/BudgetContext';

const REMINDER_INTERVAL_MS = 2 * 60 * 60 * 1000; // 2 hours
const ACTIVE_START_HOUR = 8; // 08:00
const ACTIVE_END_HOUR = 22; // 22:00

// Trip dates: 15/01/2026 - 18/01/2026
const TRIP_START = new Date('2026-01-15T00:00:00');
const TRIP_END = new Date('2026-01-18T23:59:59');

export function useBudgetReminder() {
	const { lastRemindedAt, updateLastReminded, role, totalSpent, maxBudget } = useBudget();

	const isWithinTripWindow = useCallback(() => {
		const now = new Date();
		return now >= TRIP_START && now <= TRIP_END;
	}, []);

	const isWithinActiveHours = useCallback(() => {
		const now = new Date();
		const hour = now.getHours();
		return hour >= ACTIVE_START_HOUR && hour < ACTIVE_END_HOUR;
	}, []);

	const shouldRemind = useCallback(() => {
		if (!role) return false;
		if (!isWithinTripWindow()) return false;
		if (!isWithinActiveHours()) return false;

		const now = Date.now();
		const timeSinceLastReminder = now - lastRemindedAt;

		return timeSinceLastReminder >= REMINDER_INTERVAL_MS;
	}, [role, isWithinTripWindow, isWithinActiveHours, lastRemindedAt]);

	const sendReminder = useCallback(() => {
		const spendingPercent = (totalSpent / maxBudget) * 100;

		let message = '💰 Đừng quên ghi lại chi tiêu nhé!';
		let type: 'info' | 'warning' = 'info';

		if (spendingPercent > 80) {
			message = '⚠️ Ngân sách đã dùng hơn 80%! Hãy kiểm soát chi tiêu.';
			type = 'warning';
		} else if (spendingPercent > 60) {
			message = '📊 Đã chi tiêu hơn 60% ngân sách. Cập nhật thường xuyên nhé!';
		}

		// Try to use Notification API if available
		if ('Notification' in window && Notification.permission === 'granted') {
			new Notification('Budget Buddy 💰', {
				body: message,
				icon: '/icons/icon-192.png',
				badge: '/icons/icon-96.png',
			});
		} else {
			// Fallback to toast
			toast[type](message, {
				duration: 5000,
				action: {
					label: 'Xem ngay',
					onClick: () => {
						// This will be handled by the component using this hook
					},
				},
			});
		}

		updateLastReminded();
	}, [totalSpent, maxBudget, updateLastReminded]);

	// Check every minute for reminder
	useEffect(() => {
		const checkReminder = () => {
			if (shouldRemind()) {
				sendReminder();
			}
		};

		// Initial check
		checkReminder();

		// Set up interval
		const intervalId = setInterval(checkReminder, 60 * 1000); // Check every minute

		return () => clearInterval(intervalId);
	}, [shouldRemind, sendReminder]);

	// Catch-up popup: Check on visibility change (when user returns to app)
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && shouldRemind()) {
				sendReminder();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	}, [shouldRemind, sendReminder]);

	return {
		isWithinTripWindow,
		shouldRemind,
		sendReminder,
	};
}
