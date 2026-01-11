import { motion } from 'framer-motion';
import { X, Gift, Check, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { QuizData } from '@/data/easterEggs';

interface QuizModalProps {
	quiz: QuizData;
	onClose: () => void;
	onAnswer: (quizId: string, isCorrect: boolean) => void;
}

export function EasterEggQuizModal({ quiz, onClose, onAnswer }: QuizModalProps) {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);

	const handleSelectOption = (optionId: string) => {
		if (showResult) return;
		setSelectedOption(optionId);
	};

	const handleSubmit = () => {
		if (!selectedOption) return;

		const option = quiz.options.find((o) => o.id === selectedOption);
		const isCorrect = option?.isCorrect ?? false;

		setShowResult(true);

		// Delay to show result before closing
		setTimeout(() => {
			onAnswer(quiz.id, isCorrect);
		}, 2000);
	};

	const selectedOptionData = quiz.options.find((o) => o.id === selectedOption);
	const isCorrect = selectedOptionData?.isCorrect ?? false;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, y: 50 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.8, y: 50 }}
				className='bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/10'
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

				{/* Image */}
				{quiz.image && (
					<div className='mb-4 rounded-xl overflow-hidden'>
						<img
							src={quiz.image}
							alt='Quiz'
							className='w-full h-40 object-cover'
						/>
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
								className={`w-full p-3 rounded-xl text-left transition-all border-2 ${
									showCorrect
										? 'bg-green-500/30 border-green-500 text-green-300'
										: showWrong
										? 'bg-red-500/30 border-red-500 text-red-300'
										: isSelected
										? 'bg-amber-500/20 border-amber-500 text-amber-300'
										: 'bg-white/5 border-transparent text-white/80 hover:bg-white/10'
								}`}
							>
								<div className='flex items-center gap-3'>
									<span
										className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
											showCorrect
												? 'bg-green-500 text-white'
												: showWrong
												? 'bg-red-500 text-white'
												: isSelected
												? 'bg-amber-500 text-white'
												: 'bg-white/20 text-white'
										}`}
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
						className={`p-4 rounded-xl text-center ${
							isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
						}`}
					>
						{isCorrect ? (
							<div className='space-y-2'>
								<div className='flex items-center justify-center gap-2'>
									<Gift className='w-6 h-6 text-amber-400' />
									<span className='text-amber-300 font-bold'>
										Chúc mừng! Bạn nhận được:
									</span>
								</div>
								<p className='text-white font-semibold'>
									{quiz.reward.icon} {quiz.reward.title}
								</p>
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
								<p className='text-white/50 text-xs'>
									Thử lại sau 1 giờ nhé!
								</p>
							</div>
						)}
					</motion.div>
				) : (
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleSubmit}
						disabled={!selectedOption}
						className={`w-full py-3 rounded-xl font-bold transition-all ${
							selectedOption
								? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
								: 'bg-white/10 text-white/40 cursor-not-allowed'
						}`}
					>
						Xác nhận
					</motion.button>
				)}
			</motion.div>
		</motion.div>
	);
}
