// index.js
import express from 'express';
import { registerEntry, registerExit, getPeopleInside, getPeopleByDate, getAnalytics } from './controllers';
import authenticate from '../../auth';

const app = express();

app.use(express.json());

// Unprotected routes
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'API is up and running' });
});

// Protected routes
app.post('/register-entry', authenticate, registerEntry);
app.post('/register-exit', authenticate, registerExit);
app.get('/people-inside', authenticate, getPeopleInside);
app.post('/people-by-date', authenticate, getPeopleByDate);
app.get('/analytics', authenticate, getAnalytics);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});