import express from 'express';
import { isAuthenticated, isAutowala } from '../middlewares/automiddleware.js';
import { createAutowalaAd, getAllAutowalaAds } from '../controllers/autowalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAutowala, upload.single('image'), createAutowalaAd);
router.get('/', getAllAutowalaAds);

export default router;
