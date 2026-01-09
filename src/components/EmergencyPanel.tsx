import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, PhoneCall } from 'lucide-react';
import { emergencyContacts } from '@/data/itinerary';

interface EmergencyPanelProps {
	isOpen: boolean;
	onClose: () => void;
}

const EmergencyPanel = ({ isOpen, onClose }: EmergencyPanelProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* Content */}
					<motion.div
						className='fixed bottom-20 left-4 right-4 md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2 md:w-80 z-[100] glass-panel rounded-2xl p-4 overflow-hidden'
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					>
						{/* Header */}
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-white font-semibold text-lg flex items-center gap-2'>
								<PhoneCall className='w-5 h-5 text-red-400' />
								Liên hệ khẩn cấp
							</h3>
							<button
								onClick={onClose}
								className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors'
							>
								<X className='w-4 h-4 text-white/60' />
							</button>
						</div>

						{/* Contacts */}
						<div className='space-y-2'>
							{emergencyContacts.map((contact, idx) => (
								<a
									key={idx}
									href={`tel:${contact.phone.replace(/\s/g, '')}`}
									className='flex items-center gap-3 p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors group'
								>
									<span className='text-2xl'>{contact.icon}</span>
									<div className='flex-1'>
										<div className='text-white text-sm font-medium'>
											{contact.name}
										</div>
										<div className='text-amber-400 text-sm'>
											{contact.phone}
										</div>
									</div>
									<Phone className='w-4 h-4 text-white/40 group-hover:text-amber-400 transition-colors' />
								</a>
							))}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default EmergencyPanel;
