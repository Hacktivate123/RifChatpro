const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const Database = require('better-sqlite3');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Setup Database
const db = new Database('./chat.db');
db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Serve static files (Frontend)
app.use(express.static('public'));
const insertStmt = db.prepare("INSERT INTO messages (name, text) VALUES (?, ?)");
// Socket.io Logic
io.on('connection', (socket) => {
    console.log('A new user connected');

    // Send old messages to the new user
    try {
        const rows = db.prepare("SELECT * FROM messages ORDER BY id ASC LIMIT 100").all();
        socket.emit('chat history', rows);
    } catch (err) {
        console.error("DB Read Error:", err);
    }

    // Receive new message and save it
    socket.on('chat message', (data) => {
        try {

            insertStmt.run(data.name, data.text);
            // Broadcast message to all connected users
            io.emit('chat message', { name: data.name, text: data.text });
        } catch (err) {
            console.error("DB Write Error:", err);
        }
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on: http://localhost:${PORT}`);
});
