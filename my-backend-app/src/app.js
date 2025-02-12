import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import './config/passport.js';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adRoutes from './routes/adRoutes.js';
import wallAdRoutes from './routes/wallAdRoutes.js';
import autowalaRoutes from './routes/autowalaRoutes.js';
import helmetwalaRoutes from './routes/helmetwalaRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());  

app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/walls', wallAdRoutes);
app.use('/api/autowala', autowalaRoutes);
app.use('/api/helmetwala', helmetwalaRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'API is running...' });
});

app.use(notFound);
app.use(errorHandler);

export default app;
