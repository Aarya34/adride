import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adRoutes from './routes/adRoutes.js';
import { isAuthenticated, hasRole } from './middlewares/authMiddleware.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
import wallAdRoutes from './routes/wallAdRoutes.js';
import autowalaRoutes from './routes/autowalaRoutes.js';
import helmetwalaRoutes from './routes/helmetwalaRoutes.js';

const app = express();

connectDB();
dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
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