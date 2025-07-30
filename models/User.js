const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: Number,
        min: [0, 'Age must be positive']
    }
}, {
    timestamps: true, // adds createdAt and updatedAt
    collection: 'users' // optional, just to make it clear
});

const User = mongoose.model('User', userSchema);

module.exports = User;
