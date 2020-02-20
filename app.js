const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

// create our application
const app = express();

// api/messages routes
const messagesRoutes = require("./routing/messages.routes");

// api/auth routes
const authRoutes = require("./routing/authorization.routes");

app.use(express.json({ extended: true }));

app.use("/api/messages", messagesRoutes);

app.use("/api/auth", authRoutes);

// server port
const PORT = config.get("port") || 3333;

// mongodb URI
const MONGOURI = config.get("mongoURI");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "web-client", "build")));
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "web-client", "build", "index.html"));
  });
}
// connecting to data base and run server
async function runServerWithDB() {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    //start server listerning PORT
    app.listen(PORT, () => console.log(`Server is on port ${PORT}`));
  } catch (e) {
    console.log("Data base connection error:", e.message);
    process.exit(1);
  }
}

runServerWithDB();
