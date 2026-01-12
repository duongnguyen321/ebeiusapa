import { useState, useCallback, useEffect } from 'react';

export function useNotificationPermission() {
	const [permission, setPermission] = useState<NotificationPermission>('default');

	useEffect(() => {
		if ('Notification' in window) {
			setPermission(Notification.permission);
		}
	}, []);

	const requestPermission = useCallback(async () => {
		if (!('Notification' in window)) {
			console.log("This browser does not support desktop notification");
			return 'denied';
		}

		try {
			const result = await Notification.requestPermission();
			setPermission(result);
			return result;
		} catch (error) {
			console.error("Error requesting notification permission:", error);
			return 'denied';
		}
	}, []);

	return {
		permission,
		requestPermission,
	};
}
