import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronDown,
	Hotel,
	Bus,
	DollarSign,
	Cake,
	MapPin,
	Phone,
	Calendar,
} from 'lucide-react';
import { tripInfo } from '@/data/itinerary';

const TripHeader = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<motion.div
			className='mb-6 md:mb-8'
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.1 }}
		>
			{/* Collapsed Header */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className='w-full glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors'
			>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center'>
						<Hotel className='w-5 h-5 text-amber-400' />
					</div>
					<div className='text-left'>
						<div className='text-white font-medium text-sm md:text-base'>
							{tripInfo.hotel.name}
						</div>
						<div className='text-white/60 text-xs md:text-sm'>
							{tripInfo.hotel.address}
						</div>
					</div>
				</div>
				<ChevronDown
					className={`w-5 h-5 text-white/60 transition-transform ${
						isExpanded ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{/* Expanded Details */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='overflow-hidden'
					>
						<div className='mt-3 grid grid-cols-1 md:grid-cols-2 gap-3'>
							{/* Hotel Info */}
							<div className='glass-panel p-4 rounded-xl'>
								<div className='flex items-center gap-2 text-amber-400 text-sm font-medium mb-3'>
									<Hotel className='w-4 h-4' />
									Khách sạn
								</div>
								<div className='space-y-2 text-sm'>
									<div className='flex items-start gap-2 text-white/80'>
										<MapPin className='w-4 h-4 mt-0.5 text-white/50 flex-shrink-0' />
										{tripInfo.hotel.address}
									</div>
									{tripInfo.hotel.phone && (
										<a
											href={`tel:${tripInfo.hotel.phone}`}
											className='flex items-center gap-2 text-amber-400 hover:underline'
										>
											<Phone className='w-4 h-4' />
											{tripInfo.hotel.phone}
										</a>
									)}
									<div className='flex items-center gap-2 text-white/60'>
										<Calendar className='w-4 h-4' />
										Check-in: {tripInfo.hotel.checkIn}
									</div>
									<div className='flex items-center gap-2 text-white/60'>
										<Calendar className='w-4 h-4' />
										Check-out: {tripInfo.hotel.checkOut}
									</div>
									<div className='mt-2 pt-2 border-t border-white/10'>
										<div className='text-white/50 text-xs mb-1'>Bao gồm:</div>
										<div className='flex flex-wrap gap-1'>
											{tripInfo.hotel.includes.map((item, idx) => (
												<span
													key={idx}
													className='px-2 py-0.5 bg-white/10 rounded text-xs text-white/80'
												>
													{item}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Transport Info */}
							<div className='glass-panel p-4 rounded-xl'>
								<div className='flex items-center gap-2 text-blue-400 text-sm font-medium mb-3'>
									<Bus className='w-4 h-4' />
									Di chuyển
								</div>
								<div className='space-y-2 text-sm'>
									<div className='text-white font-medium'>
										{tripInfo.transport.company}
									</div>
									<div className='text-white/60'>
										<span className='text-emerald-400'>→</span> Đi:{' '}
										{tripInfo.transport.departure}
									</div>
									<div className='text-white/60'>
										<span className='text-orange-400'>←</span> Về:{' '}
										{tripInfo.transport.returnDeparture}
									</div>
									<div className='text-white/50 text-xs'>
										Dự kiến đến HN: {tripInfo.transport.returnArrival}
									</div>
								</div>
							</div>
							{/* Birthday Info */}
							<div className='glass-panel p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20'>
								<div className='flex items-center gap-2 text-pink-400 text-sm font-medium mb-3'>
									<Cake className='w-4 h-4' />
									Sinh nhật
								</div>
								<div className='text-sm'>
									<div className='text-white font-medium text-lg'>
										{tripInfo.birthday.date}
									</div>
									<div className='text-white/60'>
										{tripInfo.birthday.person} 🎂
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default TripHeader;
