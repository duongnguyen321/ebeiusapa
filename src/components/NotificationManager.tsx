import { useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useTrip } from '@/contexts/TripContext';

export function NotificationManager() {
	const { isUnlocked } = useTrip();
	const { scheduleNotifications, permission, isSupported } = useNotifications();

	useEffect(() => {
		if (isUnlocked && isSupported && permission === 'granted') {
			scheduleNotifications();
		}
	}, [isUnlocked, isSupported, permission, scheduleNotifications]);

	return null;
}
