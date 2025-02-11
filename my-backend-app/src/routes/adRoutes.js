import express from 'express';
import { createAd, getAds, getMyAds, editAd, deleteAd } from '../controllers/adController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), createAd);
router.get('/', getAds);
router.get('/my-ads', getMyAds);
router.put('/edit/:id', upload.single('image'), editAd);
router.delete('/delete/:id', deleteAd);

export default router;
