const User = require('../models/userModel');
const email = require('../emails/account');

// @desc      Sing up user
// @route     POST /api/register
// @access    Public
const register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    email.sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.cookie('auth_token', token, { httpOnly: true, signed: true });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

// @desc      Login user
// @route     POST /api/login
// @access    Public
const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.cookie('auth_token', token, { httpOnly: true, signed: true });
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
}

// @desc      Logout user from current connected device
// @route     DELETE /api/logout
// @access    Private
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      //return token.token !== req.token;
      return token.token !== req.signedCookies['auth_token'];
    });

    await req.user.save();
    res.send();
  } catch (error) {
    response.status(500).send();
  }
}

// @desc      Logout user from all connected devices
// @route     DELETE /api/logoutAll
// @access    Private
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  register,
  login,
  logout,
  logoutAll
};
