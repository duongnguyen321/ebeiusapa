import { motion } from 'framer-motion';
import { PhoneCall, Gift, Heart, Power, Gamepad2 } from 'lucide-react';

interface BottomNavbarProps {
	onEmergency: () => void;
	onScratchCard: () => void;
	onLetters: () => void;
	onGames: () => void;
	onExit: () => void;
	showLettersActive?: boolean;
	showGamesActive?: boolean;
}

const BottomNavbar = ({
	onEmergency,
	onScratchCard,
	onLetters,
	onGames,
	onExit,
	showLettersActive = false,
	showGamesActive = false,
}: BottomNavbarProps) => {
	const navItems = [
		{
			id: 'emergency',
			icon: PhoneCall,
			label: 'Gọi điện',
			onClick: onEmergency,
			color: 'text-red-400',
			hoverBg: 'hover:bg-red-500/20',
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
			id: 'games',
			icon: Gamepad2,
			label: 'Trò chơi',
			onClick: onGames,
			color: 'text-purple-400',
			hoverBg: 'hover:bg-purple-500/20',
			isActive: showGamesActive,
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
			<div className='bottom-navbar-pill'>
				{navItems.map((item) => (
					<motion.button
						key={item.id}
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.9 }}
						onClick={item.onClick}
						className={`nav-icon-btn ${item.hoverBg} ${
							item.isActive ? 'ring-2 ring-pink-400/50' : ''
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
