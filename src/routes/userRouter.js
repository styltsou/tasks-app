const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const errorMiddleware = require('../middleware/error');
const router = express.Router();

const userController = require('../controllers/userController');

// @route     /users/me
router
  .route('/me')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

// @route             /users/:id/avatar
// @request_param     id: user id
router.get('/:id/avatar', userController.getAvatar);

// @route     /users/me/avatar
router
  .route('/me/avatar')
  .post(
    auth,
    upload.single('avatar'),
    //errorMiddleware,
    userController.uploadAvatar
  )
  .delete(auth, userController.deleteAvatar);

module.exports = router;
