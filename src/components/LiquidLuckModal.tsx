import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { useLiquidLuck } from '@/hooks/useLiquidLuck';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import {
	LiquidContainer,
	LiquidScratchReveal,
	LiquidRoleSelector,
} from './liquid';

interface LiquidLuckModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function LiquidLuckModal({ isOpen, onClose }: LiquidLuckModalProps) {
	const {
		role,
		theme,
		currentTask,
		isMixing,
		isRevealing,
		setRole,
		resetRole,
		startMixing,
		completeMixing,
		closeReveal,
	} = useLiquidLuck();
	
	const { unlockVoucher } = useEasterEgg();

	const handleClose = () => {
		closeReveal();
		onClose();
	};

	const handlePlayAgain = () => {
		closeReveal();
		startMixing();
	};

	const handleReveal = () => {
		if (currentTask) {
			// Map LiquidTask to VoucherReward
			// Use emojis for icons since VoucherWallet expects string (or we adapt)
			let icon = '🎁';
			if (currentTask.type === 'dare') icon = '⚡';
			if (currentTask.type === 'spicy') icon = '🌶️';

			unlockVoucher({
				id: currentTask.id,
				title: currentTask.content,
				description: currentTask.description || 'Liquid Luck Reward',
				icon: icon, 
				isRedeemed: false,
				isUsed: false,
			});
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
					onClick={handleClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
						className={cn(
							'relative w-full max-w-md p-6 rounded-3xl',
							'bg-slate-900/90 border border-white/10',
							'backdrop-blur-xl',
							theme?.shadow
						)}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className='flex items-center justify-between mb-6'>
							<div className='flex items-center gap-3'>
								<span className='text-2xl'>🧪</span>
								<h2 className='text-xl font-bold text-white'>Liquid Luck</h2>
							</div>
							<div className='flex items-center gap-2'>
								{role && (
									<button
										onClick={resetRole}
										className='p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
										title='Đổi vai trò'
									>
										<RotateCcw className='w-4 h-4 text-white/60' />
									</button>
								)}
								<button
									onClick={handleClose}
									className='p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
								>
									<X className='w-5 h-5 text-white/60' />
								</button>
							</div>
						</div>

						{/* Content */}
						<div className='min-h-[400px] flex items-center justify-center'>
							<AnimatePresence mode='wait'>
								{/* Role Selection */}
								{!role && (
									<motion.div
										key='role-select'
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
									>
										<LiquidRoleSelector onSelectRole={setRole} />
									</motion.div>
								)}

								{/* Mixing State */}
								{role && theme && !isRevealing && (
									<motion.div
										key='mixing'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										className='w-full'
									>
										{!isMixing ? (
											<div className='text-center space-y-6'>
												<p className='text-white/60'>
													Sẵn sàng thử vận may chưa?
												</p>
												<motion.button
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													onClick={startMixing}
													className={cn(
														'px-8 py-4 rounded-2xl font-bold text-lg',
														'transition-all',
														role === 'anh'
															? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
															: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
													)}
												>
													🎲 Bắt đầu lắc!
												</motion.button>
											</div>
										) : (
											<LiquidContainer
												theme={theme}
												onMixComplete={completeMixing}
											/>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Role Badge */}
						{role && (
							<div className='absolute bottom-4 left-4'>
								<span
									className={cn(
										'text-xs font-medium px-3 py-1 rounded-full',
										role === 'anh'
											? 'bg-cyan-500/20 text-cyan-300'
											: 'bg-pink-500/20 text-pink-300'
									)}
								>
									{role === 'anh' ? '👑 Anh' : '💖 Em'}
								</span>
							</div>
						)}
					</motion.div>

					{/* Scratch Reveal Overlay */}
					<AnimatePresence>
						{isRevealing && currentTask && theme && (
							<LiquidScratchReveal
								task={currentTask}
								theme={theme}
								onClose={handlePlayAgain}
								onReveal={handleReveal}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
