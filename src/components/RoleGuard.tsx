import { ReactNode } from 'react';
import { useTrip } from '@/contexts/TripContext';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';
import { GlobalRoleSelector } from './GlobalRoleSelector';

export function RoleGuard({ children }: { children: ReactNode }) {
	const { isUnlocked } = useTrip();
	const { role } = useGlobalRole();

	// If app is unlocked BUT no role is selected, force selection
	if (isUnlocked && !role) {
		return <GlobalRoleSelector />;
	}

	// Otherwise render children (Intro screen or App content)
	return <>{children}</>;
}
