# TechmasterMigrationScript
Lưu trữ các file script tự động migrate database từ Techmasterv3 sang Techmasterv4

- Danh sách các Task nằm ở trong folder `task`
- Danh sách các Action nằm ở trong folder `action`
- Danh sách các script SQL nằm ở trong folder `script`

Để test từng Task, thì mình cập nhật tên file Task ở trong file `test.js` và chạy `npm test`

File `index.js` dùng để thực thi danh sách các Task, chạy bằng lệnh `npm start`. Bên trong ta có thể thực thi các task theo trình tự:
- Nối tiếp - Đồng bộ (`runSequence`)
- Song song - Bất đồng bộ (`parallel`)

**Lưu ý**: tên các Task phải trùng với tên file ở trong folder `task`