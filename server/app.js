require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

if (process.env.DEBUG) {
  const logger = require("./logger");
  app.use(logger);
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

module.exports = app;
