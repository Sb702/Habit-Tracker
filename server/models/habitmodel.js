const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
    complete: {
        type: Boolean,
        default: false
    },
    userid: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('habits', habitSchema);