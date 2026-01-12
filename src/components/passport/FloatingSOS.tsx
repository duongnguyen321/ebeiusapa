import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LifeBuoy, Phone, Pill, Banknote, X } from 'lucide-react';
import { emergencyContacts } from '@/data/itinerary';

export function FloatingSOS() {
	const [isOpen, setIsOpen] = useState(false);

	const sosItems = [
		{
			id: 'taxi',
			icon: Phone,
			label: 'Taxi',
			color: 'bg-green-500/20 text-green-400',
			action: () => {
				window.location.href = `tel:${emergencyContacts[0].phone.replace(/\s/g, '')}`;
			},
		},
		{
			id: 'pharmacy',
			icon: Pill,
			label: 'Nhà thuốc',
			color: 'bg-blue-500/20 text-blue-400',
			action: () => {
				// Open Google Maps search for pharmacy
				window.open(
					'https://www.google.com/maps/search/nhà+thuốc+sapa',
					'_blank'
				);
			},
		},
		{
			id: 'atm',
			icon: Banknote,
			label: 'ATM',
			color: 'bg-amber-500/20 text-amber-400',
			action: () => {
				window.open('https://www.google.com/maps/search/atm+sapa', '_blank');
			},
		},
	];

	return (
		<>
			{/* Backdrop */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm'
						onClick={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* SOS Button & Menu */}
			<div className='fixed bottom-24 right-4 z-50'>
				{/* Menu Items */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.8 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.8 }}
							transition={{ type: 'spring', stiffness: 300, damping: 25 }}
							className='absolute bottom-16 right-0 mb-2'
						>
							<div className='bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl min-w-[160px] flex flex-col gap-2'>
								{sosItems.map((item, index) => (
									<motion.button
										key={item.id}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										onClick={() => {
											item.action();
											setIsOpen(false);
										}}
										className={cn(
											"w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors",
											item.color
										)}
									>
										<item.icon className='w-5 h-5' />
										<span className='font-medium'>{item.label}</span>
									</motion.button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Main SOS Button */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						"w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
						isOpen
							? 'bg-white/20 backdrop-blur-xl border border-white/20'
							: 'bg-red-500/80 backdrop-blur-xl border border-red-400/30 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
					)}
				>
					{isOpen ? (
						<X className='w-6 h-6 text-white' />
					) : (
						<LifeBuoy className='w-6 h-6 text-white' />
					)}
				</motion.button>
			</div>
		</>
	);
}
