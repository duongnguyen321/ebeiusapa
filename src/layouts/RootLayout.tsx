import { cn } from '@/lib/utils';
import NoiseBackground from '@/components/NoiseBackground';
import { BirthdayCelebration } from '@/components/BirthdayCelebration';
import { SurpriseProvider } from '@/contexts/SurpriseContext';
import { TripProvider } from '@/contexts/TripContext';
import { EasterEggProvider } from '@/contexts/EasterEggContext';
import { VersionProvider } from '@/contexts/VersionContext';
import { AnimatedOutlet } from '@/components/AnimatedOutlet';
import EasterEggLayer from '@/components/EasterEggLayer';
import { NotificationManager } from '@/components/NotificationManager';

export default function RootLayout() {
	return (
		<TripProvider>
			<VersionProvider>
				<SurpriseProvider>
					<EasterEggProvider>
					<div className={cn('min-h-screen overflow-x-hidden relative bg-slate-900 text-white')}>
						<NotificationManager />
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
			</VersionProvider>
		</TripProvider>
	);
}
