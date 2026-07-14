
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const companyRoutes = require('./src/routes/companyRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - Allow frontend URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://bridgehub.vercel.app',
  'https://bridgehub-git-main-brmwita.vercel.app',
  'https://bridgehub-brmwita.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // Allow all in development
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/companies', companyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'BridgeHub API is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 BridgeHub Backend running on http://localhost:${PORT}`);
      console.log(`📊 Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();