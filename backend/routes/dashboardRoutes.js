import express from 'express';
import getDashboardStats from '../controllers/dashboardController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getDashboardStats);

export default router;