const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const portfolioSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    roleId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'portfolios'
});

portfolioSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'portfolio_seq', start_seq: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);