import express from 'express';
import { isAuthenticated, isWallOwner } from '../middlewares/wallOwnerMiddleware.js';
import { createWallAd, getAllWallAds, getMyWallAds, editWallAd, deleteWallAd } from '../controllers/wallAdController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isWallOwner, upload.single('image'), createWallAd);
router.get('/', getAllWallAds);
router.get('/my-walls', isAuthenticated, isWallOwner, getMyWallAds);
router.put('/edit/:id', isAuthenticated, isWallOwner, upload.single('image'), editWallAd);
router.delete('/delete/:id', isAuthenticated, isWallOwner, deleteWallAd);

export default router;
