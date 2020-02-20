const textRegExp = require("../regexp/text.regexp");

const listNumberValidator = (req, res, next) => {
  const hasNotADigitRegExp = /\D/;
  const beginsFromZeroRegExp = /^0/;
  const { num } = req.params;
  const hasNoNDigits = hasNotADigitRegExp.test(num);

  //number like 0123
  const isNumberBeginsFromZero =
    num.length > 1 && beginsFromZeroRegExp.test(num);

  if (hasNoNDigits || isNumberBeginsFromZero) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

const messageIdValidator = (req, res, next) => {
  const regExp = /[^a-z0-9]/;
  const { id } = req.params;
  const check = regExp.test(id);
  if (check) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

const messageTextValidation = (req, res, next) => {
  const { text } = req.body;
  const dryText = text.trim();
  if (!textRegExp.test(dryText)) {
    return res.status(400).json({ message: "Invalid message text" });
  }

  next();
};

module.exports = {
  listNumberValidator,
  messageIdValidator,
  messageTextValidation,
};
