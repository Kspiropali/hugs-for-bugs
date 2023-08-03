const questions_db = require("./questions");

let studentTemplate = {
    name: "",
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
let students = [];

module.exports = {students, studentTemplate};
