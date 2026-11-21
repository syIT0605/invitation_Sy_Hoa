// Thông tin đám cưới — chỉnh sửa tại đây để cập nhật toàn bộ website.
// Ngày giờ dùng định dạng ISO, có timezone Việt Nam (+07:00).

export const weddingConfig = {
  groom: {
    fullName: "Nguyễn Văn A",
    shortName: "A",
    father: "Ông Nguyễn Văn B",
    mother: "Bà Trần Thị C",
  },
  bride: {
    fullName: "Trần Thị D",
    shortName: "D",
    father: "Ông Trần Văn E",
    mother: "Bà Lê Thị F",
  },
  // Dùng cho countdown & hiển thị ngày cưới
  weddingDate: "2026-12-20T11:00:00+07:00",
  events: [
    {
      id: "nha-trai",
      title: "Lễ Vu Quy",
      description: "Nhà gái tổ chức tiệc mừng",
      date: "2026-12-19T17:00:00+07:00",
      venueName: "Tư gia nhà gái",
      address: "Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=123+Duong+ABC+Quan+1+TP+HCM",
    },
    {
      id: "nha-trai-tiec",
      title: "Lễ Thành Hôn",
      description: "Nhà trai tổ chức tiệc mừng",
      date: "2026-12-20T11:00:00+07:00",
      venueName: "Trung tâm Hội nghị Tiệc cưới Hoa Hồng",
      address: "Số 456, Đường XYZ, Quận 3, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=456+Duong+XYZ+Quan+3+TP+HCM",
    },
  ],
  bankAccounts: [
    {
      owner: "Nguyễn Văn A",
      bank: "Vietcombank",
      accountNumber: "0123456789",
    },
    {
      owner: "Trần Thị D",
      bank: "Techcombank",
      accountNumber: "9876543210",
    },
  ],
  siteTitle: "A & D — Thiệp Cưới Online",
  siteDescription: "Trân trọng kính mời bạn đến chung vui trong ngày cưới của chúng mình.",
  heroQuote: "Yêu nhau từ một ánh nhìn, nên duyên từ một chữ Thương.",
  coupleStory: [
    {
      year: "2019",
      title: "Lần đầu gặp gỡ",
      description: "Chúng mình gặp nhau trong một buổi họp lớp đại học, chẳng ngờ đó là khởi đầu của một câu chuyện dài.",
    },
    {
      year: "2021",
      title: "Chính thức yêu nhau",
      description: "Sau một thời gian tìm hiểu, chúng mình quyết định nắm tay nhau đi tiếp đoạn đường phía trước.",
    },
    {
      year: "2026",
      title: "Về chung một nhà",
      description: "Và hôm nay, chúng mình muốn mời bạn cùng chứng kiến khoảnh khắc hạnh phúc nhất — ngày chúng mình nên duyên vợ chồng.",
    },
  ],
};

export type WeddingConfig = typeof weddingConfig;
