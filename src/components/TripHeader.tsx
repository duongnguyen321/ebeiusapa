import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronDown,
	Hotel,
	Bus,
	Cake,
	MapPin,
	Phone,
	Calendar,
	Umbrella,
	Backpack,
	Shirt,
	PhoneCall,
	Check,
} from 'lucide-react';
import { tripInfo, emergencyContacts } from '@/data/itinerary';
import { useEffect } from 'react';
import ExpandableCardModal from './ExpandableCardModal';

const TripHeader = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [packingTab, setPackingTab] = useState<'boy' | 'girl'>('boy');
	const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

	// Load checked state from localStorage
	useEffect(() => {
		const saved = localStorage.getItem('packing_list_checked');
		if (saved) {
			setCheckedItems(JSON.parse(saved));
		}
	}, []);

	// Save checked state to localStorage
	useEffect(() => {
		localStorage.setItem('packing_list_checked', JSON.stringify(checkedItems));
	}, [checkedItems]);

	const toggleItem = (
		role: 'boy' | 'girl',
		catIdx: number,
		itemIdx: number
	) => {
		const key = `${role}-${catIdx}-${itemIdx}`;
		setCheckedItems((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const isItemChecked = (
		role: 'boy' | 'girl',
		catIdx: number,
		itemIdx: number
	) => {
		return !!checkedItems[`${role}-${catIdx}-${itemIdx}`];
	};

	const calculateProgress = (role: 'boy' | 'girl') => {
		let total = 0;
		let checked = 0;

		tripInfo.packingList[role].forEach((cat, catIdx) => {
			cat.items.forEach((_, itemIdx) => {
				total++;
				if (checkedItems[`${role}-${catIdx}-${itemIdx}`]) {
					checked++;
				}
			});
		});

		return total === 0 ? 0 : (checked / total) * 100;
	};

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
					className={cn(
						'w-5 h-5 text-white/60 transition-transform',
						isExpanded ? 'rotate-180' : ''
					)}
				/>
			</button>

			{/* Expanded Details */}
			<AnimatePresence>
				{isExpanded && (
					<ExpandableCardModal
						isOpen={isExpanded}
						onClose={() => setIsExpanded(false)}
					>
						<div className='mt-3 space-y-3 pb-20'>
							{/* Description Header inside Modal */}
							<div className='mb-6'>
								<h2 className='text-3xl md:text-4xl font-playfair text-white mb-2'>
									{tripInfo.hotel.name}
								</h2>
								<p className='text-white/60'>{tripInfo.hotel.address}</p>
							</div>
							{/* Top Grid: Hotel, Transport, Birthday, Plan B */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								{/* Hotel Info */}
								<div className='glass-panel p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-orange-500/5'>
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
								<div className='glass-panel p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5'>
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

								{/* Plan B Info */}
								<div className='glass-panel p-4 rounded-xl bg-gradient-to-br from-slate-500/10 to-gray-500/10 border-slate-500/20'>
									<div className='flex items-center gap-2 text-slate-400 text-sm font-medium mb-3'>
										<Umbrella className='w-4 h-4' />
										Plan B (Mưa/Lạnh)
									</div>
									<div className='space-y-2 text-sm'>
										<div className='text-white/60 text-xs italic'>
											{tripInfo.planB.condition}
										</div>
										<div className='text-white font-medium'>
											{tripInfo.planB.place}
										</div>
										<div className='text-white/80'>
											{tripInfo.planB.activity}
										</div>
										<div className='text-emerald-400/80 text-xs'>
											✨ {tripInfo.planB.benefit}
										</div>
									</div>
								</div>
							</div>

							{/* Packing List */}
							<div className='glass-panel p-4 rounded-xl relative overflow-hidden'>
								{/* Background Gradients based on active tab */}
								<div
									className={cn(
										'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
										packingTab === 'boy'
											? 'from-cyan-500/10 to-blue-500/5 opacity-100'
											: 'opacity-0'
									)}
								/>
								<div
									className={cn(
										'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
										packingTab === 'girl'
											? 'from-pink-500/10 to-rose-500/5 opacity-100'
											: 'opacity-0'
									)}
								/>

								<div className='relative z-10'>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center gap-2 text-sm font-medium text-white/90'>
											<Backpack className='w-4 h-4' />
											Gói đồ
										</div>
										{/* Tabs */}
										<div className='flex bg-black/20 p-1 rounded-lg backdrop-blur-sm'>
											<button
												onClick={() => setPackingTab('boy')}
												className={cn(
													'px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
													packingTab === 'boy'
														? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
														: 'text-white/40 hover:text-white/60'
												)}
											>
												<Shirt className='w-3.5 h-3.5' />
												Của Anh
											</button>
											<button
												onClick={() => setPackingTab('girl')}
												className={cn(
													'px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
													packingTab === 'girl'
														? 'bg-pink-500/20 text-pink-400 shadow-sm'
														: 'text-white/40 hover:text-white/60'
												)}
											>
												<Shirt className='w-3.5 h-3.5' />
												Của Em
											</button>
										</div>
									</div>

									{/* Progress Bar */}
									<div className='mb-6'>
										<div className='flex justify-between text-xs mb-1.5'>
											<span className='text-white/50'>Tiến độ</span>
											<span
												className={cn(
													'font-medium',
													packingTab === 'boy'
														? 'text-cyan-400'
														: 'text-pink-400'
												)}
											>
												{Math.round(calculateProgress(packingTab))}%
											</span>
										</div>
										<div className='h-1.5 bg-white/10 rounded-full overflow-hidden'>
											<motion.div
												className={cn(
													'h-full rounded-full transition-all duration-500',
													packingTab === 'boy' ? 'bg-cyan-400' : 'bg-pink-400'
												)}
												initial={{ width: 0 }}
												animate={{ width: `${calculateProgress(packingTab)}%` }}
											/>
										</div>
									</div>

									{/* List Content */}
									<div className='space-y-5 min-h-[200px]'>
										<AnimatePresence mode='wait'>
											<motion.div
												key={packingTab}
												initial={{
													opacity: 0,
													x: packingTab === 'boy' ? -20 : 20,
												}}
												animate={{ opacity: 1, x: 0 }}
												exit={{
													opacity: 0,
													x: packingTab === 'boy' ? 20 : -20,
												}}
												transition={{ duration: 0.2 }}
											>
												{tripInfo.packingList[packingTab].map(
													(category, catIdx) => (
														<div key={catIdx} className='mb-5 last:mb-0'>
															<div
																className={cn(
																	'text-xs uppercase font-bold mb-2 tracking-wider',
																	packingTab === 'boy'
																		? 'text-cyan-400/80'
																		: 'text-pink-400/80'
																)}
															>
																{category.title}
															</div>
															<ul className='space-y-2'>
																{category.items.map((item, itemIdx) => {
																	const isChecked = isItemChecked(
																		packingTab,
																		catIdx,
																		itemIdx
																	);
																	return (
																		<motion.li
																			key={itemIdx}
																			layout
																			onClick={() =>
																				toggleItem(packingTab, catIdx, itemIdx)
																			}
																			className={cn(
																				'text-sm flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all group select-none',
																				isChecked
																					? 'bg-white/5 text-white/30'
																					: 'hover:bg-white/5 text-white/80'
																			)}
																		>
																			<div
																				className={cn(
																					'w-4 h-4 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors',
																					isChecked
																						? packingTab === 'boy'
																							? 'bg-cyan-500/20 border-cyan-500/20'
																							: 'bg-pink-500/20 border-pink-500/20'
																						: 'border-white/20 group-hover:border-white/40'
																				)}
																			>
																				{isChecked && (
																					<motion.div
																						initial={{ scale: 0 }}
																						animate={{ scale: 1 }}
																					>
																						<Check
																							className={cn(
																								'w-3 h-3',
																								packingTab === 'boy'
																									? 'text-cyan-400'
																									: 'text-pink-400'
																							)}
																						/>
																					</motion.div>
																				)}
																			</div>
																			<span
																				className={cn(
																					'transition-all',
																					isChecked && 'line-through'
																				)}
																			>
																				{item}
																			</span>
																		</motion.li>
																	);
																})}
															</ul>
														</div>
													)
												)}
											</motion.div>
										</AnimatePresence>
									</div>
								</div>
							</div>
						</div>
					</ExpandableCardModal>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default TripHeader;
