const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (password !== user.password) return res.status(401).json({ error: 'Invalid credentials' });

        const role = await Role.findOne({ id: user.roleId });

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                roleId: user.roleId,
                roleName: role.name || null,
            },
            process.env.JWT_SECRET,
            { expiresIn: '72h' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                roleId: user.roleId,
                roleName: role.name || null,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
