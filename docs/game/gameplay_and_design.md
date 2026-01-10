# **Game Design Document: Sapa Liquid Glass Collection**

## **1\. Hệ Thống Design System: "Liquid Glass" (Thủy Tinh Lỏng)**

Phong cách "Liquid Glass" là sự nâng cấp của Glassmorphism, tập trung vào độ dày của kính, sự khúc xạ ánh sáng (refraction) và cảm giác "ướt" hoặc "chảy" (fluidity), rất phù hợp với không khí sương mù và mưa của Sapa.

### **1.1. Bảng Màu & Ánh Sáng (Color & Lighting)**

* **Theme chủ đạo:** Dark Mode (để làm nổi bật hiệu ứng phát sáng).  
* **Background:** Không dùng màu đơn sắc. Sử dụng các "Orb" (khối cầu) màu Gradient di chuyển chậm (Floating Blobs) trên nền tối.  
  * *Màu nền:* \#0F172A (Slate 900\) hoặc \#1A1A2E.  
  * *Màu Blob 1 (Sương mù):* \#38BDF8 (Sky Blue) \- Opacity 40%.  
  * *Màu Blob 2 (Lửa ấm):* \#F472B6 (Pink) hoặc \#FB923C (Orange) \- Opacity 40%.  
* **Glass Material (Chất liệu kính):**  
  * Background: rgba(255, 255, 255, 0.05)  
  * Border: Gradient từ rgba(255, 255, 255, 0.4) (góc trên trái \- ánh sáng nguồn) đến rgba(255, 255, 255, 0.05) (góc dưới phải).  
  * Backdrop Filter: blur(16px) \+ saturate(180%).  
  * Shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37).

### **1.2. Hướng dẫn CSS Cơ bản cho Developer**

CSS

/\* Card Container Style \*/  
.liquid-card {  
  background: rgba(255, 255, 255, 0.05);  
  backdrop-filter: blur(16px) saturate(180%);  
  \-webkit-backdrop-filter: blur(16px) saturate(180%);  
  border-radius: 24px;  
  border: 1px solid rgba(255, 255, 255, 0.1);  
  box-shadow:   
    0 8px 32px 0 rgba(0, 0, 0, 0.37),  
    inset 0 0 0 1px rgba(255, 255, 255, 0.1); /\* Inner stroke \*/  
  position: relative;  
  overflow: hidden;  
}

/\* Hiệu ứng "Wet Highlight" ở cạnh trên \*/  
.liquid-card::before {  
  content: '';  
  position: absolute;  
  top: 0; left: 0; right: 0;  
  height: 1px;  
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);  
}

## ---

**2\. Game 1: Lời Thì Thầm Sương Mù (Mist Whispers)**

Concept: Trò chơi thẻ bài hội thoại (Conversation Cards).  
Bối cảnh: Quán bar/Cafe.  
Logic: Random thẻ từ kho dữ liệu.

### **2.1. Phân tích UI/UX**

* **Màn hình chính:** Một thẻ bài duy nhất nằm giữa màn hình.  
* **Hiệu ứng:**  
  * *Trạng thái chờ:* Thẻ bài có hiệu ứng "thở" (scale nhẹ) và mặt sau mờ đục như kính bị hấp hơi nước.  
  * *Tương tác:* Người dùng dùng ngón tay "lau" màn hình (swipe) hoặc chạm vào để lật thẻ. Khi lật, chữ hiện ra từ mờ đến rõ (fade-in \+ blur-out).  
* **Nút bấm:** 2 nút tròn ở dưới đáy: "Đổi câu khác" (Icon Refresh) và "Đã xong/Uống" (Icon Ly rượu).

### **2.2. Content Database (100+ Items)**

#### **Loại A: Quan sát "Thế Giới" (50 items)**

*Mục tiêu: Tạo cớ để quan sát xung quanh và thì thầm.*

1. Tìm một người đang dùng điện thoại. Bịa ra tin nhắn họ đang gửi.  
2. Chọn một cặp đôi khác trong quán. Đoán xem họ đã quen nhau bao lâu?  
3. Tìm vật trang trí xấu nhất trong quán này. Chỉ cho đối phương xem.  
4. Đoán xem bàn bên cạnh đã gọi món gì trước khi phục vụ mang ra.  
5. Tìm một người trông giống người nổi tiếng nào đó.  
6. Nếu quán này bất ngờ biến thành phim hành động, ai ở đây sẽ là nhân vật phản diện?  
7. Đếm xem có bao nhiêu người đang mặc đồ màu đen trong tầm mắt.  
8. Tìm một người có dáng ngồi kỳ quặc nhất.  
9. Đoán nghề nghiệp của người pha chế/nhân viên phục vụ.  
10. Tìm một món đồ trong quán mà bạn muốn "chôm" về nhà nhất.  
11. Nhìn người ở hướng 3 giờ. Đặt cho họ một biệt danh ngớ ngẩn.  
12. Tìm một cặp đôi đang trong buổi hẹn hò đầu tiên (First date).  
13. Nếu phải trốn trong quán này, chỗ nào là nơi trốn tốt nhất?  
14. Đoán xem ai trong quán này là người giàu nhất?  
15. Tìm một người trông có vẻ đang chán đời.  
16. Nhìn vào menu đồ uống. Chọn món có tên sến súa nhất.  
17. Nếu Zombie tấn công ngay lúc này, chúng ta sẽ dùng vật gì trên bàn làm vũ khí?  
18. Tìm một du khách trông lạc lõng nhất.  
19. Đoán xem cặp đôi ở góc kia đang nói về chủ đề gì (Công việc/Tình yêu/Chia tay)?  
20. Tìm một người có kiểu tóc ấn tượng nhất.  
    (Developer: Các câu từ 21-50 tiếp tục pattern quan sát trang phục, hành vi, giả định cốt truyện cho người lạ, soi menu, soi thiết kế quán...)  
21. Ai trong quán này có khả năng là điệp viên ngầm?  
22. Tìm người uống say nhất trong quán hiện tại.  
23. Đánh giá gu âm nhạc của quán thang điểm 1-10.  
24. Tìm một món đồ màu đỏ nổi bật nhất.  
25. Đoán giá tiền bộ đồ của người vừa bước vào cửa.  
    ... (Generate tiếp tục theo logic quan sát)

#### **Loại B: Thấu hiểu "Cặp Đôi" (50 items)**

*Mục tiêu: Deep talk & Flirting.*

51. Ấn tượng đầu tiên của anh/em về đối phương trong 3 từ?  
52. Kể tên 3 địa điểm chúng ta nhất định phải đi cùng nhau trước khi chết.  
53. Thói quen xấu nào của anh/em mà em/anh thấy đáng yêu?  
54. Lần gần nhất chúng ta cười đến đau bụng là khi nào?  
55. Nếu trúng số độc đắc ngày mai, việc đầu tiên chúng ta làm cùng nhau là gì?  
56. Một bí mật nhỏ thời thơ ấu chưa từng kể?  
57. Bài hát nào mô tả đúng nhất mối quan hệ của chúng ta?  
58. Khoảnh khắc nào trong chuyến đi này khiến bạn hạnh phúc nhất đến giờ?  
59. Điều điên rồ nhất chúng ta từng làm trên giường (hoặc muốn làm)?  
60. Nếu có thể thay đổi một điều ở đối phương, đó là gì? (Cẩn thận\!)  
61. Em/Anh thích được hôn ở đâu nhất (trừ môi)?  
62. Mô tả mùi hương của đối phương.  
63. Ai là người bừa bộn hơn trong mối quan hệ này?  
64. Kỷ niệm đáng xấu hổ nhất của bạn mà đối phương chưa biết?  
65. Nếu chúng ta là nhân vật trong phim, chúng ta là ai?  
66. Bạn thích phần cơ thể nào của mình nhất?  
67. Bạn thích phần cơ thể nào của đối phương nhất?  
68. Điều gì làm bạn sợ hãi nhất trong tình yêu?  
69. Nhìn vào mắt nhau 30 giây không được cười. Ai cười trước uống.  
70. Hôn lên má đối phương ngay bây giờ.  
71. Một điều bạn muốn đối phương làm cho mình nhiều hơn?  
72. Tật xấu khi ngủ của đối phương là gì?  
73. Món quà tệ nhất bạn từng nhận được là gì?  
74. Nếu có con, bạn muốn con giống ai điểm nào?  
75. Ai là người nấu ăn ngon hơn?  
    ... (Các câu hỏi xoay quanh: Quá khứ, Tương lai, Sex/Intimacy, Sở thích, Thói quen)

## ---

**3\. Game 2: Xúc Xắc Cao Nguyên (Highland Dice)**

Concept: 3D Dice Roller.  
Bối cảnh: Phòng ngủ/Riêng tư.  
Logic: Random kết hợp: \[Động từ\] \+ \[Vị trí\] \+ \[Điều kiện\].

### **3.1. Phân tích UI/UX**

* **Engine:** Sử dụng Three.js hoặc React-three-fiber để tạo 3 viên xúc xắc 3D.  
* **Vật lý:** Xúc xắc có chất liệu "Liquid Glass" (trong suốt, có phản chiếu môi trường).  
* **Tương tác:** Lắc điện thoại (sử dụng Gyroscope API của browser) hoặc vuốt mạnh màn hình để gieo.  
* **Feedback:** Haptic feedback (rung) khi xúc xắc va vào nhau. Âm thanh lanh canh của thủy tinh.

### **3.2. Content Database (Tổ hợp biến số)**

Developer cần tạo 3 mảng dữ liệu (Arrays). Game sẽ random lấy 1 phần tử từ mỗi mảng.

Mảng 1: Hành động (Verbs) \- 30 items  
\`\`  
Mảng 2: Vị trí (Body Parts/Locations) \- 30 items  
\`\`  
Mảng 3: Điều kiện Sapa (Modifiers) \- 40 items  
\`\`  
*Tổng tổ hợp:* 30 x 30 x 40 \= 36,000 kết quả (Vượt xa yêu cầu 100).

## ---

**4\. Game 3: Cú Quẹt Tình Yêu (Love Swipe)**

Concept: Tinder-style matching game.  
Bối cảnh: Dạo đầu (Foreplay).  
Logic: Đồng thuận ẩn (Hidden Consensus). Cả hai cùng quẹt, chỉ hiện kết quả nếu cả 2 cùng "Yes".

### **4.1. Phân tích UI/UX**

* **Card Stack:** Chồng thẻ bài xếp lớp ở giữa.  
* **Animation:** Sử dụng thư viện như Framer Motion (React) hoặc Hammer.js.  
  * Vuốt Phải \-\> Xanh lá \-\> "Thích".  
  * Vuốt Trái \-\> Đỏ \-\> "Bỏ qua".  
* **Flow:**  
  1. Máy đưa cho Player 1 \-\> P1 quẹt 10 thẻ (ẩn kết quả) \-\> Màn hình khóa "Chuyển cho Player 2".  
  2. P2 nhận máy \-\> P2 quẹt trên cùng 10 thẻ đó.  
  3. Hệ thống so sánh.  
  4. Hiển thị danh sách "Matches" (Các hành động cả 2 cùng Yes) với hiệu ứng pháo hoa/rung mạnh.

### **4.2. Content Database (100+ Cards)**

Phân loại theo mức độ nhiệt (Heat Level).

#### **Level 1: Warm (Khởi động \- 30 items)**

1. Massage vai cho nhau 3 phút.  
2. Tắm chung (không sex).  
3. Cùng nhau uống một ly rượu giao bôi.  
4. Ôm nhau ngủ khỏa thân.  
5. Ngồi lên đùi anh/em và hôn.  
6. Anh sấy tóc cho em.  
7. Đút cho nhau ăn một món gì đó.  
8. Chụp một bức ảnh hôn nhau trước gương.  
9. Thì thầm một lời khen sến súa vào tai.  
10. Vuốt ve lưng trần.  
11. Hôn sâu kiểu Pháp trong 1 phút.  
12. Cởi đồ cho nhau (chậm rãi).  
13. Nhảy một điệu slow dance không nhạc.  
14. Kể về "lần đầu tiên" của chúng ta.  
15. Soi gương cùng nhau và chỉ ra điểm sexy của đối phương.  
16. Nghịch tóc nhau.  
17. Hôn lên trán.  
18. Cắn nhẹ vào vai.  
19. Nắm tay và nhìn vào mắt nhau.  
20. Mặc áo sơ mi của anh (đối với nữ).  
21. Đắp mặt nạ chung.  
22. Uống chung một cốc nước.  
23. Gối đầu tay ngủ.  
24. cù lét nhau.  
25. Chơi oẳn tù tì, ai thua cởi 1 món.  
26. Đoán màu đồ lót đang mặc.  
27. Sờ bụng/cơ bụng.  
28. Hôn lên mí mắt.  
29. Cõng nhau đi một vòng phòng.  
30. Tự sướng (Selfie) kiểu mặt xấu.

#### **Level 2: Hot (Kích thích \- 40 items)**

31. Tắm chung (có đụng chạm nhạy cảm).  
32. Oral Sex (nhẹ nhàng).  
33. Body shot (Uống rượu trên cơ thể).  
34. Múa thoát y (Striptease).  
35. Dùng đá lạnh chạy dọc sống lưng.  
36. Hôn dọc đùi trong.  
37. Dùng miệng cởi đồ lót.  
38. Massage bằng dầu toàn thân (Nude).  
39. Bịt mắt và đoán vật chạm vào người.  
40. Trói tay bằng cà vạt/khăn.  
41. Sex trước gương.  
42. Quay video (chỉ 2 người xem).  
43. "Tự sướng" cho đối phương xem.  
44. Sex trong tư thế Doggy.  
45. Sex trong tư thế Cowgirl.  
46. Sex trên ghế.  
47. Dùng đồ chơi (nếu có mang theo).  
48. Dirty talk (Nói bậy).  
49. Spanking (Vỗ mông) nhẹ.  
50. Kéo tóc nhẹ khi hôn.  
51. Cắn vào môi dưới.  
52. Hôn ngực.  
53. Chạm vào "cô bé/cậu bé" qua lớp quần lót.  
54. Giả vờ là người lạ gặp nhau ở bar.  
55. Chụp ảnh sexy của đối phương.  
56. Ăn kem/socola trên người đối phương.  
57. Hôn chân/ngón chân.  
58. Khám phá cơ thể bằng đèn pin điện thoại.  
59. Thử một tư thế chưa bao giờ làm.  
60.   
61. Sex đứng.  
62. Sex trong nhà tắm.  
63. Cho tay vào trong quần.  
64. Ngủ nude hoàn toàn.  
65. Hôn kiểu người Nhện (ngược).  
66. Dùng lông vũ/vải mềm quét lên da.  
67. Bế lên và làm tình.  
68. Kẹp chân quanh hông.  
69. Hôn mông.  
70. Liếm vành tai.

#### **Level 3: Scorching (Thiêu đốt/Kinky \- 30 items)**

71. Trói chặt vào giường (Bondage).  
72. Bịt miệng (Gag) bằng khăn/vật dụng.  
73. Sex thô bạo (Rough sex).  
74. Anal play (Cửa sau).  
75. Thử thách "Edging" (Kích thích nhưng không cho ra).  
76. Dùng thắt lưng quất nhẹ.  
77. Bóp cổ nhẹ (Choking \- An toàn).  
78. Nhổ nước bọt (Spitting \- nếu thích).  
79. Sex ngoài ban công (nếu kín đáo).  
80. Sex mở cửa sổ (nghe tiếng mưa/gió).  
81. Gọi video sex (nếu đang ở xa \- phòng trường hợp).  
82. Cosplay (Y tá/Cảnh sát/Hầu gái).  
83. Phục vụ như nô lệ trong 1 tiếng.  
84. Thử cảm giác đau nhẹ (cắn mạnh, véo).  
85. Deep throat.  
86. Cum on face (Xuất lên mặt).  
87. Nuốt (Swallow).  
88. Creampie (Bên trong).  
89. Sex 3 hiệp trong đêm nay.  
90. Dùng kẹp (kẹp ngực/kẹp giấy).  
91. Wax play (Sáp nến nhiệt độ thấp).  
92. Ice play (Đá lạnh vào vùng kín).  
93. Golden shower (Tùy chọn cực mạnh).  
94. Quay phim sex full HD.  
95. Gọi điện cho lễ tân xin thêm khăn khi đang "làm".  
96. Mặc đồ lót của đối phương.  
97. Thử tư thế "Vác cày qua núi".  
98. Sex marathon (làm lâu nhất có thể).  
99. Wake up sex (Sex đánh thức vào sáng mai).  
100. **Joker Card:** Người nhận được thẻ này được quyền yêu cầu BẤT CỨ ĐIỀU GÌ.

## ---

**5\. Tóm tắt Kỹ thuật cho Developer (Dev Handoff)**

1. **Tech Stack đề xuất:** ReactJS (hoặc Next.js) \+ TailwindCSS.  
2. **State Management:**  
   * Game 1: Mảng đơn giản, index hiện tại.  
   * Game 2: Animation state (Rolling \-\> Stopped), Random Logic.  
   * Game 3: 2 Mảng lựa chọn (P1\_Choices, P2\_Choices). Hàm so sánh Intersection để tìm Matches.  
3. **Performance:**  
   * Sử dụng will-change: transform cho các thẻ bài vuốt.  
   * Background Blob nên dùng CSS Animation thay vì Video để nhẹ máy.  
   * Preload font và icon.  
4. **PWA:** Cài đặt Service Worker để cache toàn bộ Content Database, đảm bảo chơi được khi Sapa mất mạng/Wifi yếu.