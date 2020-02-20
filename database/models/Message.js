const { Schema, model, Types } = require("mongoose");

const { emailRegExp } = require("../../regexp/email.regexp");

const schema = new Schema({
  author: { type: String, minlength: 1, required: true },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 99,
    minlength: 1,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: emailRegExp,
    ref: "User",
  },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
});

module.exports = model("Message", schema);
