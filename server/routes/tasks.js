const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status } },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/toggle/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;