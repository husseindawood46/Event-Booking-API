# 🎟️ Event Booking API

API لبناء نظام لحجز الفعاليات (Events Booking System) باستخدام **Node.js + Express + MongoDB** مع JWT Authentication.

---

## 🚀 Features
- 👤 User Authentication (Signup, Login, JWT Protect)
- 🔑 Role-based Authorization (Admin / User)
- 📅 Events Management (CRUD)
- 📝 Bookings Management (Create, View, Update, Cancel)
- 🗂️ Caching for events (performance improvement)
- 🔒 Secure with dotenv, bcrypt, JWT
- 📦 Organized structure (Routes, Controllers, Middleware, Models)

---

## 🛠️ Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Node-Cache** (for caching)
- **dotenv** for config

---

Install packages:

npm install


Add .env file:

PORT=5000
DATABASE=mongodb+srv://<user>:<password>@cluster.mongodb.net/eventBooking
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d


Run server:

npm run dev

## 📂 Project Structure
