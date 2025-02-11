import express from 'express';
import { createAutowalaAd, getAllAutowalaAds, editAutowalaAd, deleteAutowalaAd } from '../controllers/autowalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), createAutowalaAd);
router.get('/', getAllAutowalaAds);
router.put('/edit/:id', upload.single('image'), editAutowalaAd);
router.delete('/delete/:id', deleteAutowalaAd);

export default router;
