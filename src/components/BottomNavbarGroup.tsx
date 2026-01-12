import { cn } from '@/lib/utils';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
	id: string;
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	color: string;
	hoverBg: string;
	isActive?: boolean;
}

interface BottomNavbarGroupProps {
	icon: LucideIcon;
	label: string;
	items: NavItem[];
	isOpen: boolean;
	onToggle: () => void;
	activeColor?: string; // Color when group has an active child
}

export const BottomNavbarGroup = ({
	icon: GroupIcon,
	label,
	items,
	isOpen,
	onToggle,
	activeColor = 'text-white',
}: BottomNavbarGroupProps) => {
	// Check if any child is active to highlight the group icon
	const hasActiveChild = items.some((item) => item.isActive);

	return (
		<div className="flex-shrink-0">
			{/* Dropup Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						layoutId="bottom-navbar-dropup"
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{
							type: 'spring',
							damping: 25,
							stiffness: 300,
							layout: { duration: 0.3 }
						}}
						className="absolute bottom-full mb-4 -ml-10 p-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2 z-50 min-w-[140px] w-max"
					>
						{items.map((item) => (
								<button
									key={item.id}
									onClick={() => {
										item.onClick();
									}}
									className={cn(
										"flex items-center gap-3 p-2 rounded-xl transition-colors w-full text-left",
										item.isActive ? "bg-white/10" : "hover:bg-white/5"
									)}
								>
									<div className={cn("p-1.5 rounded-lg bg-black/20", item.color)}>
										<item.icon size={18} />
									</div>
									<span className={cn(
										"text-sm font-medium",
										item.isActive ? "text-white" : "text-slate-300"
									)}>
										{item.label}
									</span>
								</button>
							))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Group Button */}
			<motion.button
				whileHover={{ scale: 1.15 }}
				whileTap={{ scale: 0.9 }}
				onClick={onToggle}
				className={cn(
					"nav-icon-btn flex-shrink-0",
					isOpen || hasActiveChild
						? `bg-white/10 border-pink-400/50 shadow-[0_0_15px_rgba(244,114,182,0.4)] ${activeColor}`
						: "text-slate-400 hover:bg-white/10"
				)}
			>
				<GroupIcon className={cn("w-5 h-5", hasActiveChild && activeColor)} />
			</motion.button>
		</div>
	);
};
