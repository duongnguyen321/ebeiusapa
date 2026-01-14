import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Check, SkipForward } from 'lucide-react';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';
import { useDailyQuest } from '@/contexts/DailyQuestContext';
import type { DailyQuest } from '@/types/quest';

interface DailyQuestCardProps {
	quest: DailyQuest;
	onComplete: () => void;
	onSkip?: () => void;
	onClose?: () => void;
}

export function DailyQuestCard({
	quest,
	onComplete,
	onSkip,
	onClose,
}: DailyQuestCardProps) {
	const { role } = useGlobalRole();
	const isAnh = role === 'anh';

	// Role-based content
	const title = isAnh ? quest.titleAnh : quest.titleEm;
	const description = isAnh ? quest.descriptionAnh : quest.descriptionEm;

	// Quest type icons
	const questTypeIcons: Record<string, string> = {
		photo: '📸',
		journal: '✍️',
		service: '🎁',
		sensual: '🔥',
	};

	// Expiry labels
	const expiryLabels: Record<string, string> = {
		next_activity: 'Hết hạn khi bắt đầu hoạt động tiếp theo',
		end_of_day: 'Hết hạn cuối ngày',
	};

	return (
		<AnimatePresence>
			<motion.div
				className={cn(
					'fixed bottom-24 left-4 right-4 z-50',
					'rounded-3xl overflow-hidden',
					'border border-white/20',
					'shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
				)}
				style={{
					background: isAnh
						? 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.10) 100%)'
						: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(244,63,94,0.10) 100%)',
					backdropFilter: 'blur(20px) saturate(180%)',
					WebkitBackdropFilter: 'blur(20px) saturate(180%)',
				}}
				layout // Enables morphing layout animations
				initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 10 }}
				animate={{ 
					opacity: 1, 
					y: 0, 
					scale: 1, 
					rotateX: 0,
					transition: {
						type: 'spring',
						stiffness: 400,
						damping: 30,
						mass: 1
					}
				}}
				exit={{ 
					opacity: 0, 
					y: 100, 
					scale: 0.9,
					transition: { duration: 0.2 }
				}}
			>
				{/* Specular highlight */}
				<div
					className="absolute top-0 left-0 right-0 h-[1px]"
					style={{
						background: isAnh
							? 'linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.4) 50%, transparent 100%)'
							: 'linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.4) 50%, transparent 100%)',
					}}
				/>

				{/* Close button */}
				{onClose && (
					<motion.button
						onClick={onClose}
						className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<X className="w-4 h-4 text-white/70" />
					</motion.button>
				)}

				<div className="p-5">
					{/* Header */}
					<div className="flex items-center gap-3 mb-3">
						<span className="text-2xl">{questTypeIcons[quest.questType]}</span>
						<div>
							<p className="text-[10px] uppercase tracking-wider text-white/50">
								✨ Nhiệm vụ mới
							</p>
							<h3
								className={cn(
									'text-lg font-display',
									isAnh ? 'text-cyan-300' : 'text-pink-300'
								)}
							>
								{title}
							</h3>
						</div>
					</div>

					{/* Description */}
					<p className="text-white/80 text-sm leading-relaxed mb-4 pr-8">
						"{description}"
					</p>

					{/* Expiry */}
					<div className="flex items-center gap-2 text-white/50 text-xs mb-4">
						<Clock className="w-3 h-3" />
						<span>{expiryLabels[quest.expiresAt]}</span>
					</div>

					{/* Actions */}
					<div className="flex gap-3">
						{onSkip && (
							<motion.button
								onClick={onSkip}
								className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<SkipForward className="w-4 h-4" />
								Bỏ qua
							</motion.button>
						)}
						<motion.button
							onClick={onComplete}
							className={cn(
								'flex-1 py-3 px-4 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors',
								isAnh
									? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
									: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
							)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Check className="w-4 h-4" />
							Hoàn thành
						</motion.button>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
