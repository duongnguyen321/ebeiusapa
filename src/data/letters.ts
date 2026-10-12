export interface LoveLetter {
  id: number;
  day: number;
  title: string;
  content: string;
  signature: string;
  unlockDate: string;
}

export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    day: 1,
    title: "Ngày 1 - Chuyến Xe Tình Yêu & Phố Núi Sapa",
    content: `Bé yêu của anh,

Chào mừng em đến với hành trình 6 ngày 5 đêm của đôi mình!

Từ chuyến xe cabin đôi lăn bánh lúc sáng sớm, anh đã biết chuyến đi này sẽ tràn ngập những kỷ niệm khó quên. Sapa đón chúng mình bằng tiết trời se lạnh đặc trưng, nồi lẩu Thắng cố nóng hổi và ánh đèn lung linh quanh Nhà thờ đá.

Tối nay hãy ngủ một giấc thật ngon và ấm áp trong vòng tay anh nhé. Ngày mai chúng mình sẽ cùng nhau chạm tới nóc nhà Đông Dương!`,
    signature: "Cái lò sưởi 37 độ của em",
    unlockDate: "2026-12-28",
  },
  {
    id: 2,
    day: 2,
    title: "Ngày 2 - Chạm Đỉnh Fansipan & Bên Em Giữa Biển Mây",
    content: `Công chúa của anh,

Đứng giữa biển mây bồng bềnh trên đỉnh Fansipan 3.143m, nhìn nụ cười của em rạng rỡ giữa gió lạnh, anh thấy mọi mệt mỏi đều tan biến hết. Được nắm tay em vượt qua từng bậc đá, ngắm nhìn thung lũng Mường Hoa qua ô cửa tàu hỏa, rồi cùng em vui đùa với các bé cún Mật Pet và lượn quanh đường ray trượt núi... đó là những khoảnh khắc quý giá nhất trong đời anh.

Cảm ơn em vì đã luôn đồng hành và mang đến nụ cười rạng rỡ cho anh mỗi ngày.`,
    signature: "Hiệp sĩ luôn che chở cho em",
    unlockDate: "2026-12-29",
  },
  {
    id: 3,
    day: 3,
    title: "Ngày 3 - Bản Cát Cát & Đón Giao Thừa Ấm Áp",
    content: `Nàng thơ của anh,

Hôm nay em mặc bộ váy dân tộc ở bản Cát Cát xinh đẹp đến nao lòng. Nhìn em bước đi bên bờ suối Tiên Sa, anh chỉ muốn thời gian ngừng trôi lại để ngắm em mãi thôi.

Chiều về được cùng em ngâm mình trong bồn lá thuốc Dao Đỏ ấm nóng, tối thưởng thức nồi lẩu cá tầm thơm lừng, và đặc biệt nhất là khoảnh khắc hai đứa mình cùng châm que pháo hoa đón giao thừa. Từng tia sáng lung linh như minh chứng cho tình yêu đôi mình, chúc cho hai đứa mãi luôn bền chặt và yêu nhau nhiều hơn nữa.`,
    signature: "Chàng trai yêu em nhất trên đời",
    unlockDate: "2026-12-30",
  },
  {
    id: 4,
    day: 4,
    title: "Ngày 4 - Săn Mây, Cầu Kính & Những Góc Phố Sapa",
    content: `Cục cưng ơi,

Hôm nay là một ngày thật ngoạn mục! Từ ly cafe ngắm biển mây cuộn trào, qua dòng thác hùng vĩ, đến bước chân dũng cảm của em trên sàn Cầu kính Rồng Mây và những bậc thang đá Núi Hàm Rồng. Em vừa dịu dàng lại vừa can đảm, luôn khiến anh bất ngờ và say đắm.

Bữa tiệc đồ nướng than hồng tối nay thật ngon, và khoảnh khắc trở về phòng cùng nhau chăm sóc, kỳ lưng thư giãn cho nhau sau ngày dài chính là sự bình yên giản dị mà anh luôn trân quý.`,
    signature: "Người bạn đồng hành của em",
    unlockDate: "2026-12-31",
  },
  {
    id: 5,
    day: 5,
    title: "Ngày 5 - Hành Trình Vượt Biên Sang Hà Khẩu",
    content: `Em bé dũng cảm của anh,

Chào mừng ngày đầu tiên của năm mới trên mảnh đất mới!

Hành trình từ Sapa xuống Lào Cai rồi bước chân qua cửa khẩu quốc tế sang Hà Khẩu mang lại cho hai đứa bao nhiêu trải nghiệm mới lạ. Được dắt tay em hòa vào Chợ Tết rực rỡ đèn hoa, cùng em thử món lẩu Trung Hoa cay nồng ấm bụng, anh thấy thế giới ngoài kia rộng lớn bao nhiêu thì tình yêu anh dành cho em lại càng sâu đậm bấy nhiêu.

Đêm nay tại căn hộ Hà Khẩu, chỉ cần có em bên cạnh thì nơi đâu cũng là tổ ấm.`,
    signature: "Người dẫn đường của em",
    unlockDate: "2027-01-01",
  },
  {
    id: 6,
    day: 6,
    title: "Ngày 6 - Tạm Biệt & Hẹn Chuyến Đi Tiếp Theo",
    content: `Em iu của anh,

Vậy là chuyến hành trình 6 ngày 5 đêm Sapa - Lào Cai - Hà Khẩu đã khép lại trọn vẹn. Vali hai đứa đã đầy ắp quà bánh, đồ ăn vặt và quan trọng nhất là trái tim cả hai đều đong đầy những kỷ niệm ngọt ngào.

Cảm ơn em đã cùng anh đi qua từng chặng đường, cùng cười, cùng ăn và cùng ôm nhau ngủ say giữa tiết trời mùa đông. Chuyến đi này kết thúc, nhưng hành trình chung đôi cả cuộc đời này của chúng mình chỉ mới bắt đầu thôi.

Hẹn em ở những vùng đất tươi đẹp tiếp theo nhé!`,
    signature: "Của riêng em mãi mãi",
    unlockDate: "2027-01-02",
  },
];
