import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';
import { useTrip } from '@/contexts/TripContext';
import { targetDate } from '@/data/itinerary';
import IntroView from '@/components/IntroView';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
	const navigate = useNavigate();
	const { isUnlocked, unlockApp } = useTrip();
	const { scheduleNotifications, permission, isSupported } = useNotifications();

	// Redirect if already unlocked
	useEffect(() => {
		if (isUnlocked) {
			navigate('/timeline', { replace: true });
		}
	}, [isUnlocked, navigate]);

	// Schedule notifications when unlocked
	useEffect(() => {
		if (isUnlocked && isSupported && permission === 'granted') {
			scheduleNotifications();
		}
	}, [isUnlocked, isSupported, permission, scheduleNotifications]);

	const handleUnlock = () => {
		unlockApp();
		// Navigation will happen via effect
	};

	return (
		<PageTransition variant='fade'>
			<IntroView targetDate={targetDate} onUnlock={handleUnlock} />
		</PageTransition>
	);
};

export default Index;
