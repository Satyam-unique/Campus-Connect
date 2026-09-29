# 🎓 Campus Connect

**Campus Connect** is a modern full-stack campus management portal that provides students with a centralized platform to manage their academic activities. From checking timetables and attendance to viewing notices, assignments, events, and lost & found items, everything is accessible through a clean and responsive interface secured with JWT authentication.

---

## ✨ Features

- 🔐 Secure user authentication (JWT + bcrypt)
- 📊 Interactive student dashboard
- 🗓️ Timetable management
- ✅ Attendance tracking
- 📝 Assignment management
- 📢 Campus notice board
- 🎉 College events
- 🔎 Lost & Found portal
- 👤 Student profile management
- 📱 Fully responsive UI for desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router
- CSS3
- Lucide React Icons

### Backend
- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```text
Campus-Connect/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages
│   ├── context/             # React Context API
│   ├── services/            # API services
│   ├── assets/              # Images & static assets
│   └── App.jsx
│
├── server/
│   ├── models/              # MongoDB models
│   ├── routes/              # Express routes
│   ├── middleware/          # Authentication middleware
│   ├── config/              # Database configuration
│   └── server.js
│
├── public/
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js (v18 or above)
- npm
- MongoDB (Local or MongoDB Atlas)

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/vinitkumar491/Campus-Connect.git

cd Campus-Connect
```

---

## 2️⃣ Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the **server** folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start

# or

node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Return to the project root.

```bash
npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🌐 Environment Variables

### Backend (`server/.env`)

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

# 📸 Application Modules

- Dashboard
- Authentication
- Timetable
- Attendance
- Assignments
- Notices
- Events
- Lost & Found
- Profile

---

# 🔒 Authentication

Campus Connect uses:

- JWT (JSON Web Token) for authentication
- bcryptjs for password hashing
- Protected API routes
- Token-based authorization

---

# 📈 Future Enhancements

- 📅 Faculty Dashboard
- 🔔 Real-time Notifications
- 💬 Chat System
- 📚 Course Management
- 📄 Notes Sharing
- 📥 File Uploads
- 🌙 Dark Mode
- 📊 Analytics Dashboard
- 📱 Progressive Web App (PWA)

---

# 👨‍💻 Author

**Vinit Kumar**

GitHub: https://github.com/vinitkumar491

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!