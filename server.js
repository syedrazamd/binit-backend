// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your routes (make sure this file exists)
const complaintRoutes = require('./routes/complaints');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serves uploaded files

// MongoDB connection using Render environment variable
const MONGO_URI = process.env.MONGO_URI; // this must match your Render env variable

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/complaints', complaintRoutes); // your complaints routes

// Example root route (optional)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
