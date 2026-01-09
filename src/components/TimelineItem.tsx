import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Phone,
	MapPin,
	Info,
	Navigation,
	Camera,
	ChevronDown,
	Utensils,
	Mountain,
	Car,
	Bed,
	Sparkles,
	ShoppingBag,
	Heart,
} from 'lucide-react';
import type { TimelineItem as TimelineItemType } from '@/data/itinerary';

interface TimelineItemProps {
	item: TimelineItemType;
	isActive?: boolean;
	isUpcoming?: boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
	meal: <Utensils className='w-4 h-4' />,
	activity: <Mountain className='w-4 h-4' />,
	transport: <Car className='w-4 h-4' />,
	rest: <Bed className='w-4 h-4' />,
	spa: <Sparkles className='w-4 h-4' />,
	shopping: <ShoppingBag className='w-4 h-4' />,
};

const TimelineItem = ({
	item,
	isActive = false,
	isUpcoming = false,
}: TimelineItemProps) => {
	const [showPhotoTips, setShowPhotoTips] = useState(false);

	return (
		<motion.div
			className={`
        glass-panel p-4 rounded-xl transition-all duration-300
        ${isActive ? 'timeline-active' : ''}
        ${isUpcoming ? 'timeline-upcoming' : ''}
      `}
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
		>
			<div className='flex gap-4'>
				{/* Time Badge */}
				<div className='flex-shrink-0'>
					<div
						className={`
            px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1.5
            ${
							isActive
								? 'bg-pink-500/30 text-pink-300 border border-pink-500/50'
								: isUpcoming
								? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
								: 'bg-amber-500/20 text-amber-400'
						}
          `}
					>
						{item.type && typeIcons[item.type]}
						{item.time}
					</div>

					{/* Status Badge */}
					{isActive && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mt-2 text-center'
						>
							<span className='badge-active text-[10px]'>Đang diễn ra</span>
						</motion.div>
					)}
					{isUpcoming && !isActive && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mt-2 text-center'
						>
							<span className='badge-upcoming text-[10px]'>Sắp tới</span>
						</motion.div>
					)}
				</div>

				<div className='flex-1 min-w-0'>
					{/* Title */}
					<h4 className='text-white font-semibold mb-2'>{item.title}</h4>

					{/* Description */}
					{item.description && (
						<p className='text-amber-400/80 text-sm mb-2'>{item.description}</p>
					)}

					{/* Distance Row */}
					{item.distance && (
						<div className='flex flex-wrap gap-3 mb-2 text-sm'>
							<div className='flex items-center gap-1.5 text-pink-400'>
								<Navigation className='w-3.5 h-3.5' />
								<span>{item.distance}</span>
							</div>
						</div>
					)}

					{/* Transport */}
					{item.transport && (
						<div className='flex items-start gap-2 text-white/60 text-sm mb-2'>
							<Car className='w-4 h-4 mt-0.5 flex-shrink-0' />
							<span>{item.transport}</span>
						</div>
					)}

					{/* Address */}
					{item.address && (
						<div className='flex items-start gap-2 text-white/60 text-sm mb-1'>
							<MapPin className='w-4 h-4 mt-0.5 flex-shrink-0' />
							<span>{item.address}</span>
						</div>
					)}

					{/* Hotline */}
					{item.hotline && (
						<a
							href={`tel:${item.hotline.replace(/\s/g, '')}`}
							className='inline-flex items-center gap-2 text-amber-400 text-sm glass-panel px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors mb-2'
						>
							<Phone className='w-3.5 h-3.5' />
							{item.hotline}
						</a>
					)}

					{/* Lưu ý yêu thương */}
					{item.warnings && item.warnings.length > 0 && (
						<div className='mt-2 space-y-1'>
							{item.warnings.map((warning, idx) => (
								<div
									key={idx}
									className='flex items-start gap-2 text-pink-400 text-sm bg-pink-500/10 px-2 py-1.5 rounded-lg'
								>
									<Heart className='w-4 h-4 mt-0.5 flex-shrink-0 fill-pink-400' />
									<span>{warning}</span>
								</div>
							))}
						</div>
					)}

					{/* Note */}
					{item.note && (
						<div className='flex items-start gap-2 text-white/60 text-sm mt-2'>
							<Info className='w-4 h-4 mt-0.5 flex-shrink-0' />
							<span className='italic'>{item.note}</span>
						</div>
					)}

					{/* Photo Tips Toggle */}
					{item.photoTips && (
						<div className='mt-3'>
							<button
								onClick={() => setShowPhotoTips(!showPhotoTips)}
								className='flex items-center gap-2 text-pink-400 text-sm glass-panel px-3 py-1.5 rounded-lg hover:bg-pink-500/20 transition-colors'
							>
								<Camera className='w-3.5 h-3.5' />
								<span>Tips chụp ảnh</span>
								<ChevronDown
									className={`w-3.5 h-3.5 transition-transform ${
										showPhotoTips ? 'rotate-180' : ''
									}`}
								/>
							</button>

							<AnimatePresence>
								{showPhotoTips && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className='overflow-hidden'
									>
										<div className='mt-2 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg space-y-2 text-sm'>
											{item.photoTips.angle && (
												<div>
													<span className='text-pink-400 font-medium'>
														📐 Góc chụp:
													</span>
													<span className='text-white/80 ml-2'>
														{item.photoTips.angle}
													</span>
												</div>
											)}
											{item.photoTips.pose && (
												<div>
													<span className='text-pink-400 font-medium'>
														💃 Dáng pose:
													</span>
													<span className='text-white/80 ml-2'>
														{item.photoTips.pose}
													</span>
												</div>
											)}
											{item.photoTips.time && (
												<div>
													<span className='text-pink-400 font-medium'>
														⏰ Thời điểm:
													</span>
													<span className='text-white/80 ml-2'>
														{item.photoTips.time}
													</span>
												</div>
											)}
											{item.photoTips.tips && (
												<div>
													<span className='text-pink-400 font-medium'>
														💡 Tips:
													</span>
													<span className='text-white/80 ml-2'>
														{item.photoTips.tips}
													</span>
												</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					)}

					{/* Highlight Badge */}
					{item.isHighlight && (
						<div className='mt-2 inline-block px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 rounded text-pink-400 text-xs'>
							💕 Đặc biệt
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default TimelineItem;
