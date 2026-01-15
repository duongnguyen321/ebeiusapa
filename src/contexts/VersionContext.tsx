import { CACHE_KEYS } from '@/config/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/useNotifications';

interface VersionContextType {
	localVersion: string;
	remoteVersion: string | null;
	isUpdateAvailable: boolean;
	checkForUpdate: () => Promise<void>;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function useVersion() {
	const context = useContext(VersionContext);
	if (context === undefined) {
		throw new Error('useVersion must be used within a VersionProvider');
	}
	return context;
}

export function VersionProvider({ children }: { children: React.ReactNode }) {
	const [localVersion] = useState<string>(__APP_VERSION__);
	const [remoteVersion, setRemoteVersion] = useState<string | null>(null);
	const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const { showNotification } = useNotifications();

	const checkForUpdate = async () => {
		if (process.env.NODE_ENV === 'development') return;
		if (isUpdating) return;

		// Performance: Abort fetch after 5 seconds to prevent hanging on flaky networks
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		try {
			const response = await fetch(`/version.json?t=${Date.now()}`, {
				signal: controller.signal,
			});
			clearTimeout(timeoutId);
			if (!response.ok) return;

			const remoteConfig = await response.json();
			const newRemoteVersion = remoteConfig.version;
			setRemoteVersion(newRemoteVersion);

			console.log(
				`[Version Check] Local: ${localVersion} | Remote: ${newRemoteVersion}`
			);

			if (newRemoteVersion && newRemoteVersion !== localVersion) {
				setIsUpdateAvailable(true);
				setIsUpdating(true);
				console.log(
					'[Version Manager] New version detected. Clearing cache...'
				);

				toast.info('Phát hiện bản cập nhật mới! Đang tải lại...', {
					duration: 5000,
				});

				showNotification('Cập nhật mới! ✨', {
					body: 'Có phiên bản mới đang chờ bạn. Ứng dụng sẽ tự động cập nhật ngay. 🚀',
					icon: '/icons/icon-192.png',
					requireInteraction: true,
				});

				// Delay to let toast and notification show and be read
				// 4 seconds to give user time to see the toast context
				await new Promise((resolve) => setTimeout(resolve, 4000));

				// 1. Unregister Service Workers
				if ('serviceWorker' in navigator) {
					const registrations =
						await navigator.serviceWorker.getRegistrations();
					for (const registration of registrations) {
						await registration.unregister();
					}
				}

				// 2. Clear caches (Exclude image caches to prevent slow reload)
				if ('caches' in window) {
					const cacheNames = await caches.keys();
					await Promise.all(
						cacheNames.map((cacheName) => {
							if (
								cacheName.includes(CACHE_KEYS.PRECACHE) ||
								cacheName.includes(CACHE_KEYS.PAGES) ||
								cacheName.includes(CACHE_KEYS.APP_DATA)
							) {
								return caches.delete(cacheName);
							}
							return Promise.resolve();
						})
					);
				}

				// 4. Reload page
				window.location.reload();
			}
		} catch (error) {
			clearTimeout(timeoutId);
			console.error('[Version Manager] Error checking version:', error);
		}
	};

	useEffect(() => {
		// Check on mount
		checkForUpdate();

		// Check when window gains focus
		const onFocus = () => checkForUpdate();
		window.addEventListener('focus', onFocus);

		return () => {
			window.removeEventListener('focus', onFocus);
		};
	}, [localVersion]);

	return (
		<VersionContext.Provider
			value={{ localVersion, remoteVersion, isUpdateAvailable, checkForUpdate }}
		>
			{children}
		</VersionContext.Provider>
	);
}
