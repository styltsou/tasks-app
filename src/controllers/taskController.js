const Task = require('../models/taskModel');

// @desc      Create a new task
// @route     POST /api/tasks
// @access    Private
const addTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send();
  }
}

// @desc      Read all tasks
// @route     GET /api/tasks
// @queries   completed, limit, skip, sortBy
// @access    Private
const getTasks = async (req, res) => {
  const match = {};
  const sort = {};

  // Filter tasks
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  // Sort tasks
  if (req.query.sortBy) {
    const queryParts = req.query.sortBy.split(':');

    sort[queryParts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
}

// @desc      Read a task by id
// @route     GET /api/tasks/:id
// @access    Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
}

// @desc      Update a task by id
// @route     PATCH /api/tasks/:id
// @access    Private
const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send('error: Invalid update!');
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
}

// @desc      Delete a task by id
// @route     DELETE /api/tasks/:id
// @access    Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};
