const User = require("../database/models/User");

const emailToLowerCase = (req, res, next) => {
  if (req.body.email) req.body.email = req.body.email.toLowerCase();

  next();
};

const findUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  req.body.user = user;
  next();
};

module.exports = { emailToLowerCase, findUserByEmail };
