const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
    complete: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
        }
    },
    userid: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('habits', habitSchema);