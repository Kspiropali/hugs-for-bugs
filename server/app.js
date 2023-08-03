require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const project_dir = path.join(__dirname, "..");
const dbUtils = require("../database/index");
const students = require("../database/students");
const questions = require("../database/questions");

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(project_dir + "/client/res/"));
// Error-handling middleware for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Malformed json body!" });
  }
  next();
});

// If DEBUG=TRUE then we are in development mode
if (process.env.DEBUG === "true") {
  const logger = require("./logger");
  app.use(logger);
} else {
  const rateLimit = require("express-rate-limit");
  const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 30 * 1000, // half a minute in millis
    max: 1000,
    message: "You have exceeded the max requests in 1 minute limit time frame!",
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
  return res.send(students.students);
});

app.get("/admin/questions", (req, res) => {
  return res.send(questions);
});

// user login api via their name
app.post("/login", (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send("Name is needed!");
  }

  if (typeof name != "string") {
    return res.status(400).send("A valid string is needed!");
  }

  let status = dbUtils.findStudentByName(name);

  if (!status) {
    return res
      // .status(401)
      .send("Student's name does not exist in the database!");
  }

  return res
    .cookie("user", name, { maxAge: 900000, httpOnly: false })
    .send("Logged in!")
    .send();
});

// register a non-existent student
app.post("/register", (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send("Name is needed!");
  }

  if (typeof name != "string") {
    return res.status(400).send("A valid string is needed!");
  }
  
  let status = dbUtils.findStudentByName(name);

  if (status) {
    return res
      .status(403)
      .send("Student's name already exist in the database!");
  }

  const template = structuredClone(students.studentTemplate);
  template.name = name;
  students.students.push(template);

  return res.send(
    "User " + name + " has been successfully added in the database!"
  );
});

// random question api
// TODO: fix question being generated 2 times in a row
app.post("/question/random", (req, res) => {
  const jsonObj = dbUtils.generateRandomQuestion();
  return res.send(jsonObj);
});

// verify question api, TODO: should accept {username: username, question: question}
// should possibly return "Incorrect|Correct" with use cases handled
app.post("/question/verify", (req, res) => {
  let { name, question, answer } = req.body;

  if (!question) {
    return res.status(400).send("Name is needed!");
  }

  if (typeof question != "string") {
    return res.status(400).send("A valid string is needed!");
  }

  if (!answer) {
    return res.status(400).send("Name is needed!");
  }

  if (typeof answer != "string") {
    return res.status(400).send("A valid string is needed!");
  }

  if (!name) {
    return res.status(400).send("Name is needed!");
  }

  if (typeof name != "string") {
    return res.status(400).send("A valid string is needed!");
  }

  // check if name exists in database
  let status = dbUtils.findStudentByName(name);
  if (!status) {
    return res
      // .status(401)
      .send("Student's name does not exist in the database!");
  }

  let correctAnswer = dbUtils.findAnswerByQuestion(question);

  if (correctAnswer === "No such question in the database!") {
    return res.status(400).send("Question could not be found in the database!");
  }

  if (correctAnswer !== answer) {
    // increment name's wrongCounter +1
    dbUtils.changeStudentQuestionCounter(name, question, "wrong");
    return res.send("Incorrect!");
  }

  // increment name's correctCounter +1
  dbUtils.changeStudentQuestionCounter(name, question, "correct");
  return res.send("Correct!");
});

// calculates the points of students based on all questions answered
// Formula: 1 point of correctCounter is +1, 1 point of wrongCounter is -0.5
// returns an object of [{name: "studentName", points : "20pts"}, {}, {}]
app.post("/statistics/best", (req, res) => {
  return res.send(dbUtils.findBestStudent());
});

// endpoint to get the average points for all questions and calculate the average
// return [{topic: "topicname", questions: [{question: "what is 1+1", }, {} , {}]}, {}, {}]
app.post("/statistics/questions", (req, res) => {
  const studentName = req.body.name;

  if (
    !studentName ||
    studentName.length === 0 ||
    (typeof studentName !== String && !dbUtils.findStudentByName(studentName))
  ) {
    return res.status(400).send("Please provide a valid student name!");
  }

  return res.send(dbUtils.getStudentData(studentName));
});

module.exports = app;
