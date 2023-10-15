const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret } = require('../constants/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
