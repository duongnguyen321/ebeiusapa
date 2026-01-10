import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2 } from 'lucide-react';
import { games, type GameInfo } from '@/data/games';

interface GamesModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectGame: (gameId: string) => void;
}

export function GamesModal({ isOpen, onClose, onSelectGame }: GamesModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm'
					onClick={onClose}
				>
					<motion.div
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: '100%', opacity: 0 }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className='w-full md:max-w-md md:mx-4'
					>
						<div className='glass-card rounded-t-3xl md:rounded-2xl overflow-hidden'>
							{/* Handle bar for mobile */}
							<div className='flex justify-center pt-3 pb-1 md:hidden'>
								<div className='w-10 h-1 bg-white/30 rounded-full' />
							</div>

							{/* Header */}
							<div className='p-4 pb-2 flex items-center justify-between border-b border-white/10'>
								<h3 className='text-lg font-display text-white flex items-center gap-2'>
									<Gamepad2 className='w-5 h-5 text-purple-400' />
									Minigames Uống Rượu
								</h3>
								<button
									onClick={onClose}
									className='p-2 rounded-full glass-button text-white/60 hover:text-white'
									aria-label='Đóng'
								>
									<X className='w-5 h-5' />
								</button>
							</div>

							{/* Game list */}
							<div className='p-4 space-y-3 max-h-[60vh] overflow-y-auto'>
								{games.map((game, index) => (
									<GameCard
										key={game.id}
										game={game}
										index={index}
										onSelect={() => {
											onSelectGame(game.id);
											onClose();
										}}
									/>
								))}
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

interface GameCardProps {
	game: GameInfo;
	index: number;
	onSelect: () => void;
}

function GameCard({ game, index, onSelect }: GameCardProps) {
	return (
		<motion.button
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={onSelect}
			className='w-full text-left'
		>
			<div
				className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} p-4`}
			>
				{/* Glow effect */}
				<div className='absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity' />

				<div className='flex items-start gap-4'>
					<span className='text-4xl'>{game.icon}</span>
					<div className='flex-1 min-w-0'>
						<h4 className='font-display text-white font-medium truncate'>
							{game.name}
						</h4>
						<p className='text-white/80 text-sm mt-1'>{game.description}</p>
						<div className='mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/20 text-white/70 text-xs'>
							📍 {game.scenario}
						</div>
					</div>
				</div>
			</div>
		</motion.button>
	);
}

export default GamesModal;
