const Task = require("../models/Task");

// CREATE
const createTask = async (req, res) => {
  try {

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      user: req.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// READ (all tasks for user)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
