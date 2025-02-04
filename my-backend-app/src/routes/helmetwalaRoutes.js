import express from 'express';
import { isAuthenticated, isHelmetwala } from '../middlewares/automiddleware.js';
import { createHelmetwalaAd, getAllHelmetwalaAds } from '../controllers/helmetwalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isHelmetwala, upload.single('image'), createHelmetwalaAd);
router.get('/', getAllHelmetwalaAds);

export default router;
