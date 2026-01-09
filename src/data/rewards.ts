export interface DailyReward {
	date: string;
	message: string;
	icon: string;
}

// Scratch card rewards for each day
export const dailyRewards: DailyReward[] = [
	{
		date: '2026-01-15',
		message:
			'Chào Sapa sương khói! 🌫️\n\n🎁 Em bốc được: VOUCHER "ÔM" ĐỘC QUYỀN!\n\nKèm dịch vụ sưởi ấm toàn thân 37 độ C. Hạn sử dụng: Cả đêm nay và mãi mãi! 😉',
		icon: '🎁',
	},
	{
		date: '2026-01-16',
		message:
			'Happy Birthday Bé Yêu! 🎂\n\n🎁 Quà của em là: QUYỀN NĂNG NỮ HOÀNG!\n\nHôm nay lời em nói là thánh chỉ. Anh nguyện làm "thần dân" ngoan ngoãn chiều chuộng em hết nấc! 💋',
		icon: '🎂',
	},
	{
		date: '2026-01-17',
		message:
			'Sapa lạnh nhưng tim ta nóng! 🔥\n\n🎁 Phần thưởng: SUẤT MASSAGE THƯ GIÃN!\n\nKỹ thuật viên "của nhà trồng được", phục vụ tận giường, cam kết làm em tan biến mọi mệt mỏi! 💆‍♀️',
		icon: '✨',
	},
	{
		date: '2026-01-18',
		message:
			'Tạm biệt phố núi! 💕\n\n🎁 Đặc biệt: VÉ "TÀU NHANH" TÌNH YÊU!\n\nChuyến tàu hạnh phúc không có điểm dừng, chỉ cần em gật đầu là mình cùng vi vu tới bến bờ yêu thương! 🚀',
		icon: '💝',
	},
];

export function getRewardForDate(date: string): DailyReward | null {
	return dailyRewards.find((r) => r.date === date) || null;
}

export function getTodayReward(): DailyReward | null {
	const today = new Date().toISOString().split('T')[0];
	return getRewardForDate(today);
}
