import { motion } from 'framer-motion';
import {
	PhoneCall,
	Gift,
	Heart,
	Power,
	Gamepad2,
	Smile,
	Ticket,
	BookHeart,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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

    // Helper to check if a path is active
    const isActive = (path: string) => location.pathname.startsWith(path);

	const navItems = [
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
			label: 'Tâm trạng',
			onClick: onMood,
			color: 'text-cyan-400',
			hoverBg: 'hover:bg-cyan-500/20',
			isActive: showMoodActive,
		},
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
		{
			id: 'emergency',
			icon: PhoneCall,
			label: 'Gọi điện',
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

	return (
		<motion.nav
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.3 }}
			className='bottom-navbar-compact'
		>
			<div className='bottom-navbar-pill overflow-x-auto'>
				{navItems.map((item) => (
					<motion.button
						key={item.id}
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.9 }}
						onClick={item.onClick}
						className={`nav-icon-btn flex-shrink-0 ${item.hoverBg} ${
							item.isActive
								? 'bg-white/10 border-pink-400/50 shadow-[0_0_15px_rgba(244,114,182,0.4)]'
								: ''
						}`}
						aria-label={item.label}
					>
						<item.icon className={`w-5 h-5 ${item.color}`} />
					</motion.button>
				))}
			</div>
		</motion.nav>
	);
};

export default BottomNavbar;
