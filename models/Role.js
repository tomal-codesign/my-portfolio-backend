const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const roleSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'roles'
});

roleSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'role_seq', start_seq: 1 });

module.exports = mongoose.model('Role', roleSchema);
