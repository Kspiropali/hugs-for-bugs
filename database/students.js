// database for students
let students = [
  {
    name: "Test",
    school: "LFA",
    stats: [
      {
        topic: "maths",
        questions: [
          {
            question: "what is 1+1",
            correctCounter: 10,
            wrongCounter: 8,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correctCounter: 10,
            wrongCounter: 10,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correctCounter: 22,
            wrongCounter: 11,
          },
        ],
      },
    ],
  },
  {
    name: "John",
    school: "LFA",
    stats: [
      {
        topic: "maths",
        questions: [
          {
            question: "what is 1+1",
            correctCounter: 13,
            wrongCounter: 7,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correctCounter: 1,
            wrongCounter: 2,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correctCounter: 2,
            wrongCounter: 8,
          },
        ],
      },
    ],
  },
  {
    name: "Nick",
    school: "LFA",
    stats: [
      {
        topic: "maths",
        questions: [
          {
            question: "what is 1+1",
            correctCounter: 5,
            wrongCounter: 3,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correctCounter: 12,
            wrongCounter: 5,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correctCounter: 8,
            wrongCounter: 12,
          },
        ],
      },
    ],
  },
];

module.exports = students;
