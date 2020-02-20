const { Schema, model, Types } = require("mongoose");

const { emailRegExp } = require("../../regexp/email.regexp");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: emailRegExp,
  },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  messages: [{ type: Types.ObjectId, ref: "Message" }],
});

module.exports = model("User", schema);
