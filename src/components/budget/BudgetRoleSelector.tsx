import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Briefcase, ShoppingBag } from 'lucide-react';
import { useBudget, BudgetRole } from '@/contexts/BudgetContext';

export function BudgetRoleSelector() {
	const { setRole } = useBudget();

	const handleSelectRole = (role: BudgetRole) => {
		setRole(role);
	};

	return (
		<div className='space-y-4'>
			<div className='text-center mb-6'>
				<h2 className='text-xl font-display text-white mb-2'>Chọn vai trò của bạn</h2>
				<p className='text-sm text-white/60'>
					Mỗi người một nhiệm vụ, cùng nhau quản lý chi tiêu hiệu quả!
				</p>
			</div>

			<div className='grid grid-cols-2 gap-3'>
				{/* Anh Card */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => handleSelectRole('anh')}
					className={cn(
						'relative p-4 rounded-2xl overflow-hidden',
						'bg-gradient-to-br from-cyan-500/20 to-blue-500/10',
						'border border-cyan-500/30 hover:border-cyan-500/50',
						'transition-all duration-300'
					)}
				>
					<div className='flex flex-col items-center gap-3'>
						<div className='w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center'>
							<Briefcase className='w-7 h-7 text-cyan-400' />
						</div>
						<div className='text-center'>
							<p className='text-lg font-display text-cyan-300'>Anh 💼</p>
							<p className='text-xs text-white/50 mt-1'>Treasurer</p>
							<p className='text-[10px] text-white/40 mt-2'>
								Quản lý chi phí chung, logistics, vé
							</p>
						</div>
					</div>
				</motion.button>

				{/* Em Card */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => handleSelectRole('em')}
					className={cn(
						'relative p-4 rounded-2xl overflow-hidden',
						'bg-gradient-to-br from-pink-500/20 to-rose-500/10',
						'border border-pink-500/30 hover:border-pink-500/50',
						'transition-all duration-300'
					)}
				>
					<div className='flex flex-col items-center gap-3'>
						<div className='w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center'>
							<ShoppingBag className='w-7 h-7 text-pink-400' />
						</div>
						<div className='text-center'>
							<p className='text-lg font-display text-pink-300'>Em 🛍️</p>
							<p className='text-xs text-white/50 mt-1'>Shopper</p>
							<p className='text-[10px] text-white/40 mt-2'>
								Chi tiêu cá nhân, quà lưu niệm
							</p>
						</div>
					</div>
				</motion.button>
			</div>

			<p className='text-center text-xs text-white/40 mt-4'>
				💡 Tip: "Anh" sẽ có sẵn danh sách chi phí theo kế hoạch
			</p>
		</div>
	);
}
