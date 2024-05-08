const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/Habits', habitController.getHabits);
router.post('/Habits', habitController.addHabit);
router.delete('/Habits/:id', habitController.deleteHabit);
router.patch('/Habits/:id', habitController.updateHabit);

module.exports = router;