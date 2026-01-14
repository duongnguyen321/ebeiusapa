import {
	createContext,
	useContext,
	ReactNode,
	useMemo,
} from 'react';
import type { GlobalRole, MoodType } from '@/types/quest';
import { useGlobalRole } from './GlobalRoleContext';
import { useMood } from './MoodContext';

// ============================================
// TYPES
// ============================================

export interface ThemeColors {
	primary: string;
	accent: string;
	gradient: string;
	border: string;
	glow: string;
	bg: string;
	text: string;
	effect: 'clouds' | 'ember' | 'particles' | 'hearts' | 'mist' | 'glitter';
}

interface ThemeContextType {
	theme: ThemeColors;
	role: GlobalRole | null;
	mood: MoodType | null;
}

// ============================================
// THEME MATRIX
// ============================================

const THEME_MATRIX: Record<string, Record<string, ThemeColors>> = {
	anh: {
		romantic: {
			primary: 'cyan-600',
			accent: 'amber-400',
			gradient: 'from-cyan-500/20 to-amber-500/10',
			border: 'border-cyan-500/30',
			glow: 'shadow-[0_0_30px_rgba(8,145,178,0.3)]',
			bg: 'bg-cyan-500/10',
			text: 'text-cyan-400',
			effect: 'clouds',
		},
		naughty: {
			primary: 'slate-900',
			accent: 'red-500',
			gradient: 'from-slate-900/40 to-red-900/20',
			border: 'border-red-500/30',
			glow: 'shadow-[0_0_30px_rgba(220,38,38,0.3)]',
			bg: 'bg-slate-950/40',
			text: 'text-red-400',
			effect: 'ember',
		},
		playful: {
			primary: 'sky-500',
			accent: 'yellow-400',
			gradient: 'from-sky-500/20 to-yellow-500/10',
			border: 'border-sky-500/30',
			glow: 'shadow-[0_0_30px_rgba(14,165,233,0.3)]',
			bg: 'bg-sky-500/10',
			text: 'text-sky-400',
			effect: 'particles',
		},
		// Default fallback
		default: {
			primary: 'cyan-600',
			accent: 'blue-500',
			gradient: 'from-cyan-500/20 to-blue-500/10',
			border: 'border-cyan-500/30',
			glow: 'shadow-[0_0_30px_rgba(8,145,178,0.3)]',
			bg: 'bg-cyan-500/10',
			text: 'text-cyan-400',
			effect: 'clouds',
		}
	},
	em: {
		romantic: {
			primary: 'pink-500',
			accent: 'rose-300',
			gradient: 'from-pink-500/20 to-rose-400/10',
			border: 'border-pink-500/30',
			glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
			bg: 'bg-pink-500/10',
			text: 'text-pink-400',
			effect: 'hearts',
		},
		naughty: {
			primary: 'rose-900',
			accent: 'red-600',
			gradient: 'from-rose-900/30 to-red-600/10',
			border: 'border-rose-700/30',
			glow: 'shadow-[0_0_30px_rgba(225,29,72,0.3)]',
			bg: 'bg-rose-950/30',
			text: 'text-rose-400',
			effect: 'mist',
		},
		playful: {
			primary: 'fuchsia-500',
			accent: 'cyan-400',
			gradient: 'from-fuchsia-500/20 to-cyan-400/10',
			border: 'border-fuchsia-500/30',
			glow: 'shadow-[0_0_30px_rgba(217,70,239,0.3)]',
			bg: 'bg-fuchsia-500/10',
			text: 'text-fuchsia-400',
			effect: 'glitter',
		},
		// Default fallback
		default: {
			primary: 'pink-500',
			accent: 'rose-400',
			gradient: 'from-pink-500/20 to-rose-400/10',
			border: 'border-pink-500/30',
			glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
			bg: 'bg-pink-500/10',
			text: 'text-pink-400',
			effect: 'hearts',
		}
	}
};

const DEFAULT_THEME = THEME_MATRIX.em.default;

// ============================================
// CONTEXT
// ============================================

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const { role } = useGlobalRole();
	const { currentMood } = useMood();

	const theme = useMemo(() => {
		if (!role) return DEFAULT_THEME;
		
		const roleThemes = THEME_MATRIX[role];
		if (!currentMood) return roleThemes.default;
		
		return roleThemes[currentMood] || roleThemes.default;
	}, [role, currentMood]);

	return (
		<ThemeContext.Provider value={{ theme, role, mood: currentMood }}>
			{children}
		</ThemeContext.Provider>
	);
}

// ============================================
// HOOK
// ============================================

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
