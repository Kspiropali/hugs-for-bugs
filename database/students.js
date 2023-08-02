const questions_db = require('./questions');

const student1Stats = {
  name: "John",
  stats: [
    {
      topic: "music",
      questions: questions_db[0].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "art",
      questions: questions_db[1].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "history",
      questions: questions_db[2].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
  ],
};

const student2Stats = {
  name: "Mark",
  stats: [
    {
      topic: "music",
      questions: questions_db[0].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "art",
      questions: questions_db[1].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "history",
      questions: questions_db[2].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
  ],
};

const student3Stats = {
  name: "Mark",
  stats: [
    {
      topic: "music",
      questions: questions_db[0].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "art",
      questions: questions_db[1].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "history",
      questions: questions_db[2].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
  ],
};

const student4Stats = {
  name: "George",
  stats: [
    {
      topic: "music",
      questions: questions_db[0].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "art",
      questions: questions_db[1].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "history",
      questions: questions_db[2].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
  ],
};

const student5Stats = {
  name: "Nick",
  stats: [
    {
      topic: "music",
      questions: questions_db[0].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "art",
      questions: questions_db[1].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
    {
      topic: "history",
      questions: questions_db[2].questions.map((question) => ({
        question: question.question,
        correctCounter: 0,
        wrongCounter: 0,
      })),
    },
  ],
};

// database for students
let students = [student1Stats, student2Stats, student3Stats, student4Stats, student5Stats];

module.exports = students;
