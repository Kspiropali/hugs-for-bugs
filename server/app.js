require("dotenv").config();

const rateLimit = require("express-rate-limit");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const project_dir = path.join(__dirname, "..");
const dbUtils = require("../database/index");


app.use(cors());
app.use(express.json());

// If DEBUG=TRUE then we are in development mode
if (process.env.DEBUG === "true") {
  const logger = require("./logger");
  app.use(logger);
} else {
  const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 60 * 1000, // 1 minute in milliseconds
    max: 30,
    message: "You have exceeded the 30 requests in 1 minute limit!",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(rateLimiterUsingThirdParty);
}

app.get("/", (req, res) => {
  return res.sendFile(project_dir + "/client/index.html");
});

// user login api via their name
app.post("/login", (req, res) => {
  const name = req.body.name;

  if (!name || (name.length === 0 && typeof name != String)) {
    return res.status(400).send("Name is needed!");
  }

  let status = dbUtils.findStudentByName(name);

  if (!status) {
    return res
      .status(401)
      .send("Student's name does not exist in the database!");
  }

  return res
    .cookie("user", name, { maxAge: 900000, httpOnly: true })
    .json({ status: "Success", redirect: "/" })
    .send();
});

// random question api, TODO: fix question being generated 2 times in a row
app.post("/question", (req, res) => {
  return res.send({ question: dbUtils.generateRandomQuestion() });
});

// verify question api, TODO: should accept {username: username, question: question}
// should possibly return {outcome: "false || true", answer: answer}
app.post("/question/verify", (req, res) => {
  let { name, question, answer } = req.body;

  if (!question || (question.length === 0 && typeof question !== String)) {
    return res.status(400).send("Please provide a valid question!");
  }

  if (!answer || (answer.length === 0 && typeof answer !== String)) {
    return res
      .status(400)
      .send("Please provide a valid answer to the question!");
  }

  let correntAnswer = dbUtils.findAnswerByQuestion(question);

  if (correntAnswer === "No such question in the database!") {
    return res.status(400).send("Question could not be found in the database!");
  }

  if (correntAnswer !== answer) {
    // possible fail/success count to username's question in stats[]
    return res.send("Incorrect!");
  }

  return res.send("Correct!");
});

module.exports = app;
