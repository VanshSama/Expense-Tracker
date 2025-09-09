# Expense-Tracker

A modern, secure, and user-friendly Personal Finance Manager built with React on the frontend and Express on the backend. It allows users to register/login, manage budgets, track expenses and income, upload receipts, and view visual summaries by month.

---

## 🚀 Live Demo  
Click here: `https://expense-tracker-three-sooty-94.vercel.app`

## Demo Video
[![Watch the video](https://drive.google.com/uc?export=view&id=1fyNijA9OwNMBonxetOIYk7vxM3u1QotN)](https://youtu.be/5ZKF5c4-i14)

---

## 🛠 Tech Stack

- **Frontend:** React, React Router DOM, Axios, react-hot-toast  
- **Backend:** Node.js, Express, MongoDB (with Mongoose), Multer for file uploads, JWT for authentication  
- **Deployment:** (e.g., Vercel, Heroku, AWS – add if applicable)

---

## ✨ Features

- User authentication (register, login, logout, session validation via `/me`)
- Budget management (create, read, update, delete budgets)
- Transaction management (add, list, delete transactions; include via receipt upload)
- Monthly summaries and usage reports via API endpoints
- Category-based expense tracking with dynamic budgets
- Real-time UI updates via React Context API

---

## ⚡ Getting Started (Local Development)

### ✅ Prerequisites

- Node.js (v16+ recommended)  
- MongoDB (local or cloud)

### 📂 Setup

```bash
git clone https://github.com/VanshSama/Expense-Tracker.git
cd Expense-Tracker

# Install dependencies in both backend and frontend
cd server
npm install

cd ../client
npm install

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

cd server
npm run dev

cd client
npm run dev

### ✅📂 Folder Structure
Expense-Tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
└── server/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── utils/
    └── index.js (or server.js)

