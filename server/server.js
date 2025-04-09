const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const { redirectToUrl } = require('./controllers/linkController');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-url.vercel.app' 
    : 'http://localhost:5173'
}));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

// Redirect route for short URLs
app.get('/:shortUrl', redirectToUrl);

// Set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
