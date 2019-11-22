const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const authController = require('../controllers/authController');

// Sign up
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Log out
router.delete('/logout', auth, authController.logout);

// Log out from all devices
router.delete('/logoutAll', auth, authController.logoutAll);

module.exports = router;
