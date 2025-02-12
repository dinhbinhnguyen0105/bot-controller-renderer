// server.js
const express = require('express'); // Import module Express
const app = express();              // Tạo instance của Express
const port = 3000;                  // Đặt cổng cho server

// Middleware: cho phép parse dữ liệu JSON nếu cần (ví dụ: POST request)
app.use(express.json());

// Định nghĩa route cho trang chủ
app.get('/', (req, res) => {
    res.send('Hello, world! Đây là server ảo của bạn.');
});

// Định nghĩa thêm route ví dụ cho API user
app.get('/api/user', (req, res) => {
    // Giả lập dữ liệu trả về
    const user = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com'
    };
    res.json(user);
});

// Route POST ví dụ (nhận dữ liệu từ client)
app.post('/api/user', (req, res) => {
    const newUser = req.body; // dữ liệu JSON được gửi từ client
    // Ở đây bạn có thể xử lý (lưu vào cơ sở dữ liệu, kiểm tra, …)
    console.log('Dữ liệu nhận được:', newUser);
    res.status(201).json({ message: 'User created successfully', data: newUser });
});

// Middleware xử lý lỗi (nếu không tìm thấy route nào phù hợp)
app.use((req, res, next) => {
    res.status(404).send('Không tìm thấy trang yêu cầu!');
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
