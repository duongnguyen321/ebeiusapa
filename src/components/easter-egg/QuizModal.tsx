import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
	X,
	Gift,
	Check,
	XCircle,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import type { QuizData } from '@/data/easterEggs';
import { createVoucherReward } from '@/data/vouchers';
import type { GlobalRole } from '@/types/quest';
import { useGlobalRole } from '@/contexts/GlobalRoleContext';

interface QuizModalProps {
	quiz: QuizData;
	onClose: () => void;
	onAnswer: (quizId: string, isCorrect: boolean) => void;
}

export function EasterEggQuizModal({
	quiz,
	onClose,
	onAnswer,
}: QuizModalProps) {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Get role from Context
	const { role } = useGlobalRole();
	const currentRole = role || 'em';
	
	const rewardId = currentRole === 'anh' ? quiz.rewardAnh : quiz.rewardEm;
	const reward = createVoucherReward(rewardId, currentRole);

	const paginate = (newDirection: number) => {
		if (!quiz.images) return;
		let newIndex = currentImageIndex + newDirection;
		if (newIndex < 0) newIndex = quiz.images.length - 1;
		if (newIndex >= quiz.images.length) newIndex = 0;
		setCurrentImageIndex(newIndex);
	};

	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity;
	};

	const handleSelectOption = (optionId: string) => {
		if (showResult) return;
		setSelectedOption(optionId);
	};

	const handleSubmit = () => {
		if (!selectedOption) return;

		const option = quiz.options.find((o) => o.id === selectedOption);
		const isCorrect = option?.isCorrect ?? false;

		setShowResult(true);

		// Call onAnswer immediately to update state, but modal will stay open
		// until user clicks Close (because we removed auto-close from context)
		onAnswer(quiz.id, isCorrect);
	};

	const selectedOptionData = quiz.options.find((o) => o.id === selectedOption);
	const isCorrect = selectedOptionData?.isCorrect ?? false;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, y: 50 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.8, y: 50 }}
				className='bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/10'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center gap-2'>
						<span className='text-2xl'>🎯</span>
						<h3 className='text-lg font-bold text-white'>Quiz Time!</h3>
					</div>
					<button
						onClick={onClose}
						className='p-1 rounded-full hover:bg-white/10 transition-colors'
					>
						<X className='w-5 h-5 text-white/60' />
					</button>
				</div>

				{/* Image Gallery */}
				{quiz.images && quiz.images.length > 0 && (
					<div className='mb-4 relative rounded-xl overflow-hidden h-48 group'>
						<AnimatePresence mode='wait' initial={false}>
							<motion.img
								key={currentImageIndex}
								src={quiz.images[currentImageIndex]}
								alt={`Quiz image ${currentImageIndex + 1}`}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.3 }}
								className='w-full h-full object-cover'
								drag='x'
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={1}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = swipePower(offset.x, velocity.x);
									if (swipe < -swipeConfidenceThreshold) {
										paginate(1);
									} else if (swipe > swipeConfidenceThreshold) {
										paginate(-1);
									}
								}}
							/>
						</AnimatePresence>

						{/* Navigation Arrows (Desktop) */}
						{quiz.images.length > 1 && (
							<>
								<button
									className='absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0'
									onClick={() => paginate(-1)}
								>
									<ChevronLeft className='w-5 h-5' />
								</button>
								<button
									className='absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0'
									onClick={() => paginate(1)}
								>
									<ChevronRight className='w-5 h-5' />
								</button>

								{/* Dots Indicator */}
								<div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
									{quiz.images.map((_, idx) => (
										<div
											key={idx}
											className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${
												idx === currentImageIndex
													? 'bg-white w-3'
													: 'bg-white/50'
											}`}
										/>
									))}
								</div>
							</>
						)}

						{/* Badge */}
						<div className='absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-medium text-white/90 border border-white/10'>
							{currentImageIndex + 1}/{quiz.images.length}
						</div>
					</div>
				)}

				{/* Question */}
				<p className='text-white text-center font-medium mb-6'>
					{quiz.question}
				</p>

				{/* Options */}
				<div className='space-y-3 mb-6'>
					{quiz.options.map((option) => {
						const isSelected = selectedOption === option.id;
						const showCorrect = showResult && option.isCorrect;
						const showWrong = showResult && isSelected && !option.isCorrect;

						return (
							<motion.button
								key={option.id}
								whileHover={{ scale: showResult ? 1 : 1.02 }}
								whileTap={{ scale: showResult ? 1 : 0.98 }}
								onClick={() => handleSelectOption(option.id)}
								disabled={showResult}
								className={cn(
									"w-full p-3 rounded-xl text-left transition-all border-2",
									showCorrect
										? 'bg-green-500/30 border-green-500 text-green-300'
										: showWrong
										? 'bg-red-500/30 border-red-500 text-red-300'
										: isSelected
										? 'bg-amber-500/20 border-amber-500 text-amber-300'
										: 'bg-white/5 border-transparent text-white/80 hover:bg-white/10'
								)}
							>
								<div className='flex items-center gap-3'>
									<span
										className={cn(
										"w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
										showCorrect
											? 'bg-green-500 text-white'
											: showWrong
											? 'bg-red-500 text-white'
											: isSelected
											? 'bg-amber-500 text-white'
											: 'bg-white/20 text-white'
									)}
									>
										{showCorrect ? (
											<Check className='w-4 h-4' />
										) : showWrong ? (
											<XCircle className='w-4 h-4' />
										) : (
											option.id.toUpperCase()
										)}
									</span>
									<span>{option.label}</span>
								</div>
							</motion.button>
						);
					})}
				</div>

				{/* Result or Submit */}
				{showResult ? (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className={cn(
							"p-4 rounded-xl text-center",
							isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
						)}
					>
						{isCorrect && reward ? (
							<div className='space-y-2'>
								<div className='flex items-center justify-center gap-2'>
									<Gift className='w-6 h-6 text-amber-400' />
									<span className='text-amber-300 font-bold'>
										Chúc mừng! Bạn nhận được:
									</span>
								</div>
								<div className='bg-white/10 rounded-lg p-2 flex items-center gap-3 justify-center'>
									<span className='text-2xl'>{reward.icon}</span>
									<span className='text-white font-semibold'>{reward.title}</span>
								</div>
								{selectedOptionData?.responseMessage && (
									<p className='text-white/70 text-sm'>
										{selectedOptionData.responseMessage}
									</p>
								)}
							</div>
						) : (
							<div className='space-y-2'>
								<span className='text-red-300 font-bold'>Sai rồi!</span>
								{selectedOptionData?.responseMessage && (
									<p className='text-white/70 text-sm'>
										{selectedOptionData.responseMessage}
									</p>
								)}
								<p className='text-white/50 text-xs'>Thử lại sau 1 giờ nhé!</p>
							</div>
						)}
						<button
							onClick={onClose}
							className='mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-white transition-colors'
						>
							Đóng
						</button>
					</motion.div>
				) : (
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleSubmit}
						disabled={!selectedOption}
						className={cn(
							"w-full py-3 rounded-xl font-bold transition-all",
							selectedOption
								? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
								: 'bg-white/10 text-white/40 cursor-not-allowed'
						)}
					>
						Xác nhận
					</motion.button>
				)}
			</motion.div>
		</motion.div>
	);
}
