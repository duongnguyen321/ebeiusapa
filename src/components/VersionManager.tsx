import { useEffect } from 'react';
import { toast } from 'sonner';

const VersionManager = () => {
	useEffect(() => {
		const checkForUpdate = async () => {
			if (process.env.NODE_ENV === 'development') return;

			try {
				const response = await fetch(`/version.json?t=${Date.now()}`);
				
				if (!response.ok) return;

				const remoteConfig = await response.json();
				const remoteVersion = remoteConfig.version;
				const localVersion = __APP_VERSION__;

				console.log(`[Version Check] Local: ${localVersion} | Remote: ${remoteVersion}`);

				if (remoteVersion !== localVersion) {
					console.log('[Version Manager] New version detected. clearing cache...');
					
					toast.info('Phát hiện bản cập nhật mới! Đang tải lại...', {
						duration: 5000,
					});

					// 1. Unregister Service Workers
					if ('serviceWorker' in navigator) {
						const registrations = await navigator.serviceWorker.getRegistrations();
						for (const registration of registrations) {
							await registration.unregister();
						}
					}

					// 2. Clear caches (Exclude image caches to prevent slow reload)
					if ('caches' in window) {
						const cacheNames = await caches.keys();
						await Promise.all(
							cacheNames.map((cacheName) => {
								// Only delete precache or app-shell, keep images/media
								// Assuming standard naming or deleting everything NOT explicitly safe?
								// Safe approach: Delete caches that look like code/precache
								if (
									cacheName.includes('precache') || 
									cacheName.includes('pages') || 
									cacheName.includes('app-data')
								) {
									return caches.delete(cacheName);
								}
								// Keep easter-eggs or other image caches
								return Promise.resolve();
							})
						);
					}

					// 3. Clear Storage (Optional, be careful if you want to keep user data)
					// localStorage.clear(); // Keeping this commented out to preserve user progress like coins

					// 4. Reload page
					window.location.reload();
				}
			} catch (error) {
				console.error('[Version Manager] Error checking version:', error);
			}
		};

		// Check on mount
		checkForUpdate();

		// Check when window gains focus
		const onFocus = () => checkForUpdate();
		window.addEventListener('focus', onFocus);

		return () => {
			window.removeEventListener('focus', onFocus);
		};
	}, []);

	return null; // This component handles logic only
};

export default VersionManager;
