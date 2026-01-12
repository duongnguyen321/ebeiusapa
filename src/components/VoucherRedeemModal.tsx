import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X, Lock, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { VoucherReward } from '@/data/easterEggs';

interface VoucherRedeemModalProps {
	voucher: VoucherReward;
	onClose: () => void;
	onRedeem: (password: string) => boolean;
}

export function VoucherRedeemModal({
	voucher,
	onClose,
	onRedeem,
}: VoucherRedeemModalProps) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	// Reset state when voucher changes
	useEffect(() => {
		setPassword('');
		setError('');
		setSuccess(false);
	}, [voucher]);

	const handleRedeem = () => {
		const isSuccess = onRedeem(password);
		if (isSuccess) {
			setSuccess(true);
			setTimeout(() => {
				onClose();
			}, 2000);
		} else {
			setError('Sai mật khẩu rồi! Đưa máy cho anh nhập nhé 😘');
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, y: 20 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.9, y: 20 }}
				className='bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/10'
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
						<h3 className='text-xl font-bold text-white mb-2'>Đã sử dụng!</h3>
						<p className='text-white/60'>
							Hãy thực hiện {voucher.title} ngay nhé! 💕
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
								onClick={onClose}
								className='p-1 rounded-full hover:bg-white/10 transition-colors'
							>
								<X className='w-5 h-5 text-white/60' />
							</button>
						</div>

						{/* Voucher Info */}
						<div className='bg-white/5 rounded-xl p-4 mb-6 text-center'>
							<span className='text-4xl'>{voucher.icon}</span>
							<h4 className='text-white font-bold mt-2'>{voucher.title}</h4>
							<p className='text-sm text-white/80 mt-2'>
								{voucher.description}
							</p>
						</div>

						{/* Instructions */}
						<p className='text-white/60 text-sm text-center mb-4'>
							Đưa điện thoại cho anh nhập mật khẩu để sử dụng voucher này nhé!
							😉
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
							autoFocus
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
							className={cn(
								"w-full mt-4 py-3 rounded-xl font-bold transition-all",
								password
									? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
									: 'bg-white/10 text-white/40 cursor-not-allowed'
							)}
						>
							Xác nhận
						</motion.button>
					</>
				)}
			</motion.div>
		</motion.div>
	);
}
