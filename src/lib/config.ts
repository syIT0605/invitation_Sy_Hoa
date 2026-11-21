// Thông tin đám cưới — chỉnh sửa tại đây để cập nhật toàn bộ website.
// Ngày giờ dùng định dạng ISO, có timezone Việt Nam (+07:00).
// `father` có thể bỏ trống nếu không muốn hiển thị (ví dụ bên nào chỉ nêu tên mẹ).

type PersonInfo = {
  fullName: string;
  shortName: string;
  father?: string;
  mother: string;
  // Ví dụ: "Trưởng Nam", "Út Nữ"... để trống nếu không muốn hiển thị.
  birthOrderLabel?: string;
  // Địa chỉ gia đình hiển thị dưới tên cha mẹ ở thiệp trang trọng.
  parentsAddress?: string;
};

export type WeddingEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venueName: string;
  address: string;
  mapUrl: string;
  // Ngày âm lịch hiển thị trong ngoặc, vd: "15 tháng 11 năm Ất Tỵ". Để trống nếu không cần.
  lunarDate?: string;
  // Chỉ dùng cho tiệc cưới (card có lịch + bản đồ + nút xác nhận).
  guestArrivalTime?: string; // "Đón khách"
  banquetTime?: string; // "Khai tiệc"
  // Sự kiện chỉ hiện cho khách bên này (dựa vào "side" khi thêm khách ở Admin).
  // Để trống (hoặc "BOTH") = hiện cho mọi khách.
  side?: "GROOM" | "BRIDE" | "BOTH";
};

export const weddingConfig = {
  groom: {
    fullName: "Lê Văn Sỹ",
    shortName: "Sỹ",
    father: "Ông Lê Văn Dũng",
    mother: "Bà Nguyễn Thị Hiền",
  } as PersonInfo,
  bride: {
    fullName: "Đào Thị Quỳnh Hoa",
    shortName: "Hoa",
    mother: "Bà Lý Thị Luyên",
  } as PersonInfo,
  // Dùng cho countdown & hiển thị ngày cưới
  weddingDate: "2026-12-12T10:00:00+07:00",
  // Sự kiện đầu tiên (sau khi lọc theo "side" của khách) = lễ thành hôn
  // (thiệp trang trọng, không có lịch/bản đồ). Các sự kiện sau = tiệc cưới
  // (có lịch, bản đồ, nút xác nhận tham dự).
  // `side: "BRIDE"` → chỉ khách nhà gái thấy; `side: "GROOM"` → chỉ khách nhà
  // trai thấy; để trống hoặc "BOTH" → ai cũng thấy.
  events: [
    {
      id: "nha-gai",
      title: "Lễ Vu Quy",
      description: "Nhà gái tổ chức tiệc mừng",
      date: "2026-12-14T08:00:00+07:00", // TODO: chỉnh đúng giờ lễ Vu Quy
      venueName: "Tư gia nhà gái",
      address: "TODO: điền địa chỉ nhà gái",
      mapUrl: "TODO: điền link Google Maps nhà gái",
      side: "BRIDE",
    },
    {
      id: "nha-trai",
      title: "Lễ Thành Hôn",
      description: "Nhà trai tổ chức tiệc mừng",
      date: "2026-12-14T12:00:00+07:00",
      venueName: "Tư gia nhà trai",
      address: "Thôn 16a, xã Ea Nuôl, tỉnh Đăk Lăk",
      mapUrl: "https://maps.app.goo.gl/EA6W4HES3qypRnng7",
      side: "GROOM",
    },
    {
      id: "nha-trai-tiec",
      title: "Lễ Thành Hôn",
      description: "Nhà trai tổ chức tiệc mừng",
      date: "2026-12-14T14:00:00+07:00",
      venueName: "Tư gia nhà trai",
      address: "Thôn 16a, xã Ea Nuôl, tỉnh Đăk Lăk",
      mapUrl: "https://maps.app.goo.gl/EA6W4HES3qypRnng7",
      guestArrivalTime: "9:30",
      banquetTime: "11:00",
      side: "GROOM",
    },
  ] as WeddingEvent[],
  siteTitle: "S & H — Thiệp Cưới Online",
  siteDescription: "Trân trọng kính mời bạn đến chung vui trong ngày cưới của chúng mình.",
  heroQuote: "Yêu nhau từ một ánh nhìn, nên duyên từ một chữ Thương.",
  // Để trống nếu không muốn hiển thị mục "Hành trình yêu thương".
  coupleStory: [] as { year: string; title: string; description: string }[],
  // Để trống nếu không muốn hiển thị mục "Hộp mừng cưới".
  bankAccounts: [] as { owner: string; bank: string; accountNumber: string }[],
};

export type WeddingConfig = typeof weddingConfig;
