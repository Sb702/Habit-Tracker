const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('habits', habitSchema);