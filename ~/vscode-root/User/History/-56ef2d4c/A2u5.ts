import express from 'express';
import mongoose from 'mongoose';
import personRoutes from './routes/personRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ASGOLA:KksT585$@person.k26akme.mongodb.net/?retryWrites=true&w=majority&appName=PERSON';

app.use(express.json());

app.use('/api', personRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error('MongoDB connection error:', error));
