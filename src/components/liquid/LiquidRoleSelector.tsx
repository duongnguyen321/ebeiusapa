import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Crown, Heart } from 'lucide-react';
import { LIQUID_THEMES } from '@/data/liquidLuck';

interface LiquidRoleSelectorProps {
	onSelectRole: (role: 'anh' | 'em') => void;
}

export function LiquidRoleSelector({ onSelectRole }: LiquidRoleSelectorProps) {
	return (
		<div className='text-center space-y-6'>
			<div>
				<h2 className='text-2xl font-bold text-white mb-2'>Liquid Luck 🧪</h2>
				<p className='text-white/60 text-sm'>
					Chọn vai trò của bạn để bắt đầu trò chơi
				</p>
			</div>

			<div className='flex gap-4 justify-center'>
				{/* Anh Role */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onSelectRole('anh')}
					className={cn(
						'relative p-6 rounded-2xl border-2 transition-all',
						'w-36 flex flex-col items-center gap-3',
						'border-cyan-500/30 hover:border-cyan-400/50',
						LIQUID_THEMES.anh.gradient,
						LIQUID_THEMES.anh.shadow
					)}
				>
					<motion.div
						animate={{ rotate: [0, 10, -10, 0] }}
						transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
					>
						<Crown className='w-10 h-10 text-cyan-400' />
					</motion.div>
					<span className='font-bold text-cyan-300 text-lg'>Anh</span>
					<span className='text-xs text-white/50'>Thử thách</span>
				</motion.button>

				{/* Em Role */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onSelectRole('em')}
					className={cn(
						'relative p-6 rounded-2xl border-2 transition-all',
						'w-36 flex flex-col items-center gap-3',
						'border-pink-500/30 hover:border-pink-400/50',
						LIQUID_THEMES.em.gradient,
						LIQUID_THEMES.em.shadow
					)}
				>
					<motion.div
						animate={{ scale: [1, 1.1, 1] }}
						transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
					>
						<Heart className='w-10 h-10 text-pink-400' fill='#f472b6' />
					</motion.div>
					<span className='font-bold text-pink-300 text-lg'>Em</span>
					<span className='text-xs text-white/50'>Phần thưởng</span>
				</motion.button>
			</div>

			<p className='text-xs text-white/40 max-w-xs mx-auto'>
				Anh sẽ nhận thử thách, Em sẽ nhận phần thưởng.
				<br />
				Chọn đúng vai nhé! 😉
			</p>
		</div>
	);
}
