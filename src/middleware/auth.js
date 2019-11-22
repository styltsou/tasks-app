const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    const token = req.signedCookies['auth_token'];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decodedToken._id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('error: Please authenticate');
  }
};

module.exports = auth;
