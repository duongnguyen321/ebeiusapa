export interface DailyReward {
	date: string;
	message: string;
	icon: string;
	id: string; // Unique ID for each reward
}

// Scratch card rewards - multiple rewards can exist for the same date
export const dailyRewards: DailyReward[] = [
	{
		id: 'day1-bouquet',
		date: '2026-01-15',
		message:
			'Chào Sapa ngày đầu tiên! 🌹\n\n🎁 Em bốc được: BÓ HOA CƯỚI!\n\nEm là cô dâu xinh đẹp nhất của anh. Bó hoa này là minh chứng cho tình yêu tụi mình, rực rỡ và ngọt ngào như nụ cười của em vậy! Cầm lấy đi nào! 💐',
		icon: '💐',
	},
	{
		id: 'day2-ring',
		date: '2026-01-16',
		message:
			'Happy Birthday Bà Xã! 🎂\n\n🎁 Giải thưởng lớn: HỘP NHẪN XINH ĐẸP!\n\nBên trong là lời hứa trọn đời và sự "ràng buộc" ngọt ngào. Anh muốn đánh dấu chủ quyền vĩnh viễn lên trái tim em! Đeo vào và "say yes" nhé! 💍',
		icon: '💍',
	},
	{
		id: 'day2-special',
		date: '2026-01-16',
		message:
			'Còn nữa nè! 🎉\n\n🎁 GIẢI ĐẶC BIỆT: "ANH" - PHIÊN BẢN GIỚI HẠN!\n\nTrọn vẹn tâm thân này thuộc về em. Bảo hành trọn đời, không đổi trả, phục vụ 24/7 mọi yêu cầu của "nữ hoàng". Em nhận không? ❤️',
		icon: '🎁',
	},
	{
		id: 'day3-nhu',
		date: '2026-01-17',
		message:
			'Ngày ngọt ngào lên ngôi! ✨\n\n🎁 Phần thưởng bí ẩn: 1 CHIẾC "NHỤ"!\n\nChỉ hai ta mới hiểu nó tuyệt vời thế nào... Một món quà ấm áp, mềm mại và khiến tim rung rinh. Chuẩn bị tinh thần đón nhận nhé! 💋',
		icon: '💋',
	},
];

// Get all rewards for a specific date
export function getRewardsForDate(date: string): DailyReward[] {
	return dailyRewards.filter((r) => r.date === date);
}

// Get the next unscratched reward for a date
export function getNextRewardForDate(
	date: string,
	scratchedIds: string[]
): DailyReward | null {
	const rewards = getRewardsForDate(date);
	return rewards.find((r) => !scratchedIds.includes(r.id)) || null;
}

// Get all today's rewards
export function getTodayRewards(): DailyReward[] {
	const today = new Date().toISOString().split('T')[0];
	return getRewardsForDate(today);
}

// Legacy function for backwards compatibility
export function getTodayReward(): DailyReward | null {
	const rewards = getTodayRewards();
	return rewards[0] || null;
}
