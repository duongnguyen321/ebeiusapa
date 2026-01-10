// Xúc Xắc Cao Nguyên - Highland Dice Game Data
// Designed for romantic private birthday dinner date in Sapa

// Dice 1: Romantic & playful actions
export const actions = [
	'Hôn ngọt ngào lên',
	'Nhẹ nhàng vuốt ve',
	'Thì thầm "anh yêu em" vào',
	'Đặt một nụ hôn lên',
	'Massage thư giãn cho',
	'Hít hà mùi hương của',
	'Cắn yêu nhẹ nhàng lên',
	'Áp má âu yếm vào',
	'Ôm chặt và hôn lên',
	'Nắm tay và hôn lên',
	'Nhìn sâu vào mắt rồi hôn',
	'Liếm nhẹ như mèo lên',
	'Rót rượu rồi toast và hôn lên',
	'Phà hơi ấm ấm lên',
	'Vuốt nhẹ từng ngón của',
];

// Dice 2: Romantic body parts/locations
export const locations = [
	'môi',
	'trán',
	'má',
	'cổ',
	'vai',
	'bàn tay',
	'ngón tay',
	'tai',
	'mũi',
	'cằm',
	'gáy',
	'cổ tay',
	'lưng',
	'mí mắt',
	'xương quai xanh',
];

// Dice 3: Fun birthday party modifiers
export const modifiers = [
	'trong 10 giây',
	'thật chậm và ngọt',
	'như lần đầu tiên yêu',
	'vừa nói "chúc mừng sinh nhật"',
	'với đèn nến lung linh',
	'sau khi uống một ngụm rượu',
	'với ánh mắt say đắm',
	'hai lần liên tiếp',
	'dưới chăn ấm cozy',
	'thật lâu không dừng',
	'như trong phim tình cảm',
	'khi đối phương nhắm mắt',
	'vừa phá lên cười',
	'một cách bất ngờ',
	'và thêm một cái ôm',
];

export interface DiceResult {
	action: string;
	location: string;
	modifier: string;
}

// Roll all three dice
export function rollDice(): DiceResult {
	return {
		action: actions[Math.floor(Math.random() * actions.length)],
		location: locations[Math.floor(Math.random() * locations.length)],
		modifier: modifiers[Math.floor(Math.random() * modifiers.length)],
	};
}

// Format the result as a readable sentence
export function formatDiceResult(result: DiceResult): string {
	return `${result.action} ${result.location} ${result.modifier}`;
}

// Roll single dice
export function rollAction(): string {
	return actions[Math.floor(Math.random() * actions.length)];
}

export function rollLocation(): string {
	return locations[Math.floor(Math.random() * locations.length)];
}

export function rollModifier(): string {
	return modifiers[Math.floor(Math.random() * modifiers.length)];
}

// Calculate total combinations
export const totalCombinations =
	actions.length * locations.length * modifiers.length;
// 15 * 15 * 15 = 3,375 combinations
