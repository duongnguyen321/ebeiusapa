import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface TripContextType {
	isUnlocked: boolean;
	unlockApp: () => void;
	lockApp: () => void;
}

const TripContext = createContext<TripContextType | null>(null);

const STORAGE_KEY = 'sapa-trip-unlocked';

export function TripProvider({ children }: { children: ReactNode }) {
	const [isUnlocked, setIsUnlocked] = useState(() => {
		try {
			return localStorage.getItem(STORAGE_KEY) === 'true';
		} catch {
			return false;
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, String(isUnlocked));
	}, [isUnlocked]);

	const unlockApp = () => setIsUnlocked(true);
	const lockApp = () => setIsUnlocked(false);

	return (
		<TripContext.Provider value={{ isUnlocked, unlockApp, lockApp }}>
			{children}
		</TripContext.Provider>
	);
}

export function useTrip() {
	const context = useContext(TripContext);
	if (!context) {
		throw new Error('useTrip must be used within a TripProvider');
	}
	return context;
}
