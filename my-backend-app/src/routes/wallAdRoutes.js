import express from 'express';
import { createWallAd, getAllWallAds, getMyWallAds, editWallAd, deleteWallAd } from '../controllers/wallAdController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), createWallAd); 
router.get('/', getAllWallAds);
router.get('/my-walls', getMyWallAds); 
router.put('/edit/:id', upload.single('image'), editWallAd); 
router.delete('/delete/:id', deleteWallAd); 

export default router;
