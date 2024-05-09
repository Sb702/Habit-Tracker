const Habit = require("../models/habitmodel");

exports.getHabits = async (req, res) => {
  try {
    console.log('Received userid: ', req.params.userid);
    const habits = await Habit.find({ userid: req.params.userid, date: req.params.date });
    console.log('habits: ', habits);
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.addHabit = async (req, res) => {
  try {
    const habit = new Habit({
      name: req.body.name,
      userid: req.body.userid,
    });
    const newHabit = await habit.save();
    res.json(newHabit);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (habit) {
      await habit.deleteOne();
      res.json({ message: "Habit removed" });
    } else {
      res.status(404).json({ message: "Habit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (habit) {
      habit.name = req.body.name;
      const updatedHabit = await habit.save();
      res.json(updatedHabit);
    } else {
      res.status(404).json({ message: "Habit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (habit) {
      habit.complete = req.body.complete;
      const updatedHabit = await habit.save();
      res.json(updatedHabit);
    } else {
      res.status(404).json({ message: "Habit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};