const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://bisignanosam:Tree123.@habits.cj2le9u.mongodb.net/Habits', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(error => console.error('Failed to connect to mongodb:', error));
};

module.exports = connectDB;