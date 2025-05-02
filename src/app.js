const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeDatabase } = require('./database');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Initialize database
initializeDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Secure API with JWT' });
});

module.exports = app;
