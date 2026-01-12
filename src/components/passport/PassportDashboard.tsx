import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
	Lock,
	Unlock,
	CheckCircle2,
	Zap,
	ArrowLeft,
	Settings,
	RotateCcw,
} from 'lucide-react';
import { usePassport } from '@/contexts/PassportContext';
import { itinerary } from '@/data/itinerary';
import { getQuestsForDay, type PassportQuest } from '@/data/passportQuests';
import { QuestModal } from './QuestModal';

interface PassportDashboardProps {
	onBack: () => void;
}

export function PassportDashboard({ onBack }: PassportDashboardProps) {
	const { role, theme, isQuestCompleted, resetPassport } = usePassport();
	const [selectedQuest, setSelectedQuest] = useState<PassportQuest | null>(
		null
	);
	const [showSettings, setShowSettings] = useState(false);

	// Get current time for active state
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 60000);
		return () => clearInterval(timer);
	}, []);

	// Theme colors based on role
	const themeColors = useMemo(
		() => ({
			gradient:
				theme === 'pink'
					? 'from-pink-500/20 to-rose-500/10'
					: 'from-cyan-500/20 to-blue-500/10',
			border:
				theme === 'pink' ? 'border-pink-200/30' : 'border-cyan-200/30',
			glow:
				theme === 'pink'
					? 'shadow-[0_0_20px_rgba(236,72,153,0.3)]'
					: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
			text: theme === 'pink' ? 'text-pink-400' : 'text-cyan-400',
			bg: theme === 'pink' ? 'bg-pink-500/20' : 'bg-cyan-500/20',
		}),
		[theme]
	);

	// Get quests by day
	const questsByDay = useMemo(() => {
		return itinerary.map((day) => ({
			day,
			quests: getQuestsForDay(day.id),
		}));
	}, []);

	// Check if quest is active (current time slot)
	const isQuestActive = (quest: PassportQuest, dayDate: string) => {
		const today = currentTime.toISOString().split('T')[0];
		if (dayDate !== today) return false;

		const [hours] = quest.time.split(':').map(Number);
		const currentHour = currentTime.getHours();
		return currentHour >= hours && currentHour < hours + 2;
	};

	const getQuestStatus = (quest: PassportQuest, dayDate: string) => {
		if (isQuestCompleted(quest.id)) return 'completed';
		if (isQuestActive(quest, dayDate)) return 'active';
		return 'locked';
	};

	const handleResetPassport = () => {
		if (confirm('Bạn có chắc muốn reset toàn bộ Passport? Mọi tiến trình sẽ bị xóa.')) {
			resetPassport();
			onBack();
		}
	};

	return (
		<div className='min-h-screen p-4 pb-24 md:p-6'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='flex items-center justify-between mb-6'
			>
				<button
					onClick={onBack}
					className='p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors'
				>
					<ArrowLeft className='w-5 h-5 text-white' />
				</button>

				<div className='text-center flex-1'>
					<h1 className='text-xl font-bold text-white'>Love Passport</h1>
					<p className={cn("text-sm", themeColors.text)}>
						{role === 'anh' ? '🛡️ Guardian Mode' : '👑 Princess Mode'}
					</p>
				</div>

				<button
					onClick={() => setShowSettings(!showSettings)}
					className='p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors'
				>
					<Settings className='w-5 h-5 text-white' />
				</button>
			</motion.div>

			{/* Settings Dropdown */}
			<AnimatePresence>
				{showSettings && (
					<motion.div
						initial={{ opacity: 0, y: -10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'auto' }}
						exit={{ opacity: 0, y: -10, height: 0 }}
						className='mb-4 overflow-hidden'
					>
						<div className='bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10'>
							<button
								onClick={handleResetPassport}
								className='flex items-center gap-3 w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400'
							>
								<RotateCcw className='w-4 h-4' />
								<span className='text-sm'>Reset Passport</span>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Day Timeline */}
			<div className='space-y-6'>
				{questsByDay.map(({ day, quests }, dayIndex) => (
					<motion.div
						key={day.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: dayIndex * 0.1 }}
					>
						{/* Day Header */}
						<div
							className={cn(
								"p-4 rounded-2xl mb-3 backdrop-blur-xl border",
								`bg-gradient-to-r ${themeColors.gradient}`,
								themeColors.border,
								themeColors.glow
							)}
						>
							<div className='flex items-center gap-3'>
								<span className='text-2xl'>{day.weather.icon}</span>
								<div>
									<h2 className='text-lg font-bold text-white'>
										Ngày {day.id}: {day.dateLabel}
									</h2>
									<p className='text-sm text-white/60'>{day.theme}</p>
								</div>
							</div>
						</div>

						{/* Quests */}
						<div className='space-y-2 pl-4 border-l-2 border-white/10 ml-4'>
							{quests.map((quest, questIndex) => {
								const status = getQuestStatus(quest, day.date);

								return (
									<motion.button
										key={quest.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: dayIndex * 0.1 + questIndex * 0.05 }}
										onClick={() => setSelectedQuest(quest)}
										className={cn(
											"w-full p-4 rounded-xl text-left bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all",
											status === 'active' && `animate-pulse ${themeColors.bg}`,
											status === 'completed' && 'opacity-60'
										)}
									>
										<div className='flex items-center gap-3'>
											{/* Status Icon */}
											<div
												className={cn(
													"w-10 h-10 rounded-xl flex items-center justify-center",
													status === 'completed' && 'bg-green-500/20',
													status === 'active' && themeColors.bg,
													status === 'locked' && 'bg-white/10'
												)}
											>
												{status === 'completed' && (
													<CheckCircle2 className='w-5 h-5 text-green-400' />
												)}
												{status === 'active' && (
													<Zap className={`w-5 h-5 ${themeColors.text}`} />
												)}
												{status === 'locked' && (
													<Lock className='w-5 h-5 text-white/40' />
												)}
											</div>

											{/* Quest Info */}
											<div className='flex-1'>
												<div className='flex items-center gap-2'>
													<span className='text-xs text-white/40'>
														{quest.time}
													</span>
													{status === 'active' && (
														<span
															className={cn("text-xs px-2 py-0.5 rounded-full", themeColors.bg, themeColors.text)}
														>
															NOW
														</span>
													)}
												</div>
												<p className='text-white font-medium'>
													{role === 'anh' ? quest.titleAnh : quest.titleEm}
												</p>
											</div>

											{/* Arrow */}
											<Unlock
												className={cn(
													"w-4 h-4",
													status === 'completed' ? 'text-green-400' : 'text-white/20'
												)}
											/>
										</div>
									</motion.button>
								);
							})}
						</div>
					</motion.div>
				))}
			</div>

			{/* Quest Modal */}
			<AnimatePresence>
				{selectedQuest && (
					<QuestModal
						quest={selectedQuest}
						onClose={() => setSelectedQuest(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
