# RifChatPro

> **⚠️ Project Status: Beta Phase (v0.1.0)**
> This application is currently in its early experimental stage. We are actively working on it and will release updates as often as possible to add new features, improve performance, and enhance security. We appreciate your patience and feedback!

**RifChatPro** is a lightweight, secure, and real-time group chat application. It is designed to be run locally or self-hosted, giving you full control over your data without relying on third-party cloud providers.

## 🚀 Features

- **Real-time messaging:** Instant message delivery using Socket.io.
- **End-to-End Encryption (E2EE):** Client-side message encryption using CryptoJS protected by a room secret password (with expanded payload support up to 2000 characters).
- **Self-Hosted & Local First:** Run entirely on your local machine or local network for maximum privacy and data control.
- **Enhanced Security & Offline PWA:** Built with input sanitization (XSS protection), rate limiting on the server, local asset referencing (manifest.json with local icon support), and secure error handling for decryption.
- **Mobile Support:** Configured with Capacitor for cross-platform mobile deployment.
- **Open Source:** 100% free and open-source. You can modify and distribute it as you wish.

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript, CryptoJS (Local Asset).
- **Backend:** Node.js, Express.js, SQLite (better-sqlite3), Express Rate Limit.
- **Real-time Engine:** Socket.io.
- **Mobile Wrapper:** Capacitor.

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hacktivate123/RifChatpro.git
   cd RifChatpro