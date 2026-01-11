import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import { EasterEggQuizModal } from './easter-egg/QuizModal';
import { EasterEggFunnyModal } from './easter-egg/FunnyModal';
import { EasterEggMemoryModal } from './easter-egg/MemoryModal';
import { VoucherRedeemModal } from './VoucherRedeemModal';

const EGG_ICONS = ['🥚', '🎁', '💝'];

export default function EasterEggLayer() {
	const {
		isEggVisible,
		eggPosition,
		clickEgg,
		currentContent,
		showContentModal,
		closeContentModal,
		answerQuiz,
		redeemVoucherState,
		closeRedeemModal,
		redeemVoucher,
	} = useEasterEgg();

	const randomIcon = EGG_ICONS[Math.floor(Math.random() * EGG_ICONS.length)];

	return (
		<>
			{/* Floating Egg Button */}
			<AnimatePresence>
				{isEggVisible && (
					<motion.button
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							scale: 1,
							opacity: 1,
							y: [0, -8, 0],
						}}
						exit={{ scale: 0, opacity: 0 }}
						transition={{
							scale: { type: 'spring', stiffness: 500, damping: 25 },
							y: {
								repeat: Infinity,
								duration: 2,
								ease: 'easeInOut',
							},
						}}
						onClick={clickEgg}
						className='fixed z-50 cursor-pointer'
						style={{
							top: `${eggPosition.top}%`,
							left: `${eggPosition.left}%`,
							transform: 'translate(-50%, -50%)',
						}}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						<div className='relative'>
							{/* Glow effect */}
							<div className='absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse' />
							{/* Egg icon */}
							<span className='relative text-5xl drop-shadow-lg filter'>
								{randomIcon}
							</span>
							{/* Sparkle particles */}
							<motion.div
								className='absolute -top-2 -right-2 text-xl'
								animate={{ rotate: 360, scale: [1, 1.2, 1] }}
								transition={{ repeat: Infinity, duration: 2 }}
							>
								✨
							</motion.div>
						</div>
					</motion.button>
				)}
			</AnimatePresence>

			{/* Content Modals */}
			<AnimatePresence>
				{showContentModal && currentContent && (
					<>
						{currentContent.type === 'quiz' && currentContent.quiz && (
							<EasterEggQuizModal
								quiz={currentContent.quiz}
								onClose={closeContentModal}
								onAnswer={answerQuiz}
							/>
						)}
						{currentContent.type === 'funny' && currentContent.funny && (
							<EasterEggFunnyModal
								funny={currentContent.funny}
								onClose={closeContentModal}
							/>
						)}
						{currentContent.type === 'memory' && currentContent.memory && (
							<EasterEggMemoryModal
								memory={currentContent.memory}
								onClose={closeContentModal}
							/>
						)}
					</>
				)}
			</AnimatePresence>

			{/* Voucher Redeem Modal (Global) */}
			<AnimatePresence>
				{redeemVoucherState && (
					<VoucherRedeemModal
						voucher={redeemVoucherState}
						onClose={closeRedeemModal}
						onRedeem={(password) =>
							redeemVoucher(redeemVoucherState.id, password)
						}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
