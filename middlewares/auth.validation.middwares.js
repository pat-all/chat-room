const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

const { emailRegExp } = require("../regexp/email.regexp");
const { passwordRegExp } = require("../regexp/password.regexp");

const passwordsMatchValidator = (req, res, next) => {
  const { password, confirmpassword } = req.body;
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords does not match" });
  }

  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password || !passwordRegExp.test(password)) {
    return res.status(400).json({ message: "Bad password" });
  }

  next();
};

const emailShouldNotExistsValidator = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email is already used" });
  }

  next();
};

const usernameShouldNotExistsValidator = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username is already used" });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Wrong combination of email and password." });
    } else {
      req.body.user = user;
    }
  } else {
    return res.status(400).json({ message: "User was not found" });
  }

  next();
};

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  const check = emailRegExp.test(email);
  if (!check) {
    return res.status(400).json({ message: "Bad email address" });
  }

  next();
};

module.exports = {
  passwordsMatchValidator,
  passwordValidator,
  emailShouldNotExistsValidator,
  usernameShouldNotExistsValidator,
  loginValidator,
  emailValidator,
};
