import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Lock, Check, Gift, Copy, Eye, EyeOff } from 'lucide-react';
import { usePassport } from '@/contexts/PassportContext';
import { type PassportQuest, validateQuestCode } from '@/data/passportQuests';
import confetti from 'canvas-confetti';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
	breaks: true,
	html: true,
});
interface QuestModalProps {
	quest: PassportQuest;
	onClose: () => void;
}

export function QuestModal({ quest, onClose }: QuestModalProps) {
	const { role, theme, isQuestCompleted, completeQuest, unlockStamp } =
		usePassport();
	const [inputCode, setInputCode] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);

	const isCompleted = isQuestCompleted(quest.id);

	// Theme colors
	const themeColors = {
		gradient:
			theme === 'pink'
				? 'from-pink-500/20 to-rose-500/10'
				: 'from-cyan-500/20 to-blue-500/10',
		border: theme === 'pink' ? 'border-pink-200/30' : 'border-cyan-200/30',
		glow:
			theme === 'pink'
				? 'shadow-[0_0_30px_rgba(236,72,153,0.3)]'
				: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
		text: theme === 'pink' ? 'text-pink-400' : 'text-cyan-400',
		bg: theme === 'pink' ? 'bg-pink-500/20' : 'bg-cyan-500/20',
		buttonBg:
			theme === 'pink'
				? 'from-pink-500 to-rose-500'
				: 'from-cyan-500 to-blue-500',
	};

	const handleValidateCode = () => {
		if (validateQuestCode(quest.id, inputCode)) {
			setSuccess(true);
			completeQuest(quest.id);
			if (quest.stampId) {
				unlockStamp(quest.stampId);
			}

			// Trigger confetti
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
				colors: theme === 'pink' 
					? ['#ec4899', '#f472b6', '#fce7f3'] 
					: ['#06b6d4', '#22d3ee', '#cffafe'],
			});

			setTimeout(() => {
				onClose();
			}, 2500);
		} else {
			setError('Sai mã rồi! Hỏi lại anh/em nhé 💕');
			setInputCode('');
		}
	};

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(quest.code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			setShowCode(true);
		}
	};

	// Reset state when quest changes
	useEffect(() => {
		setInputCode('');
		setError('');
		setSuccess(false);
		setShowCode(false);
		setCopied(false);
	}, [quest.id]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, borderRadius: '100%', opacity: 0 }}
				animate={{ scale: 1, borderRadius: '24px', opacity: 1 }}
				exit={{ scale: 0.8, borderRadius: '100%', opacity: 0 }}
				transition={{ type: 'spring', stiffness: 200, damping: 20 }}
				className={`
					relative overflow-hidden
					bg-white/10 backdrop-blur-2xl
					border ${themeColors.border}
					${themeColors.glow}
					max-w-md w-full
				`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Background Gradient */}
				<div
					className={`absolute inset-0 bg-gradient-to-br ${themeColors.gradient} mix-blend-overlay`}
				/>

				{/* Content */}
				<div className='relative z-10 p-6'>
					{/* Success State */}
					{success ? (
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className='text-center py-8'
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: 'spring', delay: 0.1 }}
								className='w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'
							>
								<Check className='w-10 h-10 text-green-400' />
							</motion.div>
							<h3 className='text-2xl font-bold text-white mb-3'>
								Quest Hoàn Thành! 🎉
							</h3>
							<div className='bg-white/5 rounded-xl p-4 mt-4'>
								<Gift className={`w-8 h-8 ${themeColors.text} mx-auto mb-2`} />
								<p className='text-white/80'>{quest.reward}</p>
							</div>
						</motion.div>
					) : isCompleted ? (
						/* Already Completed State */
						<div className='text-center py-8'>
							<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Check className='w-8 h-8 text-green-400' />
							</div>
							<h3 className='text-xl font-bold text-white mb-2'>
								Đã hoàn thành!
							</h3>
							<p className='text-white/60'>{quest.reward}</p>
							<button
								onClick={onClose}
								className='mt-6 px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors'
							>
								Đóng
							</button>
						</div>
					) : (
						/* Active Quest State */
						<>
							{/* Header */}
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-2'>
									<Lock className={`w-5 h-5 ${themeColors.text}`} />
									<span className='text-sm text-white/60'>{quest.time}</span>
								</div>
								<button
									onClick={onClose}
									className='p-2 rounded-full hover:bg-white/10 transition-colors'
								>
									<X className='w-5 h-5 text-white/60' />
								</button>
							</div>

							{/* Quest Title */}
							<h2 className='text-xl font-bold text-white mb-2'>
								{role === 'anh' ? quest.titleAnh : quest.titleEm}
							</h2>

							{/* Quest Description */}
							<div className='bg-white/5 rounded-xl p-4 mb-6'>
								<div
									className='prose prose-invert prose-p:text-white/80 prose-p:my-1 prose-headings:text-white prose-strong:text-white text-white/80 whitespace-pre-line max-w-none'
									dangerouslySetInnerHTML={{
										__html: md.render(
											role === 'anh' ? quest.descriptionAnh : quest.descriptionEm
										),
									}}
								/>
							</div>

							{/* Role-specific UI */}
							{role === 'anh' ? (
								/* Anh: Show Code to read */
								<div className='space-y-4'>
									<p className='text-sm text-white/60 text-center'>
										Hoàn thành nhiệm vụ rồi đọc code cho Em nhé!
									</p>

									<div
										className={`
											relative p-4 rounded-xl text-center
											bg-white/10 border ${themeColors.border}
										`}
									>
										<div className='flex items-center justify-center gap-3'>
											{showCode ? (
												<span className='text-3xl font-bold tracking-[0.3em] text-white'>
													{quest.code}
												</span>
											) : (
												<span className='text-3xl font-bold tracking-[0.3em] text-white/30'>
													••••
												</span>
											)}

											<button
												onClick={() => setShowCode(!showCode)}
												className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
											>
												{showCode ? (
													<EyeOff className='w-5 h-5 text-white' />
												) : (
													<Eye className='w-5 h-5 text-white' />
												)}
											</button>
										</div>

										{/* Copy Button */}
										<button
											onClick={handleCopyCode}
											className={`
												mt-3 flex items-center gap-2 mx-auto px-4 py-2 rounded-lg
												bg-white/10 hover:bg-white/20 transition-colors
												text-sm text-white/60
											`}
										>
											<Copy className='w-4 h-4' />
											{copied ? 'Đã copy!' : 'Copy mã'}
										</button>
									</div>

									{/* Mark Complete Button */}
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											completeQuest(quest.id);
											if (quest.stampId) unlockStamp(quest.stampId);
											confetti({
												particleCount: 50,
												spread: 60,
												origin: { y: 0.7 },
											});
											setTimeout(onClose, 1000);
										}}
										className={`
											w-full py-4 rounded-xl font-bold
											bg-gradient-to-r ${themeColors.buttonBg}
											text-white shadow-lg
											hover:brightness-110 transition-all
										`}
									>
										✅ Đã đọc code cho Em
									</motion.button>
								</div>
							) : (
								/* Em: Input Code */
								<div className='space-y-4'>
									<p className='text-sm text-white/60 text-center'>
										Nhập mã Anh đọc để nhận phần thưởng!
									</p>

									<input
										type='text'
										value={inputCode}
										onChange={(e) => {
											setInputCode(e.target.value.toUpperCase());
											setError('');
										}}
										placeholder='Nhập mã...'
										className={`
											w-full bg-white/10 border ${themeColors.border}
											rounded-xl px-4 py-4 text-white text-center
											text-2xl tracking-[0.3em] font-bold
											placeholder:text-white/30 placeholder:text-lg placeholder:tracking-normal
											focus:outline-none focus:ring-2 focus:ring-white/30
											uppercase
										`}
										autoFocus
										maxLength={10}
									/>

									{/* Error Message */}
									<AnimatePresence>
										{error && (
											<motion.p
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0 }}
												className='text-red-400 text-sm text-center'
											>
												{error}
											</motion.p>
										)}
									</AnimatePresence>

									{/* Submit Button */}
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handleValidateCode}
										disabled={!inputCode}
										className={`
											w-full py-4 rounded-xl font-bold transition-all
											${
												inputCode
													? `bg-gradient-to-r ${themeColors.buttonBg} text-white shadow-lg hover:brightness-110`
													: 'bg-white/10 text-white/40 cursor-not-allowed'
											}
										`}
									>
										Xác nhận
									</motion.button>
								</div>
							)}

							{/* Reward Preview */}
							<div className='mt-6 pt-4 border-t border-white/10'>
								<div className='flex items-center gap-2 text-sm text-white/40'>
									<Gift className='w-4 h-4' />
									<span>Phần thưởng: {quest.reward}</span>
								</div>
							</div>
						</>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}
