// Game Data Exports
export * from './mistWhispers';
export * from './highlandDice';
export {
	type HeatLevel,
	type SwipeCard,
	allSwipeCards,
	getCardsByHeatLevel,
	getBalancedDeck,
	getProgressiveDeck,
	getQuickDeck,
	getDeckByHeatLevel,
	getTourDeck,
	heatLevelColors,
	heatLevelLabels,
	// Rename shuffleCards to avoid conflict with mistWhispers
	shuffleCards as shuffleSwipeCards,
} from './loveSwipe';

// Game metadata
export interface GameInfo {
	id: string;
	name: string;
	description: string;
	icon: string;
	scenario: string;
	color: string;
}

export const games: GameInfo[] = [
	{
		id: 'mist-whispers',
		name: 'Lời Thì Thầm Sương Mù',
		description: 'Thẻ bài hội thoại cho quán bar & cafe',
		icon: '💭',
		scenario: 'Ngoài trời / Quán bar',
		color: 'from-cyan-500 to-blue-600',
	},
	{
		id: 'highland-dice',
		name: 'Xúc Xắc Cao Nguyên',
		description: 'Gieo xúc xắc thử thách thân mật',
		icon: '🎲',
		scenario: 'Phòng riêng',
		color: 'from-purple-500 to-pink-600',
	},
	{
		id: 'love-swipe',
		name: 'Cú Quẹt Tình Yêu',
		description: 'Quẹt đồng thuận kiểu Tinder',
		icon: '💕',
		scenario: 'Dạo đầu',
		color: 'from-rose-500 to-red-600',
	},
];
