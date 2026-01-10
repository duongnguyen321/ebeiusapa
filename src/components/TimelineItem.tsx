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
        glass-panel p-3 md:p-4 rounded-xl transition-all duration-300
        ${isActive ? 'timeline-active' : ''}
        ${isUpcoming ? 'timeline-upcoming' : ''}
      `}
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
		>
			{/* Header Row: Time + Status Badges inline */}
			<div className='flex flex-wrap items-center gap-2 mb-2'>
				{/* Time Badge */}
				<div
					className={`
            px-2.5 py-1 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1.5
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

				{/* Status Badge - inline next to time */}
				{isActive && (
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className='badge-active text-[10px]'
					>
						Đang diễn ra
					</motion.span>
				)}
				{isUpcoming && !isActive && (
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className='badge-upcoming text-[10px]'
					>
						Sắp tới
					</motion.span>
				)}

				{/* Highlight Badge - inline */}
				{item.isHighlight && (
					<span className='px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 rounded text-pink-400 text-[10px]'>
						💕 Đặc biệt
					</span>
				)}
			</div>

			{/* Content */}
			<div className='space-y-1.5'>
				{/* Title */}
				<h4 className='text-white font-semibold text-sm md:text-base leading-snug'>
					{item.title}
				</h4>

				{/* Description */}
				{item.description && (
					<p className='text-amber-400/80 text-xs md:text-sm leading-relaxed'>
						{item.description}
					</p>
				)}

				{/* Meta info grid */}
				<div className='flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60'>
					{/* Distance */}
					{item.distance && (
						<div className='flex items-center gap-1 text-pink-400'>
							<Navigation className='w-3 h-3' />
							<span>{item.distance}</span>
						</div>
					)}

					{/* Transport */}
					{item.transport && (
						<div className='flex items-center gap-1'>
							<Car className='w-3 h-3' />
							<span>{item.transport}</span>
						</div>
					)}
				</div>

				{/* Address */}
				{item.address && (
					<div className='flex items-start gap-1.5 text-white/60 text-xs'>
						<MapPin className='w-3 h-3 mt-0.5 flex-shrink-0' />
						<span>{item.address}</span>
					</div>
				)}

				{/* Hotline */}
				{item.hotline && (
					<a
						href={`tel:${item.hotline.replace(/\s/g, '')}`}
						className='inline-flex items-center gap-1.5 text-amber-400 text-xs glass-panel px-2 py-1 rounded-md hover:bg-amber-500/20 transition-colors'
					>
						<Phone className='w-3 h-3' />
						{item.hotline}
					</a>
				)}

				{/* Lưu ý yêu thương */}
				{item.warnings && item.warnings.length > 0 && (
					<div className='space-y-1 pt-1'>
						{item.warnings.map((warning, idx) => (
							<div
								key={idx}
								className='flex items-start gap-1.5 text-pink-400 text-xs bg-pink-500/10 px-2 py-1.5 rounded-md'
							>
								<Heart className='w-3 h-3 mt-0.5 flex-shrink-0 fill-pink-400' />
								<span>{warning}</span>
							</div>
						))}
					</div>
				)}

				{/* Note */}
				{item.note && (
					<div className='flex items-start gap-1.5 text-white/60 text-xs pt-1'>
						<Info className='w-3 h-3 mt-0.5 flex-shrink-0' />
						<span className='italic'>{item.note}</span>
					</div>
				)}

				{/* Photo Tips Toggle */}
				{item.photoTips && (
					<div className='pt-2'>
						<button
							onClick={() => setShowPhotoTips(!showPhotoTips)}
							className='flex items-center gap-1.5 text-pink-400 text-xs glass-panel px-2 py-1 rounded-md hover:bg-pink-500/20 transition-colors'
						>
							<Camera className='w-3 h-3' />
							<span>Tips chụp ảnh</span>
							<ChevronDown
								className={`w-3 h-3 transition-transform ${
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
									<div className='mt-2 p-2 bg-pink-500/10 border border-pink-500/20 rounded-md space-y-1.5 text-xs'>
										{item.photoTips.angle && (
											<div>
												<span className='text-pink-400 font-medium'>
													📐 Góc chụp:
												</span>
												<span className='text-white/80 ml-1'>
													{item.photoTips.angle}
												</span>
											</div>
										)}
										{item.photoTips.pose && (
											<div>
												<span className='text-pink-400 font-medium'>
													💃 Dáng pose:
												</span>
												<span className='text-white/80 ml-1'>
													{item.photoTips.pose}
												</span>
											</div>
										)}
										{item.photoTips.time && (
											<div>
												<span className='text-pink-400 font-medium'>
													⏰ Thời điểm:
												</span>
												<span className='text-white/80 ml-1'>
													{item.photoTips.time}
												</span>
											</div>
										)}
										{item.photoTips.tips && (
											<div>
												<span className='text-pink-400 font-medium'>
													💡 Tips:
												</span>
												<span className='text-white/80 ml-1'>
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
			</div>
		</motion.div>
	);
};

export default TimelineItem;
