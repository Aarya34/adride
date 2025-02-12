import express from 'express';
import { isAuthenticated, isHelmetwala } from '../middlewares/automiddleware.js';
import { createHelmetwalaAd, getAllHelmetwalaAds, getMyHelmetwalaAds, editHelmetwalaAd, deleteHelmetwalaAd } from '../controllers/helmetwalaController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', isAuthenticated, isHelmetwala, upload.single('image'), createHelmetwalaAd);

router.get('/', getAllHelmetwalaAds);

router.get('/my-helmet', isAuthenticated, getMyHelmetwalaAds);


router.put('/edit/:id', isAuthenticated, isHelmetwala, upload.single('image'), editHelmetwalaAd);

router.delete('/delete/:id', isAuthenticated, isHelmetwala, deleteHelmetwalaAd);

export default router;