import express from 'express';
import mongoose from 'mongoose';
import type { ConnectOptions } from 'mongoose';
import personRoutes from './routes/personRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', personRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error('MongoDB connection error:', error));
