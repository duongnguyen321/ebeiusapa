import { cn } from '@/lib/utils';
import NoiseBackground from '@/components/NoiseBackground';
import { BirthdayCelebration } from '@/components/BirthdayCelebration';
import { SurpriseProvider } from '@/contexts/SurpriseContext';
import { TripProvider } from '@/contexts/TripContext';
import { EasterEggProvider } from '@/contexts/EasterEggContext';
import { VersionProvider } from '@/contexts/VersionContext';
import { BudgetProvider } from '@/contexts/BudgetContext';
import { GlobalRoleProvider } from '@/contexts/GlobalRoleContext';
import { MoodProvider } from '@/contexts/MoodContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DailyQuestProvider } from '@/contexts/DailyQuestContext';
import { AnimatedOutlet } from '@/components/AnimatedOutlet';
import EasterEggLayer from '@/components/EasterEggLayer';
import { NotificationManager } from '@/components/NotificationManager';
import { RoleGuard } from '@/components/RoleGuard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

function LayoutContent() {
	const { theme } = useTheme();
	const location = useLocation();
	const isIntro = location.pathname === '/' || location.pathname === '/intro';

	return (
		<div
			className={cn(
				'min-h-screen overflow-x-hidden relative transition-colors duration-700 ease-in-out',
				theme.bg,
				theme.text // Apply base text color too
			)}
		>
			<div
				className={cn(
					'absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b',
					theme.gradient
				)}
			/>

			{/* Only show notification manager after intro */}
			{!isIntro && <NotificationManager />}
			<NoiseBackground />

			{/* Main Content Area with Animated Routes */}
			<RoleGuard>
				<AnimatedOutlet />
			</RoleGuard>

			{/* Easter Egg Layer - Floating eggs and modals */}
			<EasterEggLayer />

			{/* Global Overlay Components - Only after intro */}
			{!isIntro && <BirthdayCelebration />}
		</div>
	);
}

export default function RootLayout() {
	return (
		<TripProvider>
			<VersionProvider>
				<SurpriseProvider>
					<GlobalRoleProvider>
						<MoodProvider>
							<ThemeProvider>
								<DailyQuestProvider>
									<EasterEggProvider>
										<BudgetProvider>
											<LayoutContent />
										</BudgetProvider>
									</EasterEggProvider>
								</DailyQuestProvider>
							</ThemeProvider>
						</MoodProvider>
					</GlobalRoleProvider>
				</SurpriseProvider>
			</VersionProvider>
		</TripProvider>
	);
}
