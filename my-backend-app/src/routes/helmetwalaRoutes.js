import express from 'express';
import { createHelmetwalaAd, getAllHelmetwalaAds, editHelmetwalaAd, deleteHelmetwalaAd } from '../controllers/helmetwalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), createHelmetwalaAd);
router.get('/', getAllHelmetwalaAds);
router.put('/edit/:id', upload.single('image'), editHelmetwalaAd);
router.delete('/delete/:id', deleteHelmetwalaAd);

export default router;
