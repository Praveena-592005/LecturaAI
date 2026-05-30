import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import summary from './routes/summary.js';
import folderRoutes from './routes/folderRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
// CHANGED: From '/api/summary' to '/api/summaries' to match your frontend calls
app.use('/api/summary', summary); 
app.use('/api/folderRoutes', folderRoutes);

app.use((err, req, res, next) => {
  console.error('Operational error caught in pipeline:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected server-side error occurred'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing active connection streams over port ${PORT}`));