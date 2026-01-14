import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import { EasterEggQuizModal } from './easter-egg/QuizModal';
import { EasterEggFunnyModal } from './easter-egg/FunnyModal';
import { EasterEggMemoryModal } from './easter-egg/MemoryModal';
import { VoucherRedeemModal } from './VoucherRedeemModal';
import { LiquidLuckModal } from './LiquidLuckModal';
import { handleRestrictedAction } from '@/lib/restriction';

import { useLocation } from 'react-router-dom';

const EGG_ICONS = ['🥚', '🎁', '💝'];

export default function EasterEggLayer() {
	const location = useLocation();
	const isIntro = location.pathname === '/intro' || location.pathname === '/';

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

	const [showLiquidLuck, setShowLiquidLuck] = useState(false);

	const randomIcon = EGG_ICONS[Math.floor(Math.random() * EGG_ICONS.length)];

	const handleOpenLiquidLuck = () => {
		if (handleRestrictedAction('Liquid Luck')) return;
		setShowLiquidLuck(true);
	};

	return (
		<>
			{/* Hide everything on intro screen */}
			{!isIntro && (
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
						drag
						dragMomentum={false}
						dragElastic={0.1}
						whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
						onClick={clickEgg}
						className={cn('fixed z-50 cursor-grab active:cursor-grabbing')}
						style={{
							top: `${eggPosition.top}%`,
							left: `${eggPosition.left}%`,
							transform: 'translate(-50%, -50%)',
							touchAction: 'none', // Prevent scrolling while dragging on touch devices
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

			{/* Floating Liquid Luck Bubble Button */}
			<motion.button
				initial={{ scale: 0, opacity: 0 }}
				animate={{
					scale: 1,
					opacity: 1,
					y: [0, -6, 0],
				}}
				transition={{
					scale: { type: 'spring', stiffness: 400, damping: 20, delay: 0.5 },
					y: {
						repeat: Infinity,
						duration: 2.5,
						ease: 'easeInOut',
					},
				}}
				drag
				dragMomentum={false}
				dragElastic={0.1}
				whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
				onClick={handleOpenLiquidLuck}
				className={cn(
					'fixed z-50 cursor-grab active:cursor-grabbing',
					'bottom-24 right-4'
				)}
				style={{
					touchAction: 'none',
				}}
				whileHover={{ scale: 1.15 }}
				whileTap={{ scale: 0.9 }}
			>
				<div className='relative'>
					{/* Glow effect */}
					<div className='absolute inset-0 bg-purple-400/30 rounded-full blur-xl animate-pulse' />
					{/* Potion icon */}
					<div className='relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-white/20 backdrop-blur-sm'>
						<span className='text-2xl'>🧪</span>
					</div>
					{/* Bubble particles */}
					<motion.div
						className='absolute -top-1 -left-1 text-xs'
						animate={{ y: [-2, -8, -2], opacity: [0.5, 1, 0.5] }}
						transition={{ repeat: Infinity, duration: 1.5 }}
					>
						🫧
					</motion.div>
				</div>
			</motion.button>

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

						{/* Liquid Luck Modal */}
			<LiquidLuckModal
				isOpen={showLiquidLuck || (showContentModal && currentContent?.type === 'liquid_luck')}
				onClose={() => {
					setShowLiquidLuck(false);
					if (currentContent?.type === 'liquid_luck') {
						closeContentModal();
					}
				}}
			/>
				</>
			)}
		</>
	);
}