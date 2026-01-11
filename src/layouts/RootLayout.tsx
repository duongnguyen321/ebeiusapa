import NoiseBackground from '@/components/NoiseBackground';
import { BirthdayCelebration } from '@/components/BirthdayCelebration';
import { SurpriseProvider } from '@/contexts/SurpriseContext';
import { TripProvider } from '@/contexts/TripContext';
import { EasterEggProvider } from '@/contexts/EasterEggContext';
import { AnimatedOutlet } from '@/components/AnimatedOutlet';
import EasterEggLayer from '@/components/EasterEggLayer';

export default function RootLayout() {
	return (
		<TripProvider>
			<SurpriseProvider>
				<EasterEggProvider>
					<div className='min-h-screen overflow-x-hidden relative bg-slate-900 text-white'>
						<NoiseBackground />

						{/* Main Content Area with Animated Routes */}
						<AnimatedOutlet />

						{/* Easter Egg Layer - Floating eggs and modals */}
						<EasterEggLayer />

						{/* Global Overlay Components */}
						<BirthdayCelebration />
					</div>
				</EasterEggProvider>
			</SurpriseProvider>
		</TripProvider>
	);
}
