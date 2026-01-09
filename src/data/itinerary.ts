export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  address?: string;
  hotline?: string;
  note?: string;
  isHighlight?: boolean;
}

export interface DaySchedule {
  id: number;
  date: string;
  dateLabel: string;
  title: string;
  weather: {
    icon: string;
    description: string;
    temp: string;
  };
  outfit: string;
  timeline: TimelineItem[];
  isBirthday?: boolean;
}

export const itinerary: DaySchedule[] = [
  {
    id: 1,
    date: "2026-01-15",
    dateLabel: "15/01",
    title: "NHẬP CUỘC MỜ SƯƠNG",
    weather: {
      icon: "🌧️",
      description: "Mưa phùn, Sương mù",
      temp: "11-15°C",
    },
    outfit: "Áo khoác gió (Trench coat), Ô trong suốt, Boot",
    timeline: [
      {
        time: "10:00",
        title: "Khởi hành",
        description: "Xe Cabin đôi",
        note: "Bắt đầu hành trình lãng mạn",
      },
      {
        time: "11:30",
        title: "Brunch: Cốn Sủi Ông Há",
        description: "Đặc sản nóng hổi cho ngày mưa",
        address: "436 Điện Biên Phủ, TT. Sapa",
        hotline: "0856 332 323",
        isHighlight: true,
      },
      {
        time: "12:30",
        title: "Siêu thị Xuân Trường",
        description: "Mua đồ tiệc",
        address: "46 Ngũ Chỉ Sơn",
        hotline: "0984 353 577",
      },
      {
        time: "15:00",
        title: "Check-in Nhà thờ Đá & Sun Plaza",
        description: "Kiến trúc Pháp cổ điển giữa sương mù",
        isHighlight: true,
      },
      {
        time: "19:00",
        title: "Tối: Nhà hàng Hải Lâm",
        description: "Gà nướng tiêu xanh",
        address: "69 Xuân Viên",
        hotline: "0934 246 696",
        isHighlight: true,
      },
    ],
  },
  {
    id: 2,
    date: "2026-01-16",
    dateLabel: "16/01",
    title: "SINH NHẬT NÀNG THƠ",
    weather: {
      icon: "⛅",
      description: "Sáng mưa nhỏ, Chiều hửng nắng",
      temp: "12-17°C",
    },
    outfit: "Váy len Vintage (Trắng/Be) + Áo dạ nâu",
    timeline: [
      {
        time: "10:30",
        title: "Brunch: Le Gecko Café",
        description: "Phong cách Pháp thanh lịch",
        address: "02 Ngũ Chỉ Sơn",
        hotline: "02143 871 224",
        isHighlight: true,
      },
      {
        time: "13:00",
        title: "Bản Cát Cát",
        description: "Đi bộ chiều xuống, Taxi chiều lên",
        note: "Taxi Xanh Sapa: 0214 363 63 63",
        isHighlight: true,
      },
      {
        time: "16:30",
        title: "Lấy bánh kem: Tiệm Chị Híp",
        description: "Bánh kem sinh nhật đặc biệt",
        address: "14 Thác Bạc",
        hotline: "0974 511 568",
      },
      {
        time: "20:00",
        title: "TIỆC SINH NHẬT TẠI PHÒNG",
        description: "Private Party",
        note: "Rượu vang, Bánh kem & Không gian riêng tư",
        isHighlight: true,
      },
    ],
    isBirthday: true,
  },
  {
    id: 3,
    date: "2026-01-17",
    dateLabel: "17/01",
    title: "SĂN MÂY PANORAMA",
    weather: {
      icon: "☀️",
      description: "Nắng đẹp",
      temp: "11-18°C",
    },
    outfit: "Đồ năng động, sáng màu",
    timeline: [
      {
        time: "10:00",
        title: "Cafe: Viettrekking",
        description: "View tàu hỏa tuyệt đẹp",
        address: "33 Hoàng Liên",
        isHighlight: true,
      },
      {
        time: "13:00",
        title: "Leo Núi Hàm Rồng",
        description: "Sân Mây - Điểm ngắm toàn cảnh",
        isHighlight: true,
      },
      {
        time: "15:30",
        title: "Thung lũng Tả Van",
        description: "Cầu Mây huyền thoại",
        note: "Taxi Mai Linh: 0214 376 76 76",
        isHighlight: true,
      },
      {
        time: "19:00",
        title: "Tối: Lẩu Cá Tầm (Hotpot Center)",
        description: "Ấm áp sau một ngày khám phá",
        address: "71 Xuân Viên",
        hotline: "0829 071 071",
        isHighlight: true,
      },
    ],
  },
  {
    id: 4,
    date: "2026-01-18",
    dateLabel: "18/01",
    title: "TẠM BIỆT",
    weather: {
      icon: "🌤️",
      description: "Trời quang",
      temp: "10-16°C",
    },
    outfit: "Thoải mái, ấm áp",
    timeline: [
      {
        time: "09:00",
        title: "Chợ Mới Sapa",
        description: "Mua hạt dẻ, quà lưu niệm",
        note: "Kỷ niệm cuối cùng của chuyến đi",
        isHighlight: true,
      },
      {
        time: "12:00",
        title: "Khởi hành về",
        description: "Mang theo kỷ niệm đẹp",
        note: "Hẹn gặp lại, Sapa yêu thương",
      },
    ],
  },
];

export const targetDate = new Date("2026-01-15T10:00:00");
