// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const Portfolio = require('./models/Portfolio');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', roleRoutes);
app.use('/api', portfolioRoutes);

async function resetPortfolioSequence() {
    const lastPortfolio = await Portfolio.findOne().sort({ id: -1 });
    const lastId = lastPortfolio ? lastPortfolio.id : 0;

    // Update mongoose-sequence counter in DB
    await mongoose.connection.collection('portfolio_seq').updateOne(
        { _id: 'portfolio_seq' },
        { $set: { seq: lastId } },
        { upsert: true }
    );

    console.log(`✅ Portfolio auto-increment reset to ${lastId}`);
}

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB Connected');
    await resetPortfolioSequence();

    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});
