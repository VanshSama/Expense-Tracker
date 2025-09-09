import express from 'express';
import multer from 'multer';
import { 
    addTransaction,
    getTransactions,
    getMonthlySummary,
    getMonthlyIncomeExpenseSummary,
} from '../controllers/transactionController.js';
import auth from '../middleware/authMiddleware.js';
import {addTransactionFromFile} from '../controllers/addTransactionFromFile.js';

const router = express.Router();
const upload=multer({storage: multer.memoryStorage()});

// Route to handle file upload and add transactions from file
router.post('/upload', auth, upload.single('file'), addTransactionFromFile);

router.route('/').post(auth, addTransaction);
router.route('/').get(auth, getTransactions);
router.route('/summary/:year/:month').get(auth, getMonthlySummary);
router.get('/monthly-summary', auth, getMonthlyIncomeExpenseSummary);

export default router;
