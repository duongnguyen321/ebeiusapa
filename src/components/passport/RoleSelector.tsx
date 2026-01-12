import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Crown, Sparkles } from 'lucide-react';
import { usePassport, PassportRole } from '@/contexts/PassportContext';

interface RoleSelectorProps {
	onComplete: () => void;
}

export function RoleSelector({ onComplete }: RoleSelectorProps) {
	const { setRole } = usePassport();

	const handleSelectRole = (role: PassportRole) => {
		setRole(role);
		onComplete();
	};

	const roles = [
		{
			id: 'anh' as const,
			title: 'Anh',
			subtitle: 'Guardian / Người bảo vệ',
			description: 'Nhiệm vụ: Chăm sóc, bảo vệ, hoàn thành quest',
			icon: ShieldCheck,
			gradient: 'from-cyan-500/20 to-blue-500/10',
			borderColor: 'border-cyan-200/30',
			glowShadow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
			iconColor: 'text-cyan-400',
			iconGlow: 'drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]',
			hoverGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]',
		},
		{
			id: 'em' as const,
			title: 'Em',
			subtitle: 'Princess / Công chúa',
			description: 'Nhiệm vụ: Được yêu thương, nhập code, nhận phần thưởng',
			icon: Crown,
			gradient: 'from-pink-500/20 to-rose-500/10',
			borderColor: 'border-pink-200/30',
			glowShadow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
			iconColor: 'text-pink-400',
			iconGlow: 'drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]',
			hoverGlow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]',
		},
	];

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-6'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='text-center mb-10'
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', delay: 0.3 }}
					className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-4'
				>
					<Sparkles className='w-8 h-8 text-amber-400' />
				</motion.div>
				<h1 className='text-3xl md:text-4xl font-playfair text-white mb-3'>
					Love Passport
				</h1>
				<p className='text-white/60 max-w-xs mx-auto'>
					Chọn vai trò của bạn trong hành trình tình yêu
				</p>
			</motion.div>

			{/* Role Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl'>
				{roles.map((role, index) => (
					<motion.button
						key={role.id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
						whileHover={{ scale: 1.03, y: -5 }}
						whileTap={{ scale: 0.97 }}
						onClick={() => handleSelectRole(role.id)}
						className={`
							relative overflow-hidden p-8 rounded-3xl
							bg-white/10 backdrop-blur-xl
							border ${role.borderColor}
							${role.glowShadow}
							${role.hoverGlow}
							transition-all duration-300
							text-left group
						`}
					>
						{/* Background Gradient */}
						<div
							className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-50`}
						/>

						{/* Refraction Layer */}
						<div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-30 pointer-events-none' />

						{/* Content */}
						<div className='relative z-10'>
							{/* Icon */}
							<motion.div
								className={`
									w-16 h-16 rounded-2xl
									bg-white/10 backdrop-blur-md
									border border-white/20
									flex items-center justify-center mb-5
									group-hover:scale-110 transition-transform duration-300
								`}
							>
								<role.icon
									className={`w-8 h-8 ${role.iconColor} ${role.iconGlow}`}
								/>
							</motion.div>

							{/* Text */}
							<h2 className='text-2xl font-bold text-white mb-1'>
								{role.title}
							</h2>
							<p className={`text-sm ${role.iconColor} mb-3`}>
								{role.subtitle}
							</p>
							<p className='text-sm text-white/60'>{role.description}</p>
						</div>

						{/* Corner Accent */}
						<div
							className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${role.gradient} opacity-30 blur-2xl`}
						/>
					</motion.button>
				))}
			</div>

			{/* Footer Note */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className='text-center text-white/40 text-sm mt-8 max-w-sm'
			>
				💡 Tip: "Anh" sẽ nhận nhiệm vụ và đọc code cho "Em" nhập để mở khóa phần
				thưởng
			</motion.p>
		</div>
	);
}
