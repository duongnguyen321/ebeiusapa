import { useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import {
	MistWhispersGame,
	HighlandDiceGame,
	LoveSwipeGame,
} from '@/components/games';

export default function GamePlayPage() {
	const { gameId } = useParams();
	const navigate = useNavigate();

	const handleClose = () => {
		navigate('/timeline', { state: { showGames: true } });
	};

	let GameComponent;
	switch (gameId) {
		case 'mist-whispers':
			GameComponent = MistWhispersGame;
			break;
		case 'highland-dice':
			GameComponent = HighlandDiceGame;
			break;
		case 'love-swipe':
			GameComponent = LoveSwipeGame;
			break;
		default:
			navigate('/timeline', { replace: true });
			return null;
	}

	return (
		<PageTransition variant='slideUp'>
			<GameComponent onClose={handleClose} />
		</PageTransition>
	);
}
