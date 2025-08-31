const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const authenticateToken = require('../middleware/auth');


// Get All Users
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const userList = await User.find();
        const users = await Promise.all(userList.map(async user => {
            const role = await Role.findOne({ id: user.roleId });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                roleId: role.id,
                roleName: role.name,
                password: user.password
            };
        }));
        res.status(200).json({ message: 'Users get successfully', users });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET User by ID
router.get('/user/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// CREATE
router.post('/user/create', authenticateToken, async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const role = await Role.findOne({ id: roleId });
        if (!role) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }
        console.log(role);
        const user = await User.create({
            name,
            email,
            password,
            roleId: role.id
        });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// PUT User
router.put('/user/:id', authenticateToken, async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.roleId) {
            const role = await Role.findOne({ id: updateData.roleId });
            if (!role) {
                return res.status(400).json({ error: 'Invalid role ID' });
            }
        }
        const updatedUser = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) }, // match using custom id
            req.body,
            { new: true }
        );
        console.log(req.body);
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
