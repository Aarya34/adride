import express from 'express';
import { register, login, logout, getProfile, editProfile,  forgotPassword, resetPassword, googleAuth, facebookAuth, twitterAuth,getAllUsers,changeUserStatusActive,changeUserStatusInactive} from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',getAllUsers);
router.put('/:id/active',changeUserStatusActive);
router.put('/:id/inactive',changeUserStatusInactive);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuthenticated, getProfile);
router.put('/edit-profile', isAuthenticated, editProfile);  
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/google', googleAuth); 
router.get('/facebook', facebookAuth); 
router.get('/twitter', twitterAuth); 

export default router;
