const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');


// Get All Users
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users get successfully', users });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// CREATE
router.post('/user/create', authenticateToken, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// PUT User
router.put('/user/:id', authenticateToken, async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) }, // match using custom id
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// DELETE User
router.delete('/user/:id', authenticateToken, async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
