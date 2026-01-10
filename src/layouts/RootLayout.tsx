import { Outlet } from 'react-router-dom';
import NoiseBackground from '@/components/NoiseBackground';
import { BirthdayCelebration } from '@/components/BirthdayCelebration';
import { SurpriseProvider } from '@/contexts/SurpriseContext';
import { TripProvider } from '@/contexts/TripContext';
import { AnimatedOutlet } from '@/components/AnimatedOutlet';

export default function RootLayout() {
	return (
		<TripProvider>
			<SurpriseProvider>
				<div className='min-h-screen overflow-x-hidden relative bg-slate-900 text-white'>
					<NoiseBackground />

					{/* Main Content Area with Animated Routes */}
					<AnimatedOutlet />

					{/* Global Overlay Components */}
					<BirthdayCelebration />
				</div>
			</SurpriseProvider>
		</TripProvider>
	);
}
