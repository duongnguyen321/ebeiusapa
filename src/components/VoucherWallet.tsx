import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Ticket, Check, Gift } from 'lucide-react';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import type { VoucherReward } from '@/data/easterEggs';

interface VoucherWalletProps {
	onClose?: () => void;
}

export default function VoucherWallet({ onClose }: VoucherWalletProps) {
	const { unlockedVouchers, usedVoucherIds, openRedeemModal } = useEasterEgg();

	const handleVoucherClick = (voucher: VoucherReward) => {
		if (usedVoucherIds.includes(voucher.id)) return;
		openRedeemModal(voucher);
	};

	if (unlockedVouchers.length === 0) {
		return (
			<div className='text-center py-8'>
				<Gift className='w-16 h-16 text-white/20 mx-auto mb-4' />
				<p className='text-white/50'>Chưa có voucher nào!</p>
				<p className='text-white/30 text-sm mt-2'>
					Hãy tìm trứng bí ẩn và trả lời đúng câu hỏi để nhận voucher nhé!
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{/* Voucher Grid */}
			<div className='grid grid-cols-1 gap-3'>
				{unlockedVouchers.map((voucher) => {
					const isUsed = usedVoucherIds.includes(voucher.id);

					return (
						<motion.button
							key={voucher.id}
							whileHover={{ scale: isUsed ? 1 : 1.02 }}
							whileTap={{ scale: isUsed ? 1 : 0.98 }}
							onClick={() => handleVoucherClick(voucher)}
							disabled={isUsed}
							className={cn(
								"relative p-4 rounded-2xl text-left transition-all overflow-hidden",
								isUsed
									? 'bg-white/5 opacity-50'
									: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30'
							)}
						>
							{/* Ticket pattern */}
							<div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full' />
							<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full' />

							<div className='flex items-center gap-4'>
								<span className='text-3xl'>{voucher.icon}</span>
								<div className='flex-1'>
									<h4
										className={cn("font-bold", isUsed ? 'text-white/40' : 'text-white')}
									>
										{voucher.title}
									</h4>
									<p
										className={cn("text-sm", isUsed ? 'text-white/20' : 'text-white/60')}
									>
										{voucher.description}
									</p>
								</div>
								{isUsed ? (
									<div className='flex items-center gap-1 text-green-400 text-sm'>
										<Check className='w-4 h-4' />
										<span>Đã dùng</span>
									</div>
								) : (
									<Ticket className='w-5 h-5 text-amber-400' />
								)}
							</div>
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
