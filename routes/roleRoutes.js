const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const authenticateToken = require('../middleware/auth');

// GET all roles
router.get('/roles', authenticateToken, async (req, res) => {
    try {
        const getRoles = await Role.find();
        const roles = getRoles.map(role => ({
            id: role.id,
            name: role.name,
            permissions: role.permissions
        }));
        res.status(200).json({ message: 'Roles fetched successfully', roles });
    } catch (err) {
        console.error('Error fetching roles:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// CREATE a new role
router.post('/role/create', authenticateToken, async (req, res) => {
    const { name, permissions } = req.body;
    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ error: 'Role name already exists' });
        }
        const role = await Role.create({ name, permissions });
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (err) {
        console.error('Error creating role:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// UPDATE a role
router.put('/role/:id', authenticateToken, async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json({ message: 'Role updated successfully', updatedRole });
    } catch (err) {
        console.error('Error updating role:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// DELETE a role
router.delete('/role/:id', authenticateToken, async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
        console.error('Error deleting role:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
