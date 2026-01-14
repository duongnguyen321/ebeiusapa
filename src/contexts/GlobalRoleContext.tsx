import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import { STORAGE_KEYS } from '@/config/storage';
import type { GlobalRole, GlobalRoleState } from '@/types/quest';

// ============================================
// CONTEXT TYPE
// ============================================

interface GlobalRoleContextType {
	role: GlobalRole | null;
	isRoleSelected: boolean;
	setRole: (role: GlobalRole) => void;
	selectedAt: number | null;
}

// ============================================
// DEFAULT STATE
// ============================================

const defaultState: GlobalRoleState = {
	role: null,
	selectedAt: null,
};

// ============================================
// CONTEXT
// ============================================

const GlobalRoleContext = createContext<GlobalRoleContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function GlobalRoleProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<GlobalRoleState>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEYS.GLOBAL_ROLE.STATE);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch {
			// Ignore parse errors
		}
		return defaultState;
	});

	// Persist to localStorage
	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.GLOBAL_ROLE.STATE, JSON.stringify(state));
	}, [state]);

	const setRole = useCallback((role: GlobalRole) => {
		setState({
			role,
			selectedAt: Date.now(),
		});
	}, []);

	return (
		<GlobalRoleContext.Provider
			value={{
				role: state.role,
				isRoleSelected: state.role !== null,
				setRole,
				selectedAt: state.selectedAt,
			}}
		>
			{children}
		</GlobalRoleContext.Provider>
	);
}

// ============================================
// HOOK
// ============================================

export function useGlobalRole() {
	const context = useContext(GlobalRoleContext);
	if (!context) {
		throw new Error('useGlobalRole must be used within a GlobalRoleProvider');
	}
	return context;
}
