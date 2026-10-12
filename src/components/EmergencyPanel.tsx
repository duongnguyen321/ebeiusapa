import { cn } from '@/lib/utils';
import { Phone, PhoneCall, Car, Shield, Hotel, Utensils, Sparkles } from 'lucide-react';
import { emergencyContacts } from '@/data/itinerary';
import BottomSheet from './BottomSheet';

const renderContactIcon = (icon: string) => {
	switch (icon.toLowerCase()) {
		case 'taxi':
			return <Car className='w-5 h-5 text-amber-400' />;
		case 'shield':
			return <Shield className='w-5 h-5 text-cyan-400' />;
		case 'hotel':
			return <Hotel className='w-5 h-5 text-blue-400' />;
		case 'utensils':
			return <Utensils className='w-5 h-5 text-emerald-400' />;
		case 'sparkles':
			return <Sparkles className='w-5 h-5 text-purple-400' />;
		default:
			return <Phone className='w-5 h-5 text-amber-400' />;
	}
};

interface EmergencyPanelProps {
	isOpen: boolean;
	onClose: () => void;
}

const EmergencyPanel = ({ isOpen, onClose }: EmergencyPanelProps) => {
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			title='Liên hệ khẩn cấp'
			icon={<PhoneCall className='w-5 h-5 text-red-400' />}
			maxWidth='md:max-w-sm'
		>
			<div className='space-y-2'>
				{emergencyContacts.map((contact, idx) => (
					<a
						key={idx}
						href={`tel:${contact.phone.replace(/\s/g, '')}`}
						className={cn("flex items-center gap-3 p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors group bg-gradient-to-r from-red-500/5 to-orange-500/5 border-white/10")}
					>
						<div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center'>
							{renderContactIcon(contact.icon)}
						</div>
						<div className='flex-1'>
							<div className='text-white text-sm font-medium'>
								{contact.name}
							</div>
							<div className='text-amber-400 text-sm'>{contact.phone}</div>
						</div>
						<Phone className='w-4 h-4 text-white/40 group-hover:text-amber-400 transition-colors' />
					</a>
				))}
			</div>
		</BottomSheet>
	);
};

export default EmergencyPanel;
