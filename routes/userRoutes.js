const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE
router.post('/user/create', async (req, res) => {
    try {
        const user = await User.create(req.body); // define user first
        console.log('User created:', user); // now you can log it
        res.status(201).json(user);
    } catch (err) {
         console.error('Error creating user:', err.message);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
