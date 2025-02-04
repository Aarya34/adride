import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo'; 
import dotenv from 'dotenv';
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

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,  
      collectionName: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',  
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
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
