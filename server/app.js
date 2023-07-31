require("dotenv").config();
const path = require('path')


const express = require("express");
const cors = require("cors");
const project_dir = path.join(__dirname, '..');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.DEBUG === "true") {
  const logger = require("./logger");
  app.use(logger);
}

app.get("/", (req, res) => {
  res.sendFile(project_dir + "/client/index.html");
});

// user login api via their name
app.post("/login", (req, res) => {
  
});

// random question api, TODO: fix question being generated 2 times in a row
app.post("/question", (req, res) => {
  
});

// verify question api, TODO: should accept {username: username, question: question}
// should possibly return {outcome: "false || true", answer: answer}
app.post("/question/verify", (req, res) => {
  
});

module.exports = app;
