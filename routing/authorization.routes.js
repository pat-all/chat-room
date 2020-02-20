const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();

const User = require("../database/models/User");

//validation middlewares
const {
  passwordsMatchValidator,
  emailShouldNotExistsValidator,
  usernameShouldNotExistsValidator,
  loginValidator,
  emailValidator,
  passwordValidator,
} = require("../middlewares/auth.validation.middwares");

const { emailToLowerCase } = require("../middlewares/servise.middlewares");

router.post(
  "/register",
  [
    emailToLowerCase,
    emailValidator,
    passwordValidator,
    passwordsMatchValidator,
    emailShouldNotExistsValidator,
    usernameShouldNotExistsValidator,
  ],
  async (req, res) => {
    try {
      const { email, password, username } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });

      await newUser.save();
      console.log("new User:", newUser);

      res
        .status(201)
        .json({ message: "user was created successfully", data: newUser });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Error! we have some problems" });
    }
  }
);

router.post(
  "/login",
  [emailToLowerCase, emailValidator, passwordValidator, loginValidator],
  async (req, res) => {
    try {
      const { user } = req.body;

      const secret = config.get("secret");
      const token = jwt.sign(
        { userId: user.id, password: user.password },
        secret,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "Login success", data: { token, user } });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Error! we have some problems" });
    }
  }
);

module.exports = router;
