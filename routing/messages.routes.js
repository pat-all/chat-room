const { Router } = require("express");
const config = require("config");

const router = Router();

const { findUserByEmail } = require("../middlewares/servise.middlewares");

const Message = require("../database/models/Message");

const {
  listNumberValidator,
  messageIdValidator,
  messageTextValidation,
} = require("../middlewares/req.validation.middlewares");

router.get("/list/:num", [listNumberValidator], async (req, res) => {
  try {
    const { num } = req.params;
    const messagesOnList = config.get("messagesOnList");
    const firstMessageNum = num * messagesOnList;
    const resultList = [];
    const messages = await Message.find();
    if (firstMessageNum > messages.length) {
      res.json({ message: "we haven't so much messages" });
    } else {
      for (
        let i = firstMessageNum;
        i < messages.length && i < firstMessageNum + messagesOnList;
        i++
      ) {
        const message = messages[i];
        resultList.push(message);
      }
    }
    res.status(200).json({
      message: `messages from ${firstMessageNum + 1} to ${
        messages.length >= firstMessageNum + messagesOnList
          ? firstMessageNum + messagesOnList
          : messages.length
      }`,
      data: resultList,
    });
  } catch (e) {
    res.status(500).json({ message: "Error! we have some problems" });
  }
});

router.get("/single/:id", [messageIdValidator], async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      res.status(400).json({ message: "Not Found" });
    }

    res.status(200).json({ message: "received message", data: message });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Error! we have some problems" });
  }
});

router.post(
  "/single",
  [findUserByEmail, messageTextValidation],
  async (req, res) => {
    try {
      const { user, text } = req.body;
      const timeStamp = Date.now();
      let message;
      if (user) {
        message = new Message({
          author: user.username,
          email: user.email,
          text,
          created: timeStamp,
          updated: timeStamp,
        });
        user.messages.push(message);
        await user.save();
      } else {
        message = new Message({
          author: "unauthenticated",
          text,
          created: timeStamp,
          updated: timeStamp,
        });
      }
      await message.save();
      res
        .status(201)
        .json({ message: "message was created successfully", data: message });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Error! we have some problems" });
    }
  }
);

router.put("/single", [messageTextValidation], async (req, res) => {
  try {
    const { id, text } = req.body;
    const message = await Message.findById(id);
    if (message) {
      message.text = text;
      message.updated = Date.now();
      await message.save();
      res.status(200).json({ message: "message was updeted", data: message });
    } else {
      res.status(400).json({ message: "updating fail" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Error! we have some problems" });
  }
});

router.delete("/single", [messageIdValidator], async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Message.deleteOne({ _id: id });
    res.status(200).json({
      message: `deleted ${deleted.n} messages`,
      data: { count: deleted.n },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Error! we have some problems" });
  }
});

module.exports = router;
