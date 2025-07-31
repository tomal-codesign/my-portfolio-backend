const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
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
    profileImg: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
    collection: 'users' // optional, just to make it clear
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
