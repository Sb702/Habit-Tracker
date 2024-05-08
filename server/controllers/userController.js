const User = require('../models/usermodel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
    };

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
        res.status(404).send('No user found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
    };

// Add more controller methods as needed