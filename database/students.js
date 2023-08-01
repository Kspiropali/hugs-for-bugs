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
            correntCounter: 10,
            wrongCounter: 8,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correntCounter: 10,
            wrongCounter: 10,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correntCounter: 22,
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
            correntCounter: 13,
            wrongCounter: 7,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correntCounter: 1,
            wrongCounter: 2,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correntCounter: 2,
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
            correntCounter: 5,
            wrongCounter: 3,
          },
        ],
      },
      {
        topic: "physics",
        questions: [
          {
            question: "whats the temp of the sun",
            correntCounter: 12,
            wrongCounter: 5,
          },
        ],
      },
      {
        topic: "biology",
        questions: [
          {
            question: "How many bones in a human?",
            correntCounter: 8,
            wrongCounter: 12,
          },
        ],
      },
    ],
  },
];

module.exports = students;
