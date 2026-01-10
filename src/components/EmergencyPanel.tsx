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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm'
					onClick={onClose}
				>
					<motion.div
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: '100%', opacity: 0 }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className='w-full md:max-w-sm md:mx-4'
					>
						<div className='glass-card rounded-t-3xl md:rounded-2xl overflow-hidden'>
							{/* Handle bar for mobile */}
							<div className='flex justify-center pt-3 pb-1 md:hidden'>
								<div className='w-10 h-1 bg-white/30 rounded-full' />
							</div>

							{/* Header */}
							<div className='p-4 pb-2 flex items-center justify-between border-b border-white/10'>
								<h3 className='text-lg font-display text-white flex items-center gap-2'>
									<PhoneCall className='w-5 h-5 text-red-400' />
									Liên hệ khẩn cấp
								</h3>
								<button
									onClick={onClose}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
									aria-label='Đóng'
								>
									<X className='w-5 h-5' />
								</button>
							</div>

							{/* Contacts */}
							<div className='p-4 space-y-2'>
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
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default EmergencyPanel;
