import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, X } from 'lucide-react';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';
import type { VoucherDisplay } from '@/data/vouchers/types';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface QuestCompletionModalProps {
	isOpen: boolean;
	reward: VoucherDisplay;
	onClose: () => void;
	onAddToWallet: () => void;
}

export function QuestCompletionModal({
	isOpen,
	reward,
	onClose,
	onAddToWallet,
}: QuestCompletionModalProps) {
	const { role } = useGlobalRole();
	const isAnh = role === 'anh';

	// Trigger confetti on open
	useEffect(() => {
		if (isOpen) {
			const duration = 3000;
			const end = Date.now() + duration;

			const frame = () => {
				confetti({
					particleCount: 3,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: isAnh
						? ['#06b6d4', '#3b82f6', '#ffffff']
						: ['#ec4899', '#f43f5e', '#ffffff'],
				});
				confetti({
					particleCount: 3,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: isAnh
						? ['#06b6d4', '#3b82f6', '#ffffff']
						: ['#ec4899', '#f43f5e', '#ffffff'],
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			};

			frame();
		}
	}, [isOpen, isAnh]);

	const handleAddToWallet = () => {
		onAddToWallet();
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center p-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className={cn(
								'relative w-full max-w-sm rounded-3xl overflow-hidden',
								'border border-white/20',
								'shadow-[0_0_60px_rgba(0,0,0,0.4)]'
							)}
							style={{
								background:
									'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
								backdropFilter: 'blur(24px) saturate(180%)',
								WebkitBackdropFilter: 'blur(24px) saturate(180%)',
							}}
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							transition={{ type: 'spring', stiffness: 300, damping: 25 }}
							onClick={(e) => e.stopPropagation()}
						>
							{/* Specular highlight */}
							<div
								className="absolute top-0 left-0 right-0 h-[1px]"
								style={{
									background:
										'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
								}}
							/>

							{/* Close button */}
							<motion.button
								onClick={onClose}
								className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<X className="w-4 h-4 text-white/70" />
							</motion.button>

							<div className="p-6 text-center">
								{/* Header */}
								<motion.div
									className="flex items-center justify-center gap-2 mb-4"
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									<Sparkles
										className={cn(
											'w-5 h-5',
											isAnh ? 'text-cyan-400' : 'text-pink-400'
										)}
									/>
									<span className="text-xl font-display text-white">
										HOÀN THÀNH!
									</span>
									<Sparkles
										className={cn(
											'w-5 h-5',
											isAnh ? 'text-cyan-400' : 'text-pink-400'
										)}
									/>
								</motion.div>

								{/* Voucher Card */}
								<motion.div
									className={cn(
										'p-5 rounded-2xl mb-6',
										'border border-white/15',
										isAnh ? 'bg-cyan-500/10' : 'bg-pink-500/10'
									)}
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: 0.3 }}
								>
									<div className="text-4xl mb-3">{reward.icon}</div>
									<h3
										className={cn(
											'text-lg font-display mb-2',
											isAnh ? 'text-cyan-300' : 'text-pink-300'
										)}
									>
										{reward.title}
									</h3>
									<p className="text-white/70 text-sm leading-relaxed">
										{reward.description}
									</p>
								</motion.div>

								{/* Action Button */}
								<motion.button
									onClick={handleAddToWallet}
									className={cn(
										'w-full py-3 px-6 rounded-xl text-white font-medium flex items-center justify-center gap-2',
										isAnh
											? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
											: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
									)}
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.4 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Gift className="w-5 h-5" />
									Thêm vào Ví Voucher
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
