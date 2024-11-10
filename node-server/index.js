// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {dbName: 'sankalp'})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/auth', require("./routes/auth"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
