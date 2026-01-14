import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '@/contexts/TripContext';
import { targetDate } from '@/data/itinerary';
import IntroView from '@/components/IntroView';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
	const navigate = useNavigate();
	const { isUnlocked, unlockApp } = useTrip();


	// Redirect if already unlocked
	useEffect(() => {
		if (isUnlocked) {
			navigate('/timeline', { replace: true });
		}
	}, [isUnlocked, navigate]);

	const handleUnlock = () => {
		unlockApp();
	};

	return (
		<PageTransition variant='fade'>
			<IntroView targetDate={targetDate} onUnlock={handleUnlock} />
		</PageTransition>
	);
};

export default Index;
