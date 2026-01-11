import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Lock, Check, Gift } from 'lucide-react';
import { useState } from 'react';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import type { VoucherReward } from '@/data/easterEggs';

interface VoucherWalletProps {
	onClose?: () => void;
}

export default function VoucherWallet({ onClose }: VoucherWalletProps) {
	const { unlockedVouchers, usedVoucherIds, redeemVoucher } = useEasterEgg();
	const [selectedVoucher, setSelectedVoucher] = useState<VoucherReward | null>(
		null
	);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleVoucherClick = (voucher: VoucherReward) => {
		if (usedVoucherIds.includes(voucher.id)) return;
		setSelectedVoucher(voucher);
		setPassword('');
		setError('');
		setSuccess(false);
	};

	const handleRedeem = () => {
		if (!selectedVoucher) return;

		const isSuccess = redeemVoucher(selectedVoucher.id, password);
		if (isSuccess) {
			setSuccess(true);
			setTimeout(() => {
				setSelectedVoucher(null);
				setSuccess(false);
			}, 2000);
		} else {
			setError('Sai mật khẩu rồi! Đưa máy cho anh nhập nhé 😘');
		}
	};

	const handleCloseModal = () => {
		setSelectedVoucher(null);
		setPassword('');
		setError('');
		setSuccess(false);
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
							className={`relative p-4 rounded-2xl text-left transition-all overflow-hidden ${
								isUsed
									? 'bg-white/5 opacity-50'
									: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30'
							}`}
						>
							{/* Ticket pattern */}
							<div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full' />
							<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full' />

							<div className='flex items-center gap-4'>
								<span className='text-3xl'>{voucher.icon}</span>
								<div className='flex-1'>
									<h4
										className={`font-bold ${
											isUsed ? 'text-white/40' : 'text-white'
										}`}
									>
										{voucher.title}
									</h4>
									<p
										className={`text-sm ${
											isUsed ? 'text-white/20' : 'text-white/60'
										}`}
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

			{/* Password Modal */}
			<AnimatePresence>
				{selectedVoucher && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
						onClick={handleCloseModal}
					>
						<motion.div
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							className='bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/10'
							onClick={(e) => e.stopPropagation()}
						>
							{success ? (
								<motion.div
									initial={{ scale: 0.8 }}
									animate={{ scale: 1 }}
									className='text-center py-8'
								>
									<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Check className='w-8 h-8 text-green-400' />
									</div>
									<h3 className='text-xl font-bold text-white mb-2'>
										Đã sử dụng!
									</h3>
									<p className='text-white/60'>
										Hãy thực hiện {selectedVoucher.title} ngay nhé! 💕
									</p>
								</motion.div>
							) : (
								<>
									{/* Header */}
									<div className='flex items-center justify-between mb-6'>
										<div className='flex items-center gap-2'>
											<Lock className='w-5 h-5 text-amber-400' />
											<h3 className='text-lg font-bold text-white'>
												Xác nhận sử dụng
											</h3>
										</div>
										<button
											onClick={handleCloseModal}
											className='p-1 rounded-full hover:bg-white/10 transition-colors'
										>
											<X className='w-5 h-5 text-white/60' />
										</button>
									</div>

									{/* Voucher Info */}
									<div className='bg-white/5 rounded-xl p-4 mb-6 text-center'>
										<span className='text-4xl'>{selectedVoucher.icon}</span>
										<h4 className='text-white font-bold mt-2'>
											{selectedVoucher.title}
										</h4>
									</div>

									{/* Instructions */}
									<p className='text-white/60 text-sm text-center mb-4'>
										Đưa điện thoại cho anh nhập mật khẩu để sử dụng voucher này
										nhé! 😉
									</p>

									{/* Password Input */}
									<input
										type='password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
											setError('');
										}}
										placeholder='Nhập mật khẩu...'
										className='w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-center text-lg tracking-widest focus:outline-none focus:border-amber-500/50'
									/>

									{/* Error */}
									{error && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className='text-red-400 text-sm text-center mt-2'
										>
											{error}
										</motion.p>
									)}

									{/* Submit */}
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handleRedeem}
										disabled={!password}
										className={`w-full mt-4 py-3 rounded-xl font-bold transition-all ${
											password
												? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
												: 'bg-white/10 text-white/40 cursor-not-allowed'
										}`}
									>
										Xác nhận
									</motion.button>
								</>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
