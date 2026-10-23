const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const Database = require('better-sqlite3');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const limiter = rateLimit({
    windowMs: 10 * 1000, 
    max: 20, 
    message: "Too many messages, please try again later."
});
app.use(limiter);

const db = new Database('./chat.db');
db.exec(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, text TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);
const insertStmt = db.prepare("INSERT INTO messages (name, text) VALUES (?, ?)");

app.use(express.static('public'));

// قائمة المتصلين
let onlineUsers = {};

io.on('connection', (socket) => {
    console.log('A new user connected');

    socket.on('user joined', (username) => {
        onlineUsers[socket.id] = username;
        io.emit('update users', Object.values(onlineUsers));
    });

    try {
        const rows = db.prepare("SELECT * FROM messages ORDER BY id ASC LIMIT 100").all();
        socket.emit('chat history', rows);
    } catch (err) { console.error("DB Read Error:", err); }

    socket.on('chat message', (data) => {
        try {
            if (!data.name || !data.text || data.text.trim() === '') return;
            const safeName = data.name.substring(0, 20).trim();
            const safeText = data.text.substring(0, 500).trim();
            insertStmt.run(safeName, safeText);
            io.emit('chat message', { name: safeName, text: safeText });
        } catch (err) { console.error("DB Write Error:", err); }
    });

    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        io.emit('update users', Object.values(onlineUsers));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on: http://localhost:${PORT}`);
});