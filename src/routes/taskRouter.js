const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const taskController = require('../controllers/taskController');

// Set up authentication middleware
router.use(auth);

// @route     /tasks
router
  .route('/')
  .post(taskController.addTask)
  .get(taskController.getTasks);

// @route           /tasks/:id
// @request_param   id: user id
router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
