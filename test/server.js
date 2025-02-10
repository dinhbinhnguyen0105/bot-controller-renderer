// server.js
// const express = require('express'); // Import module Express
import express from "express";
import cors from "cors"; // Import module CORS

const app = express();              // Tạo instance của Express
const port = 3000;                  // Đặt cổng cho server

// Middleware: cho phép parse dữ liệu JSON nếu cần (ví dụ: POST request)
app.use(express.json());

// Middleware: cho phép CORS
app.use(cors());

const robots = [
    {
        info: {
            date: "25-02-08",
            uid: "61570948720725",
            username: "test-1",
            type: "takecare",
        },
        config: {
            addFriend: true,
        }
    },
    {
        info: {
            date: "25-02-08",
            uid: "001",
            username: "test-2",
            type: "takecare",
        },
        config: {
            addFriend: true,
        }
    },
]; // Mảng lưu trữ dữ liệu robot

// Định nghĩa route cho trang chủ
app.get('/', (req, res) => {
    res.send('Hello, world! Đây là server ảo của bạn.');
});

// Định nghĩa thêm route ví dụ cho API user
app.get('/api/robot', (req, res) => {
    res.json(robots);
});

// Route POST ví dụ (nhận dữ liệu từ client)
app.post('/api/robot', (req, res) => {
    const newRobot = req.body; // dữ liệu JSON được gửi từ client
    robots.push(newRobot); // Lưu trữ robot mới vào mảng
    console.log('Dữ liệu nhận được:', newRobot);
    res.status(201).json({ message: 'Robot created successfully', data: newRobot });
});
app.post("/api/robot-launch-browser", async (req, res) => {
    console.log(req.body);
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(201).json({ message: `Browser ${req.body.uid} closed`, data: true });
})

// Middleware xử lý lỗi (nếu không tìm thấy route nào phù hợp)
app.use((req, res, next) => {
    res.status(404).send('Không tìm thấy trang yêu cầu!');
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
