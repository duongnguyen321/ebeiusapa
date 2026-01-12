import { cn } from '@/lib/utils';
import { Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { games, type GameInfo } from '@/data/games';
import BottomSheet from './BottomSheet';


interface GamesModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectGame: (gameId: string) => void;
}

export function GamesModal({ isOpen, onClose, onSelectGame }: GamesModalProps) {
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			title='Minigames Uống Rượu'
			icon={<Gamepad2 className='w-5 h-5 text-purple-400' />}
		>
			<div className='space-y-3'>
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
		</BottomSheet>
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
				className={cn(
					"relative overflow-hidden rounded-2xl p-4",
					`bg-gradient-to-br ${game.color}`
				)}
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
						<div className='mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs shadow-sm'>
							📍 {game.scenario}
						</div>
					</div>
				</div>
			</div>
		</motion.button>
	);
}

export default GamesModal;
