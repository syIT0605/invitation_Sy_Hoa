# Thiệp Cưới Online — A & D 💐

Website thiệp cưới online xây bằng **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Prisma + PostgreSQL**, triển khai trên **Vercel**. Phong cách romantic (hồng pastel + chữ script), nội dung tiếng Việt.

## 1. Kiến trúc tổng quan

```
Khách truy cập ──► Next.js App Router (Server Components)
                       │
                       ├─ Trang chủ "/"  : Hero, câu chuyện, lịch trình, gallery, RSVP, lời chúc
                       ├─ "/gallery"     : Toàn bộ thư viện ảnh
                       ├─ "/admin/*"     : Khu vực quản trị (bảo vệ bởi proxy.ts + session JWT)
                       │
                       ▼
                 Server Actions ("use server")
                       │
          ┌────────────┼─────────────────┐
          ▼                               ▼
   Prisma ORM → PostgreSQL        @vercel/blob → Vercel Blob Storage
   (Guest, Rsvp, GalleryImage,     (ảnh gallery + file nhạc nền)
    MusicTrack)
```

- **Không có REST API routes** — toàn bộ mutation (tạo khách, RSVP, upload ảnh/nhạc...) dùng **Server Actions** của Next.js, idiomatic hơn và tự có bảo vệ CSRF/encrypted action id.
- **Xác thực admin**: JWT ký bằng `jose`, lưu trong cookie `httpOnly`, kiểm tra ở `src/proxy.ts` (file `proxy.ts` là tên mới của `middleware.ts` kể từ Next.js 16) **và** lại một lần nữa trong từng Server Action (`requireAdmin()`) — phòng trường hợp Server Action bị gọi trực tiếp mà không qua proxy.
- **Lưu trữ file**: ảnh & nhạc upload qua admin được lưu trên **Vercel Blob**, không lưu trong repo.

## 2. Cấu trúc source code

```
prisma.config.ts       # Cấu hình kết nối DB cho CLI (prisma db push/migrate) — Prisma 7 không
                        # còn cho khai báo url trong schema.prisma nữa

prisma/
  schema.prisma        # Guest, Rsvp, GalleryImage, MusicTrack (PostgreSQL)
  seed.ts              # Tạo vài khách mời mẫu

src/
  proxy.ts             # Bảo vệ toàn bộ /admin/* (trừ /admin/login)
  lib/
    config.ts          # Thông tin cô dâu/chú rể, ngày cưới, địa điểm — SỬA Ở ĐÂY
    db.ts               # Prisma client singleton (qua driver adapter @prisma/adapter-pg)
    auth.ts / session.ts  # Tạo & kiểm tra session admin (JWT)
    blob.ts             # Upload/xoá file trên Vercel Blob
    validations.ts      # Zod schema cho form RSVP, khách mời...
    slug.ts             # Sinh slug link thiệp riêng cho từng khách

  app/
    layout.tsx, globals.css   # Font (Playfair Display, Dancing Script, Be Vietnam Pro), theme màu
    page.tsx             # Trang thiệp chính — nhận ?to=<slug> để cá nhân hoá
    gallery/page.tsx      # Trang xem toàn bộ ảnh
    rsvp/actions.ts        # Server Action xử lý RSVP công khai

    admin/
      login/              # Trang đăng nhập + Server Action loginAction/logoutAction
      (dashboard)/         # Route group — mọi trang dùng chung AdminNav layout
        page.tsx            # Thống kê tổng quan
        guests/             # CRUD khách mời + sinh link riêng
        rsvps/              # Danh sách phản hồi RSVP
        gallery/            # Upload/sắp xếp/xoá ảnh
        music/              # Upload & chọn nhạc nền đang phát

  components/
    site/                # Hero, Countdown, StoryTimeline, EventDetails, RsvpForm,
                          # GalleryGrid, MusicPlayer, WishesWall, GiftBox, FloatingPetals...
    admin/                # AdminNav, CopyLinkButton, ConfirmSubmitButton
```

### Mô hình dữ liệu (Prisma)

| Model          | Mục đích                                                                 |
| -------------- | ------------------------------------------------------------------------- |
| `Guest`        | Khách mời có link thiệp riêng (`/?to=<slug>`), giới hạn số người đi kèm   |
| `Rsvp`         | Phản hồi tham dự — gắn với `Guest` (nếu có link riêng) hoặc tự do          |
| `GalleryImage` | Ảnh cưới, có thứ tự hiển thị & chú thích                                   |
| `MusicTrack`   | Các bản nhạc đã upload; chỉ 1 bản `isActive = true` phát trên trang chủ    |

## 3. Chạy local

### 3.1. Cài đặt

```bash
npm install
```

### 3.2. Biến môi trường

Copy `.env.example` → `.env` và điền giá trị thật (xem chi tiết từng biến trong file đó):

```bash
cp .env.example .env
```

Tạo `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Tạo `ADMIN_PASSWORD_HASH` (thay `mat-khau-cua-ban`):

```bash
node -e "console.log(require('bcryptjs').hashSync('mat-khau-cua-ban', 10))"
```

### 3.3. Database

Cần một PostgreSQL — cách nhanh nhất là dùng chính "Prisma Postgres" đã tạo trên Vercel (mục 4), rồi kéo biến môi trường về:

```bash
npx vercel link              # nối project local với project Vercel
npx vercel env pull .env     # tải DATABASE_URL, DATABASE_URL_POOLED,... về .env
npm run db:push               # tạo bảng theo prisma/schema.prisma
npm run db:seed                # (tuỳ chọn) tạo khách mời mẫu
```

### 3.4. Chạy dev server

```bash
npm run dev
```

Mở http://localhost:3000 — trang quản trị tại http://localhost:3000/admin/login.

> **Lưu ý khi phát triển trong môi trường bị chặn mạng tới `binaries.prisma.sh`** (ví dụ sandbox CI có tường lửa/WAF): lệnh `prisma generate` cần tải engine nhị phân từ CDN của Prisma. Nếu gặp lỗi tải (`unable to verify the first certificate`, `403`, `ECONNRESET`...), đó là do mạng của máy đang chạy bị chặn, không phải lỗi trong code. Hãy thử lại trên máy có mạng bình thường, hoặc để Vercel build (mục 4) — hạ tầng build của Vercel luôn tải được bình thường.

## 4. Triển khai lên Vercel

### Bước 1 — Đẩy code lên Git

```bash
git add -A
git commit -m "Initial wedding invitation site"
git remote add origin <your-repo-url>
git push -u origin main
```

### Bước 2 — Tạo project trên Vercel

1. Vào https://vercel.com/new, import repo vừa push.
2. Framework Preset: **Next.js** (tự nhận diện).

### Bước 3 — Tạo Database

1. Trong project Vercel → tab **Storage** → **Create Database** → chọn **Prisma Postgres**.
2. Sau khi tạo, Vercel tự thêm 4 biến vào **Environment Variables**: `DATABASE_URL`, `DATABASE_URL_POOLED`, `POSTGRES_URL`, `PRISMA_DATABASE_URL`. Dự án chỉ dùng 2 biến đầu (`prisma.config.ts` và `src/lib/db.ts`) — không cần đụng tới 2 biến còn lại.

### Bước 4 — Tạo Vercel Blob

1. Tab **Storage** → **Create Database** → chọn **Blob**.
2. Vercel tự thêm `BLOB_READ_WRITE_TOKEN` vào Environment Variables.

### Bước 5 — Thêm các biến môi trường còn lại

Trong **Settings → Environment Variables**, thêm:

| Biến                  | Giá trị                                                    |
| ---------------------- | ----------------------------------------------------------- |
| `ADMIN_USERNAME`       | Tên đăng nhập admin bạn chọn                                 |
| `ADMIN_PASSWORD_HASH`  | Hash bcrypt tạo ở mục 3.2                                    |
| `SESSION_SECRET`       | Chuỗi ngẫu nhiên tạo ở mục 3.2                               |

### Bước 6 — Deploy

Nhấn **Deploy**. Vercel sẽ tự chạy `npm run build`, trong đó script `build` đã cấu hình chạy `prisma generate` trước khi `next build` (xem `package.json`).

### Bước 7 — Tạo bảng trong database production

Sau lần deploy đầu tiên, chạy từ máy local:

```bash
npx vercel link
npx vercel env pull .env
npm run db:push
```

### Bước 8 — Tuỳ biến nội dung

- Sửa `src/lib/config.ts`: tên cô dâu/chú rể, ngày giờ, địa điểm, số tài khoản ngân hàng, câu chuyện tình yêu.
- Đăng nhập `/admin/login`, vào từng mục:
  - **Khách mời**: thêm khách → copy link riêng (`/?to=<slug>`) gửi qua Zalo/Messenger.
  - **Thư viện ảnh**: upload ảnh cưới.
  - **Nhạc nền**: upload nhạc, chọn "Đặt làm nhạc chính".

## 5. Các điểm kỹ thuật cần biết

- **Prisma 7 đổi cách khai báo kết nối DB**: `schema.prisma` không còn `url`/`directUrl`. CLI (`db push`, `migrate`, `studio`) đọc kết nối từ `prisma.config.ts` (biến `DATABASE_URL`, trực tiếp — không pooled). Runtime (`src/lib/db.ts`) dùng driver adapter `@prisma/adapter-pg` với `DATABASE_URL_POOLED` (fallback `DATABASE_URL`) — phù hợp serverless function nhiều connection ngắn hạn.
- **`experimental.serverActions.bodySizeLimit`** trong `next.config.ts` được đặt `25mb` để cho phép upload ảnh (giới hạn 8MB) và nhạc (giới hạn 20MB) qua Server Actions — mặc định Next.js chỉ cho 1MB.
- **`images.remotePatterns`** cho phép `next/image` tối ưu ảnh từ domain Vercel Blob (`*.public.blob.vercel-storage.com`).
- **`src/proxy.ts`** (không phải `middleware.ts`) — quy ước mới từ Next.js 16; chỉ áp dụng cho `/admin/:path*`.
- Toàn bộ mutation đều gọi lại `requireAdmin()` phía server, không chỉ dựa vào proxy — theo khuyến nghị bảo mật của Next.js vì Server Action có thể bị gọi trực tiếp bằng request POST mà không qua trang admin.
