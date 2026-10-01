# FinanceCheck — Sổ theo dõi trả nợ

Web app cá nhân: theo dõi khoản nợ, thu nhập và chi tiêu theo từng tháng, đồng bộ giữa điện thoại và máy tính qua Firebase.

**Địa chỉ web:** triển khai bằng Netlify, tự build mỗi khi push lên nhánh `main`.

## Dùng thế nào

Mở web, đăng nhập bằng email và mật khẩu đã tạo trong Firebase Authentication. Đăng nhập một lần, lần sau vào thẳng.

**Tháng này** — lịch các khoản trong tháng xếp theo ngày, kèm số dư chạy sau mỗi khoản. Nút cộng góc dưới để thêm khoản nợ, thu nhập hoặc chi tiêu. Chạm vào một khoản để sửa, xóa, hoặc đặt số tiền riêng cho đúng tháng đó. Nút "Sắp xếp" để kéo thả đổi thứ tự trong tháng.

**Tổng quan** — toàn bộ các tháng, danh sách khoản nợ và thu nhập, quản lý nguồn tiền.

**Đồng bộ** — trạng thái kết nối, đăng xuất, xóa bộ nhớ đệm khi web không nhận bản mới.

## Quy ước tính toán

- Tháng đã qua và tháng hiện tại trừ theo **chi tiêu thực tế** đã ghi; tháng tương lai trừ theo **hạn mức**. Tháng đã qua mà chưa ghi khoản chi nào thì tạm tính theo hạn mức.
- Chi bằng nguồn **trả ngay** trừ vào dòng tiền đúng ngày chi. Chi bằng nguồn **trả sau** (thẻ tín dụng, ví trả sau) không trừ ngay mà sinh dòng "Hóa đơn thẻ dự kiến" ở tháng sau.
- **Số dư đầu tháng** để trống thì tự lấy số dư cuối của tháng trước. Nhập tay thì số đó thành mốc, các tháng sau tính tiếp từ đó.
- Khoản đến hạn ngày 29–31 rơi vào tháng ngắn hơn sẽ tính vào ngày cuối tháng đó.

## Cấu trúc file

Trang tĩnh, không có bước build trên Netlify.

| File | Vai trò |
|---|---|
| `index.html` | Khung trang và lớp đồng bộ Firebase (`window.Sync`). Cấu hình Firebase nhúng sẵn. |
| `app.js` | Toàn bộ giao diện React 18, **đã biên dịch** sang `React.createElement` — không có file JSX gốc. |
| `app.css` | Tailwind v3 dựng sẵn từ `app.js`. |
| `sw.js` | Service worker, ưu tiên mạng cho file của trang. |
| `_headers` | Netlify: `no-cache` cho các file chính. |
| `manifest.webmanifest`, `icon.svg` | Cài được lên màn hình chính điện thoại. |

## Sửa code

Xem `CLAUDE.md` — có quy tắc bắt buộc về dữ liệu, cách dựng lại CSS và cách kiểm thử.

## Dữ liệu

Firestore, collection `soNo`, document id là uid của tài khoản. Quy tắc bảo mật chỉ cho chính chủ đọc ghi:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /soNo/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Muốn sao lưu tay: mở Firestore Console, copy nội dung trường `data` ra file text.
