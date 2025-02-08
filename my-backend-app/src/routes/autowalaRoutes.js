import express from 'express';
import { isAuthenticated, isAutowala } from '../middlewares/automiddleware.js';
import { createAutowalaAd, getAllAutowalaAds, editAutowalaAd, deleteAutowalaAd } from '../controllers/autowalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAutowala, upload.single('image'), createAutowalaAd);

router.get('/', getAllAutowalaAds);

router.put('/edit/:id', isAuthenticated, isAutowala, upload.single('image'), editAutowalaAd);

router.delete('/delete/:id', isAuthenticated, isAutowala, deleteAutowalaAd);

export default router;
