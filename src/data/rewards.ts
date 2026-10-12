export interface DailyReward {
	date: string;
	message: string;
	icon: string;
	id: string; // Unique ID for each reward
}

// Scratch card rewards mapped across the 6-day journey
export const dailyRewards: DailyReward[] = [
	{
		id: 'day1-welcome',
		date: '2026-12-28',
		message:
			'Chào mừng Sapa ngày đầu tiên!\n\nPhần thưởng bốc được: BÓ HOA TÌNH YÊU PHỐ NÚI!\n\nEm là cô gái xinh đẹp nhất của anh. Chuyến xe đưa hai đứa đến Sapa mờ sương chính là khởi đầu cho những ngày ấm áp nhất!',
		icon: 'bouquet',
	},
	{
		id: 'day2-summit',
		date: '2026-12-29',
		message:
			'Chinh phục nóc nhà Đông Dương!\n\nPhần thưởng lớn: HUY HIỆU ĐỈNH FANSIPAN!\n\nCùng nhau vượt qua 3.143m giữa biển mây bồng bềnh. Chúc cho tình yêu của đôi mình luôn cao vút và kiên định như đỉnh núi này!',
		icon: 'award',
	},
	{
		id: 'day3-fireworks',
		date: '2026-12-30',
		message:
			'Khoảnh khắc giao thừa ấm áp!\n\nPhần thưởng đặc biệt: HỘP PHÁO HOA ƯỚC NGUYỆN!\n\nBên cạnh nồi lẩu cá tầm và bồn lá thuốc Dao Đỏ, que pháo hoa đêm nay sẽ thắp sáng mọi ước nguyện ngọt ngào nhất của hai đứa!',
		icon: 'sparkles',
	},
	{
		id: 'day3-special',
		date: '2026-12-30',
		message:
			'Món quà vô giá!\n\nGIẢI ĐẶC BIỆT: "ANH" - PHIÊN BẢN DUY NHẤT!\n\nTrọn vẹn tấm thân và trái tim này thuộc về em. Bảo hành trọn đời, phục vụ 24/7 mọi mong muốn của nàng thơ!',
		icon: 'gift',
	},
	{
		id: 'day4-pamper',
		date: '2026-12-31',
		message:
			'Hương vị than hồng & Thư giãn!\n\nPhần thưởng: BUỔI KỲ LƯNG & MASSAGE TẠI GIA!\n\nSau ngày dài vượt Cầu kính và leo Núi Hàm Rồng, hãy thả lỏng cơ thể để anh chăm sóc em từ đầu đến chân nhé!',
		icon: 'heart',
	},
	{
		id: 'day5-border',
		date: '2027-01-01',
		message:
			'Chào năm mới tại vùng đất mới!\n\nPhần thưởng: HỘ CHIẾU DU NGOẠN HÀ KHẨU!\n\nCùng nhau bước qua cửa khẩu quốc tế, thưởng thức lẩu đêm và dạo Chợ Tết nước bạn. Nơi đâu có em, nơi đó là niềm vui!',
		icon: 'compass',
	},
	{
		id: 'day6-eternity',
		date: '2027-01-02',
		message:
			'Trở về tổ ấm đong đầy yêu thương!\n\nPhần thưởng trọn đời: VÉ THÔNG HÀNH CHUYẾN ĐI KẾ TIẾP!\n\nHành trình 6 ngày 5 đêm khép lại, nhưng hành trình tình yêu của chúng mình sẽ kéo dài mãi mãi!',
		icon: 'plane',
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
