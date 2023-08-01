require("dotenv").config();

const rateLimit = require("express-rate-limit");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const project_dir = path.join(__dirname, "..");
const dbUtils = require("../database/index");
const students = require("../database/students");
const questions = require("../database/questions");

app.use(cors());
app.use(express.json());
app.use(express.static(project_dir + "/client/res/"));

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

app.get("/question", (req, res) => {
  return res.sendFile(project_dir + "/client/questions.html");
});

app.get("/admin/students", (req, res) => {
  return res.send(students);
});

app.get("/admin/questions", (req, res) => {
  return res.send(questions);
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
    .cookie("user", name, { maxAge: 900000, httpOnly: false })
    .json({ status: "Success", redirect: "/" })
    .send();
});

// random question api, TODO: fix question being generated 2 times in a row
app.post("/question/random", (req, res) => {
  const jsonObj = dbUtils.generateRandomQuestion();
  return res.send(jsonObj);
});

// verify question api, TODO: should accept {username: username, question: question}
// should possibly return {outcome: "false || true", answer: answer}
app.post("/question/verify", (req, res) => {
  let { name, question, answer } = req.body;
  console.log(req.body);

  if (!question || (question.length === 0 && typeof question !== String)) {
    return res.status(400).send("Please provide a valid question!");
  }

  if (!answer || (answer.length === 0 && typeof answer !== String)) {
    return res
      .status(400)
      .send("Please provide a valid answer to the question!");
  }

  if (!name || (name.length === 0 && typeof name !== String)) {
    return res.status(400).send("Please provide a valid username!");
  }

  // check if name exists in database
  let status = dbUtils.findStudentByName(name);
  if (!status) {
    return res
      .status(401)
      .send("Student's name does not exist in the database!");
  }

  let correctAnswer = dbUtils.findAnswerByQuestion(question);

  if (correctAnswer === "No such question in the database!") {
    return res.status(400).send("Question could not be found in the database!");
  }

  if (correctAnswer !== answer) {
    // increment name's wrongCounter +1
    dbUtils.changeStudentQuestionCounter(name, question, "wrong")
    return res.send("Incorrect!");
  }

  // TODO: increment name's correctCounter +1
  dbUtils.changeStudentQuestionCounter(name, question, "correct")
  return res.send("Correct!");
});

// TODO: calculate points of students based on all questions answered(if not answered, skip)
// Formula: 1 point of correctCounter is +1, 1 point of wrongCounter is -0.5
// returns an object of [{name: "studentName", points : "20pts"}, {}, {}]

// endpoint to get the average points for all questions and calculate the average
// return [{topic: "topicname", questions: [{}, {} , {}]}, {}, {}]

module.exports = app;
