import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Cherry } from 'lucide-react';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';
import type { GlobalRole } from '@/types/quest';

interface GlobalRoleSelectorProps {
	onComplete?: () => void;
}

export function GlobalRoleSelector({ onComplete }: GlobalRoleSelectorProps) {
	const { setRole } = useGlobalRole();

	const handleSelectRole = (role: GlobalRole) => {
		setRole(role);
		onComplete?.();
	};

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center p-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{/* Backdrop */}
				<div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />

				{/* Content */}
				<motion.div
					className="relative z-10 w-full max-w-md"
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				>
					<div className="text-center mb-8">
						<h2 className="text-2xl md:text-3xl font-playfair text-white mb-3">
							Chọn vai trò của bạn
						</h2>
						<p className="text-sm text-white/60">
							Vai trò sẽ ảnh hưởng đến toàn bộ trải nghiệm trong chuyến đi
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{/* Anh Card */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => handleSelectRole('anh')}
							className={cn(
								'relative p-6 rounded-3xl overflow-hidden',
								'bg-gradient-to-br from-cyan-500/20 to-blue-500/10',
								'border border-cyan-500/30 hover:border-cyan-500/50',
								'backdrop-blur-xl',
								'transition-all duration-300'
							)}
						>
							{/* Specular highlight */}
							<div
								className="absolute top-0 left-0 right-0 h-[1px]"
								style={{
									background:
										'linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.4) 50%, transparent 100%)',
								}}
							/>

							<div className="flex flex-col items-center gap-4">
								<div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
									<Snowflake className="w-8 h-8 text-cyan-400" />
								</div>
								<div className="text-center">
									<p className="text-xl font-display text-cyan-300">❄️ Anh</p>
									<p className="text-xs text-white/50 mt-2">Chủ động</p>
									
								</div>
							</div>
						</motion.button>

						{/* Em Card */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => handleSelectRole('em')}
							className={cn(
								'relative p-6 rounded-3xl overflow-hidden',
								'bg-gradient-to-br from-pink-500/20 to-rose-500/10',
								'border border-pink-500/30 hover:border-pink-500/50',
								'backdrop-blur-xl',
								'transition-all duration-300'
							)}
						>
							{/* Specular highlight */}
							<div
								className="absolute top-0 left-0 right-0 h-[1px]"
								style={{
									background:
										'linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.4) 50%, transparent 100%)',
								}}
							/>

							<div className="flex flex-col items-center gap-4">
								<div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center">
									<Cherry className="w-8 h-8 text-pink-400" />
								</div>
								<div className="text-center">
									<p className="text-xl font-display text-pink-300">🌸 Em</p>
									<p className="text-xs text-white/50 mt-2">Được chiều</p>
								</div>
							</div>
						</motion.button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
