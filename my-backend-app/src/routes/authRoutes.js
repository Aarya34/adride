import express from 'express';
import { register, login, logout, getProfile, forgotPassword, resetPassword } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuthenticated, getProfile);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
