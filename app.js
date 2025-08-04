// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', roleRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});
