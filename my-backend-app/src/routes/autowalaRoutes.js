import express from 'express';
import { isAuthenticated, isAutowala } from '../middlewares/automiddleware.js';
import { createAutowalaAd, getAllAutowalaAds,getMyAutowalaAds, editAutowalaAd, deleteAutowalaAd, getMyAutowalaAds } from '../controllers/autowalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAutowala, upload.single('image'), createAutowalaAd);
router.get('/', getAllAutowalaAds);
router.get('/my-auto', isAuthenticated, getMyAutowalaAds);
router.put('/edit/:id', isAuthenticated, isAutowala, upload.single('image'), editAutowalaAd);
router.delete('/delete/:id', isAuthenticated, isAutowala, deleteAutowalaAd);


export default router;
