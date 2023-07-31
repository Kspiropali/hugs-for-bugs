require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

const project_dir = path.join(__dirname, "..");
const dbUtils = require("../database/index");

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
  const name = req.body.name;

  if (!name || name.length === 0) {
    res.status(400).send("Name is needed!");
    return;
  }

  let status = dbUtils.findStudentByName(name);
  console.log(status);
  if (!status) {
    res.status(401).send("Student's name does not exist in the database!");
    return;
  }

  res
    .cookie("user", name, { maxAge: 900000, httpOnly: true })
    .json({ status: "Success", redirect: "/" })
    .send();
});

// random question api, TODO: fix question being generated 2 times in a row
app.post("/question", (req, res) => {});

// verify question api, TODO: should accept {username: username, question: question}
// should possibly return {outcome: "false || true", answer: answer}
app.post("/question/verify", (req, res) => {});

module.exports = app;
