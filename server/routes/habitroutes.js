const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const userController = require('../controllers/userController');

router.get('/Habits/:userid/:date', habitController.getHabits);
router.post('/Habits', habitController.addHabit);
router.delete('/Habits/:id', habitController.deleteHabit);
router.patch('/Habits/:id', habitController.updateHabit);
router.put('/Habits/:id', habitController.completeHabit);

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/login', userController.loginUser);

module.exports = router;