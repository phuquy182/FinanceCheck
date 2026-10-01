# FinanceCheck — hướng dẫn cho Claude

Web app cá nhân theo dõi nợ, thu nhập, chi tiêu theo tháng. Giao tiếp với người dùng bằng **tiếng Việt**, ngắn gọn và thực dụng.

## Cấu trúc

Trang tĩnh, Netlify tự deploy mỗi khi push lên `main`. Không có bước build phía Netlify.

- `index.html` — khung trang + lớp đồng bộ Firebase (script `type="module"`, đối tượng `window.Sync`). Cấu hình Firebase nhúng sẵn trong file; đây **không phải** bí mật, Firebase thiết kế để nó công khai.
- `app.js` — toàn bộ giao diện React 18, **đã biên dịch** sang `React.createElement`. Không có file JSX gốc, nên sửa trực tiếp file này. React tải từ unpkg dạng UMD, không dùng `import`.
- `app.css` — Tailwind v3 dựng sẵn. Thêm class Tailwind mới thì **bắt buộc dựng lại**, nếu không class đó không có tác dụng:
  ```
  npx tailwindcss@3.4.17 -c tw.config.js -i tw.in.css -o app.css --minify
  ```
  với `content: ["./app.js"]` và file vào gồm ba dòng `@tailwind base/components/utilities`.
- `sw.js` — service worker, **ưu tiên mạng** cho file của trang. Đừng đổi sang ưu tiên bộ nhớ đệm: từng gây lỗi `index.html` mới chạy với `app.js` cũ sau mỗi lần deploy, biểu hiện giống hệt lỗi đăng nhập.
- `_headers` — Netlify, `no-cache` cho các file chính.

## Mỗi lần sửa app.js hoặc app.css

Tăng số phiên bản trong `index.html`: `app.js?v=N` và `app.css?v=N`. Quên bước này thì trình duyệt giữ bản cũ.

## Dữ liệu

Firestore: collection `soNo`, document id = uid, trường `data` là chuỗi JSON, kèm `updatedAt`. Bộ nhớ tạm trên máy: `localStorage["so-no:<uid>"]`.

Cấu trúc hiện tại (`DATA_VERSION = 5`):
`debts, incomes, chi, hanMuc, nguon, paid, dungHanMuc, boUocTinh, thuTu, duDau, updatedAt`

Đổi cấu trúc thì **tăng `DATA_VERSION` và bổ sung hàm `nangCap`** để bản cũ tự nâng cấp. Không bao giờ làm mất trường cũ.

## Bốn quy tắc không được phá

Đây là các lỗi đã từng làm mất dữ liệu thật của người dùng:

1. **Không đóng dấu `updatedAt` khi chỉ mở app.** Chỉ lưu khi nội dung thật sự đổi (so qua `noiDungRef`). Vi phạm thì dữ liệu cũ trên máy này đè bản mới từ máy khác.
2. **Không ghi hay đẩy danh sách mẫu (`SEED_DEBTS`) lên đám mây.** Danh sách mẫu chỉ để hiển thị khi tài khoản chưa có gì.
3. **Không đẩy gì lên đám mây trước khi nhận snapshot đầu tiên** (`daCoSnapshot`).
4. **Không để người dùng kẹt ở màn hình chờ** không có lối thoát. Mọi lỗi phải hiện ra bằng lời rõ ràng, kèm mã lỗi gốc.

## Quy ước tính toán

- Tháng đã qua và tháng hiện tại: chi tiêu thực tế. Tháng tương lai: hạn mức. Tháng đã qua chưa ghi khoản chi nào: tạm tính theo hạn mức.
- Nguồn **trả ngay** trừ vào dòng tiền đúng ngày chi. Nguồn **trả sau** sinh dòng "Hóa đơn thẻ dự kiến" ở tháng sau (`uocTinhHoaDon`), bỏ được qua `boUocTinh`.
- `duDau[thang]` nhập tay thì neo lại chuỗi lũy kế từ tháng đó; để trống thì nối tiếp tháng trước.
- `ov[thang]` trên khoản nợ hoặc khoản thu = số tiền riêng cho đúng tháng đó.
- `thuTu[thang]` = thứ tự kéo thả, chỉ áp cho tháng đó, không đổi ngày đến hạn.
- Ngày 29–31 rơi vào tháng ngắn hơn thì dồn về ngày cuối tháng (`ngayThuc`).
- Số tiền hiển thị nhóm 3 chữ số ngăn bằng dấu cách: `3 101 000`.
- Dự báo chi tiêu cuối tháng chỉ hiện từ ngày 7 trở đi; trước đó chia cho số ngày quá nhỏ nên vô nghĩa.

## Trước khi push

Kiểm thử thật, đừng đoán. Chạy app bằng jsdom, giả lập `window.Sync` rồi nạp dữ liệu qua `window.nhanDuLieu(...)`:

```js
new Function("React","ReactDOM","window","document","localStorage","console",
  "setInterval","clearInterval","setTimeout","clearTimeout","location","Date","navigator",
  fs.readFileSync("app.js","utf8"))(React, ReactDOM, w, w.document, fakeLocalStorage, console,
  w.setInterval.bind(w), w.clearInterval.bind(w), w.setTimeout.bind(w), w.clearTimeout.bind(w),
  w.location, Date, w.navigator);
```

Sau mỗi thay đổi đụng tới tính toán, kiểm lại bằng số cụ thể: dòng tiền, số dư chạy, lũy kế, và tháng kế tiếp có bị ảnh hưởng không.
