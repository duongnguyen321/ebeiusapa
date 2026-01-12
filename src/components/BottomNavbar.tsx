import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	PhoneCall,
	Gift,
	Heart,
	Power,
	Gamepad2,
	Smile,
	Ticket,
	BookHeart,
	Menu,
	Sparkles,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavbarGroup, NavItem } from './BottomNavbarGroup';

interface BottomNavbarProps {
	onEmergency: () => void;
	onScratchCard: () => void;
	onLetters: () => void;
	onGames: () => void;
	onMood: () => void;
	onWallet: () => void;
	onExit: () => void;
	showLettersActive?: boolean;
	showGamesActive?: boolean;
	showMoodActive?: boolean;
	showWalletActive?: boolean;
}

const BottomNavbar = ({
	onEmergency,
	onScratchCard,
	onLetters,
	onGames,
	onMood,
	onWallet,
	onExit,
	showLettersActive = false,
	showGamesActive = false,
	showMoodActive = false,
	showWalletActive = false,
}: BottomNavbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

	// Helper to check if a path is active
	const isActive = (path: string) => location.pathname.startsWith(path);

	// Group 1: Love & Memories
	const loveItems: NavItem[] = [
		{
			id: 'passport',
			icon: BookHeart,
			label: 'Passport',
			onClick: () => navigate('/passport'),
			color: 'text-amber-400',
			hoverBg: 'hover:bg-amber-500/20',
			isActive: isActive('/passport'),
		},
		{
			id: 'letters',
			icon: Heart,
			label: 'Thư tình',
			onClick: onLetters,
			color: 'text-pink-400',
			hoverBg: 'hover:bg-pink-500/20',
			isActive: showLettersActive,
		},
		{
			id: 'mood',
			icon: Smile,
			label: 'Mood',
			onClick: onMood,
			color: 'text-cyan-400',
			hoverBg: 'hover:bg-cyan-500/20',
			isActive: showMoodActive,
		},
	];

	// Group 2: Fun & Rewards
	const funItems: NavItem[] = [
		{
			id: 'games',
			icon: Gamepad2,
			label: 'Trò chơi',
			onClick: onGames,
			color: 'text-purple-400',
			hoverBg: 'hover:bg-purple-500/20',
			isActive: showGamesActive || isActive('/games'),
		},
		{
			id: 'scratch',
			icon: Gift,
			label: 'May mắn',
			onClick: onScratchCard,
			color: 'text-amber-400',
			hoverBg: 'hover:bg-amber-500/20',
		},
		{
			id: 'wallet',
			icon: Ticket,
			label: 'Voucher',
			onClick: onWallet,
			color: 'text-orange-400',
			hoverBg: 'hover:bg-orange-500/20',
			isActive: showWalletActive,
		},
	];

	// Group 3: System / Utils
	const systemItems: NavItem[] = [
		{
			id: 'emergency',
			icon: PhoneCall,
			label: 'Khẩn cấp',
			onClick: onEmergency,
			color: 'text-red-400',
			hoverBg: 'hover:bg-red-500/20',
		},
		{
			id: 'exit',
			icon: Power,
			label: 'Thoát',
			onClick: onExit,
			color: 'text-white/70',
			hoverBg: 'hover:bg-white/10',
		},
	];

	const handleGroupToggle = (groupId: string) => {
		setActiveGroupId(activeGroupId === groupId ? null : groupId);
	};

	return (
		<>
			{/* Global Backdrop */}
			<AnimatePresence>
				{activeGroupId && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
						onClick={() => setActiveGroupId(null)}
					/>
				)}
			</AnimatePresence>

			<motion.nav
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.3 }}
				className="bottom-navbar-compact"
			>
				<div className="bottom-navbar-pill overflow-visible relative">
					<BottomNavbarGroup
						icon={Heart}
						label="Kỷ niệm"
						items={loveItems}
						isOpen={activeGroupId === 'love'}
						onToggle={() => handleGroupToggle('love')}
						activeColor="text-pink-400"
					/>

					<div className="w-px h-6 bg-white/10 mx-1" />

					<BottomNavbarGroup
						icon={Sparkles}
						label="Giải trí"
						items={funItems}
						isOpen={activeGroupId === 'fun'}
						onToggle={() => handleGroupToggle('fun')}
						activeColor="text-purple-400"
					/>

					<div className="w-px h-6 bg-white/10 mx-1" />

					<BottomNavbarGroup
						icon={Menu}
						label="Khác"
						items={systemItems}
						isOpen={activeGroupId === 'system'}
						onToggle={() => handleGroupToggle('system')}
					/>
				</div>
			</motion.nav>
		</>
	);
};

export default BottomNavbar;
