import express from 'express';
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';
import { createAd, getAds, getMyAds, editAd, deleteAd } from '../controllers/adController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, hasRole('advertiser'), upload.single('image'), createAd);

router.get('/', getAds);

router.get('/my-ads', isAuthenticated, hasRole('advertiser'), getMyAds);

router.put('/edit/:id', isAuthenticated, hasRole('advertiser'), upload.single('image'), editAd);

router.delete('/delete/:id', isAuthenticated, hasRole('advertiser'), deleteAd);

export default router;
