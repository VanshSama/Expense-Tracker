import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import auth from './middleware/authMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: [
    "https://expense-tracker-three-sooty-94.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', auth, transactionRoutes);
app.use('/api/budgets', auth, budgetRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is Up",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
