import { useEffect, useCallback, useState } from 'react';
import { itinerary } from '@/data/itinerary';

const NOTIFICATION_ADVANCE_MINUTES = 15;
const NOTIFICATION_KEY = 'sapa-notifications-scheduled';

export interface NotificationState {
	permission: NotificationPermission;
	isSupported: boolean;
	scheduledCount: number;
}

export function useNotifications() {
	const [state, setState] = useState<NotificationState>({
		permission: 'default',
		isSupported: false,
		scheduledCount: 0,
	});

	useEffect(() => {
		const isSupported =
			'Notification' in window && 'serviceWorker' in navigator;
		setState((prev) => ({
			...prev,
			isSupported,
			permission: isSupported ? Notification.permission : 'denied',
		}));
	}, []);

	const requestPermission = useCallback(async () => {
		if (!state.isSupported) return false;

		try {
			const permission = await Notification.requestPermission();
			setState((prev) => ({ ...prev, permission }));
			return permission === 'granted';
		} catch (error) {
			console.error('Failed to request notification permission:', error);
			return false;
		}
	}, [state.isSupported]);

	const scheduleNotifications = useCallback(async () => {
		if (state.permission !== 'granted') {
			const granted = await requestPermission();
			if (!granted) return;
		}

		// Clear existing scheduled notifications
		const existingTimers = JSON.parse(
			localStorage.getItem(NOTIFICATION_KEY) || '[]'
		);
		existingTimers.forEach((id: number) => clearTimeout(id));

		const now = new Date();
		const timerIds: number[] = [];

		// Schedule notifications for all timeline items
		itinerary.forEach((day) => {
			day.timeline.forEach((item) => {
				const timeStr = item.time.split('-')[0].replace('+', '').trim();
				const [hours, minutes] = timeStr.split(':').map(Number);

				const itemDate = new Date(day.date);
				itemDate.setHours(hours, minutes - NOTIFICATION_ADVANCE_MINUTES, 0, 0);

				const msUntilNotification = itemDate.getTime() - now.getTime();

				// Only schedule future notifications
				if (msUntilNotification > 0) {
					const timerId = window.setTimeout(() => {
						showNotification(item.title, {
							body: item.description || `Sắp đến giờ: ${item.title}`,
							icon: '/icons/icon-192.png',
							badge: '/icons/icon-192.png',
							tag: `timeline-${day.date}-${item.time}`,
							data: { day: day.date, time: item.time },
						});
					}, msUntilNotification);

					timerIds.push(timerId);
				}
			});
		});

		// Also schedule birthday notification at midnight
		const birthdayMidnight = new Date('2026-01-16T00:00:00+07:00');
		const msTillBirthday = birthdayMidnight.getTime() - now.getTime();
		if (msTillBirthday > 0) {
			const timerId = window.setTimeout(() => {
				showNotification('🎂 Happy Birthday! 🎂', {
					body: 'Chúc mừng sinh nhật nàng thơ của anh! ❤️',
					icon: '/icons/icon-192.png',
					badge: '/icons/icon-192.png',
					tag: 'birthday',
				});
			}, msTillBirthday);
			timerIds.push(timerId);
		}

		// Save timer IDs
		localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(timerIds));
		setState((prev) => ({ ...prev, scheduledCount: timerIds.length }));

		return timerIds.length;
	}, [state.permission, requestPermission]);

	const showNotification = (title: string, options?: NotificationOptions) => {
		if (state.permission !== 'granted') return;

		try {
			new Notification(title, {
				...options,
				requireInteraction: false,
				silent: false,
			});
		} catch (error) {
			console.error('Failed to show notification:', error);
		}
	};

	const testNotification = useCallback(() => {
		showNotification('Sẵn sàng cho hành trình! ✨', {
			body: 'Thông báo đã được bật. Anh sẽ nhắc em những điều bất ngờ trong chuyến đi nhé! 💕',
			icon: '/icons/icon-192.png',
		});
	}, [state.permission]);

	return {
		...state,
		requestPermission,
		scheduleNotifications,
		testNotification,
		showNotification,
	};
}
