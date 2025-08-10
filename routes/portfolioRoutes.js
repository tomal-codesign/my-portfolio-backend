const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authenticateToken = require('../middleware/auth');

// GET all portfolios
router.get('/portfolios', authenticateToken, async (req, res) => {
    try {
        const getPortfolios = await Portfolio.find();
        const portfolios = getPortfolios.map(portfolio => ({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            imageUrl: portfolio.imageUrl,
            link: portfolio.link,
            userId: portfolio.userId,
        }));
        res.status(200).json({ message: 'Portfolios fetched successfully', portfolios });
    } catch (err) {
        console.error('Error fetching portfolios:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// get UserId wise portfolios
router.get('/portfolios/:id', authenticateToken, async (req, res) => {
    try {
        const getPortfolios = await Portfolio.find({ userId: req.params.id });
        const portfolios = getPortfolios.map(portfolio => ({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            imageUrl: portfolio.imageUrl,
            link: portfolio.link,
            userId: portfolio.userId,
        }));
        res.status(200).json({ message: 'Portfolios fetched successfully', portfolios });
    } catch (err) {
        console.error('Error fetching portfolios:', err.message);
        res.status(500).json({ error: err.message });
    }
});

//get without authenticatetoken UserId wise portfolios
router.get('/public/portfolios/:id', async (req, res) => {
    try {
        const getPortfolios = await Portfolio.find({ userId: req.params.id });
        const portfolios = getPortfolios.map(portfolio => ({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            imageUrl: portfolio.imageUrl,
            link: portfolio.link,
            userId: portfolio.userId,
        }));
        res.status(200).json({ message: 'Portfolios fetched successfully', portfolios });
    } catch (err) {
        console.error('Error fetching portfolios:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// get without authenticatetoken get single portfolios
router.get('/public/portfolio/:id', async (req, res) => {
    try {
        const getPortfolio = await Portfolio.findOne({ id: req.params.id });
        res.status(200).json({ message: 'Portfolio fetched successfully', portfolio: getPortfolio });
    } catch (err) {
        console.error('Error fetching portfolio:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// CREATE a new portfolio
router.post('/portfolio/create', authenticateToken, async (req, res) => {
    const { title, description, imageUrl, link, userId } = req.body;
    try {
        const newPortfolio = await Portfolio.create({ title, description, imageUrl, link, userId });
        res.status(201).json({ message: 'Portfolio created successfully', portfolio: newPortfolio });
    } catch (err) {
        console.error('Error creating portfolio:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// UPDATE a portfolio
router.put('/portfolio/:id', authenticateToken, async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { id: req.params.id }, // match your auto-increment id
            req.body,
            { new: true }
        );
        if (!updatedPortfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.status(200).json({ message: 'Portfolio updated successfully', portfolio: updatedPortfolio });
    } catch (err) {
        console.error('Error updating portfolio:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// DELETE a portfolio
router.delete('/portfolio/:id', authenticateToken, async (req, res) => {
    try {
        const deletedPortfolio = await Portfolio.findOneAndDelete({ id: req.params.id });
        if (!deletedPortfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (err) {
        console.error('Error deleting portfolio:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
