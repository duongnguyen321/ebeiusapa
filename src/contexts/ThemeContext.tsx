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
		// Romantic Vibes (Cyan/Teal)
		happy: {
			primary: 'cyan-600',
			accent: 'amber-400',
			gradient: 'from-cyan-500/20 to-amber-500/10',
			border: 'border-cyan-500/30',
			glow: 'shadow-[0_0_30px_rgba(8,145,178,0.3)]',
			bg: 'bg-cyan-500/10',
			text: 'text-cyan-400',
			effect: 'clouds',
		},
		cold: {
			primary: 'cyan-700',
			accent: 'blue-200',
			gradient: 'from-cyan-800/20 to-blue-300/10',
			border: 'border-cyan-600/30',
			glow: 'shadow-[0_0_30px_rgba(8,145,178,0.3)]',
			bg: 'bg-slate-900', // Colder feel
			text: 'text-cyan-200',
			effect: 'mist',
		},
		romantic: { // Legacy/General
			primary: 'cyan-600',
			accent: 'amber-400',
			gradient: 'from-cyan-500/20 to-amber-500/10',
			border: 'border-cyan-500/30',
			glow: 'shadow-[0_0_30px_rgba(8,145,178,0.3)]',
			bg: 'bg-cyan-500/10',
			text: 'text-cyan-400',
			effect: 'clouds',
		},
		missing: {
			primary: 'indigo-500', 
			accent: 'violet-400',
			gradient: 'from-indigo-900/40 to-violet-900/20',
			border: 'border-indigo-500/30',
			glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
			bg: 'bg-slate-950/60',
			text: 'text-indigo-300',
			effect: 'particles',
		},

		// Spicy Vibes (Dark/Red)
		horny: {
			primary: 'slate-900',
			accent: 'red-600',
			gradient: 'from-slate-950/80 to-red-900/40',
			border: 'border-red-600/40',
			glow: 'shadow-[0_0_40px_rgba(220,38,38,0.4)]',
			bg: 'bg-slate-950',
			text: 'text-red-500',
			effect: 'ember',
		},
		naughty: { // Legacy
			primary: 'slate-900',
			accent: 'red-500',
			gradient: 'from-slate-900/40 to-red-900/20',
			border: 'border-red-500/30',
			glow: 'shadow-[0_0_30px_rgba(220,38,38,0.3)]',
			bg: 'bg-slate-950/40',
			text: 'text-red-400',
			effect: 'ember',
		},

		// Playful Vibes (Sky/Yellow)
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
		hungry: {
			primary: 'orange-500',
			accent: 'lime-400',
			gradient: 'from-orange-500/20 to-lime-500/10',
			border: 'border-orange-500/30',
			glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
			bg: 'bg-orange-950/20',
			text: 'text-orange-400',
			effect: 'particles',
		},
		waiting: {
			primary: 'emerald-500',
			accent: 'teal-300',
			gradient: 'from-emerald-500/20 to-teal-400/10',
			border: 'border-emerald-500/30',
			glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
			bg: 'bg-emerald-950/20',
			text: 'text-emerald-400',
			effect: 'glitter',
		},
		chill: {
			primary: 'teal-500',
			accent: 'green-300',
			gradient: 'from-teal-500/20 to-green-400/10',
			border: 'border-teal-500/30',
			glow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]',
			bg: 'bg-teal-950/20',
			text: 'text-teal-400',
			effect: 'clouds',
		},
		grumpy: {
			primary: 'gray-600',
			accent: 'yellow-500',
			gradient: 'from-gray-700/40 to-yellow-900/10',
			border: 'border-gray-500/30',
			glow: 'shadow-[0_0_30px_rgba(156,163,175,0.3)]',
			bg: 'bg-gray-900/50',
			text: 'text-gray-400',
			effect: 'mist',
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
		// Romantic Vibes (Pink/Rose)
		happy: {
			primary: 'pink-500',
			accent: 'rose-300',
			gradient: 'from-pink-500/20 to-rose-400/10',
			border: 'border-pink-500/30',
			glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
			bg: 'bg-pink-500/10',
			text: 'text-pink-400',
			effect: 'hearts',
		},
		romantic: { // Legacy
			primary: 'pink-500',
			accent: 'rose-300',
			gradient: 'from-pink-500/20 to-rose-400/10',
			border: 'border-pink-500/30',
			glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
			bg: 'bg-pink-500/10',
			text: 'text-pink-400',
			effect: 'hearts',
		},
		missing: {
			primary: 'violet-500',
			accent: 'purple-300',
			gradient: 'from-violet-500/20 to-purple-400/10',
			border: 'border-violet-500/30',
			glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
			bg: 'bg-violet-950/20',
			text: 'text-violet-400',
			effect: 'mist',
		},
		cold: {
			primary: 'indigo-500', 
			accent: 'blue-300',
			gradient: 'from-indigo-500/30 to-blue-400/10',
			border: 'border-indigo-500/30',
			glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
			bg: 'bg-indigo-950/30',
			text: 'text-indigo-300',
			effect: 'clouds',
		},

		// Spicy Vibes (Deep Red/Rose)
		horny: {
			primary: 'rose-900',
			accent: 'red-600',
			gradient: 'from-rose-950/60 to-red-600/20',
			border: 'border-rose-700/50',
			glow: 'shadow-[0_0_45px_rgba(225,29,72,0.5)]',
			bg: 'bg-rose-950',
			text: 'text-rose-400',
			effect: 'mist',
		},
		naughty: { // Legacy
			primary: 'rose-900',
			accent: 'red-600',
			gradient: 'from-rose-900/30 to-red-600/10',
			border: 'border-rose-700/30',
			glow: 'shadow-[0_0_30px_rgba(225,29,72,0.3)]',
			bg: 'bg-rose-950/30',
			text: 'text-rose-400',
			effect: 'mist',
		},

		// Playful Vibes (Fuchsia/Cyan)
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
		hungry: {
			primary: 'amber-500',
			accent: 'orange-300',
			gradient: 'from-amber-500/20 to-orange-400/10',
			border: 'border-amber-500/30',
			glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
			bg: 'bg-amber-950/20',
			text: 'text-amber-400',
			effect: 'particles',
		},
		waiting: {
			primary: 'purple-500',
			accent: 'fuchsia-300',
			gradient: 'from-purple-500/20 to-fuchsia-400/10',
			border: 'border-purple-500/30',
			glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
			bg: 'bg-purple-950/20',
			text: 'text-purple-400',
			effect: 'clouds',
		},
		chill: {
			primary: 'pink-400',
			accent: 'teal-300',
			gradient: 'from-pink-400/20 to-teal-300/10',
			border: 'border-pink-400/30',
			glow: 'shadow-[0_0_30px_rgba(244,114,182,0.3)]',
			bg: 'bg-slate-900', // Calm dark
			text: 'text-pink-300',
			effect: 'clouds',
		},
		grumpy: {
			primary: 'zinc-500',
			accent: 'red-300',
			gradient: 'from-zinc-600/40 to-red-400/10',
			border: 'border-zinc-500/30',
			glow: 'shadow-[0_0_30px_rgba(113,113,122,0.3)]',
			bg: 'bg-zinc-900/60',
			text: 'text-zinc-400',
			effect: 'mist',
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
