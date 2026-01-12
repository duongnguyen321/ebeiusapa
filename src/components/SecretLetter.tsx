import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import { loveLetters, type LoveLetter } from '@/data/letters';
import { useSurprise } from '@/contexts/SurpriseContext';

// Initialize markdown-it
const md = new MarkdownIt({
	html: false,
	breaks: true,
	linkify: true,
});

interface SecretLetterProps {
	letterIndex: number;
	onClose?: () => void;
	isOpen?: boolean;
}

export function SecretLetter({
	letterIndex,
	onClose,
	isOpen = false,
}: SecretLetterProps) {
	const letter = loveLetters[letterIndex];
	const {
		isLetterUnlocked,
		unlockLetter,
		canUnlockLetter,
		getLetterUnlockTime,
	} = useSurprise();
	const [showContent, setShowContent] = useState(false);

	const isUnlocked = isLetterUnlocked(letterIndex);
	const canUnlock = canUnlockLetter(letterIndex);
	const unlockTime = getLetterUnlockTime(letterIndex);

	// Render markdown content
	const renderedContent = useMemo(() => {
		if (letter?.content) {
			return md.render(letter.content);
		}
		return '';
	}, [letter?.content]);

	useEffect(() => {
		if (isOpen && isUnlocked) {
			setShowContent(true);
		}
	}, [isOpen, isUnlocked]);

	const handleUnlock = () => {
		if (canUnlock && !isUnlocked) {
			unlockLetter(letterIndex);
			setShowContent(true);
		}
	};

	if (!letter) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm'
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						className='glass-card w-full max-w-md max-h-[80vh] overflow-hidden'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className='relative p-6 border-b border-white/10 bg-gradient-to-r from-pink-500/20 to-purple-500/20'>
							<button
								onClick={onClose}
								className='absolute top-4 right-4 p-2 rounded-full glass-button'
							>
								<X className='w-4 h-4' />
							</button>

							<div className='flex items-center gap-3'>
								<div className='p-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-500'>
									<Heart className='w-6 h-6 text-white fill-white' />
								</div>
								<div>
									<p className='text-sm text-white/60'>Ngày {letter.day}</p>
									<h3 className='text-lg font-display font-semibold text-white'>
										{letter.title}
									</h3>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className='p-6 overflow-y-auto max-h-[50vh]'>
							{!isUnlocked && !canUnlock ? (
								<div className='text-center py-8'>
									<div className='text-4xl mb-4'>🔒</div>
									<p className='text-white/70 mb-2'>
										Bức thư này chưa đến giờ mở
									</p>
									<p className='text-sm text-white/50'>
										Mở khóa lúc:{' '}
										{unlockTime.toLocaleString('vi-VN', {
											hour: '2-digit',
											minute: '2-digit',
											day: '2-digit',
											month: '2-digit',
										})}
									</p>
								</div>
							) : !showContent ? (
								<div className='text-center py-8'>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={handleUnlock}
										className='glass-button-primary px-8 py-4 text-lg font-medium'
									>
										<span className='flex items-center gap-2'>
											<Heart className='w-5 h-5' />
											Mở thư của anh
										</span>
									</motion.button>
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='prose prose-invert prose-sm max-w-none'
								>
									<div
										className='prose prose-invert prose-sm max-w-none text-white/90 leading-relaxed font-light
											[&>p]:mb-4 [&>p:last-child]:mb-0
											[&>strong]:text-pink-300 [&>em]:text-pink-200
											[&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5
											[&>blockquote]:border-l-2 [&>blockquote]:border-pink-400 [&>blockquote]:pl-4 [&>blockquote]:italic'
										dangerouslySetInnerHTML={{ __html: renderedContent }}
									/>

									<div className='mt-6 pt-4 border-t border-white/10 text-right'>
										<p className='text-pink-400 font-display italic'>
											{letter.signature}
										</p>
									</div>
								</motion.div>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// Letter Card for listing
interface LetterCardProps {
	letterIndex: number;
	onClick: () => void;
}

export function LetterCard({ letterIndex, onClick }: LetterCardProps) {
	const letter = loveLetters[letterIndex];
	const { isLetterUnlocked, canUnlockLetter } = useSurprise();

	const isUnlocked = isLetterUnlocked(letterIndex);
	const canUnlock = canUnlockLetter(letterIndex);

	if (!letter) return null;

	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={cn(
				"w-full p-4 rounded-2xl text-left transition-all duration-300",
				isUnlocked
					? 'glass-card border-pink-500/30'
					: canUnlock
					? 'glass-card border-amber-500/30 timeline-upcoming'
					: 'glass opacity-60'
			)}
		>
			<div className='flex items-center gap-3'>
				<div
					className={cn(
						"p-2 rounded-full",
						isUnlocked ? 'bg-pink-500/20' : 'bg-white/10'
					)}
				>
					{isUnlocked ? (
						<Heart className='w-5 h-5 text-pink-400 fill-pink-400' />
					) : canUnlock ? (
						<span className='text-xl'>💌</span>
					) : (
						<span className='text-xl'>🔒</span>
					)}
				</div>

				<div className='flex-1'>
					<p className='text-sm text-white/60'>Ngày {letter.day}</p>
					<p className='font-medium text-white'>
						{isUnlocked ? letter.title : 'Thư bí mật'}
					</p>
				</div>

				{!isUnlocked && canUnlock && (
					<span className='badge-upcoming text-xs'>Sẵn sàng mở!</span>
				)}
				{isUnlocked && <span className='text-pink-400 text-sm'>Đã đọc ✓</span>}
			</div>
		</motion.button>
	);
}
