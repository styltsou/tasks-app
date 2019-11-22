const sharp = require('sharp');
const User = require('../models/userModel');
const email = require('../emails/account');

// @desc      Read personal profile data
// @route     GET /api/users/me
// @access    Private
const getUser = async (req, res) => {
  res.send(req.user);
}

// @desc      Update user profile
// @route     PATCH /api/users/me
// @access    Private
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send('error: Invalid updates!');
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
}

// @desc      Delete user profile
// @route     DELETE /api/users/me
// @access    Private
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    email.sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
}

// @desc      Upload or update profile picture
// @route     POST /api/users/me/avatar
// @access    Private
const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  req.user.avatar = buffer;
  await req.user.save();

  res.send();
}

// @desc      Get a user's avatar by userID
// @route     GET /api/users/:id/avatar
// @access    Public
const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('Unable to find user');
    } else if (!user.avatar) {
      throw new Error('Unable to find avatar');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send(error);
  }
}

// @desc      Delete profile picture
// @route     DELETE /api/users/me/avatar
// @access    Private
const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();

  res.send();
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getAvatar,
  deleteAvatar
};
