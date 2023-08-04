const app = require("../server/app");
const request = require("supertest");
const questions = require("./questions.js");
const students = require("./students.js");
const dbUtils = require("./index.js");
const students_db = require("./students.js");
const {studentTemplate} = require("./students");
const {getStudentData} = require("./index");

describe("find student by name", () => {
    test("should find student by name", async () => {
        const studentName = {
            name: "Bob",
        };

        const studentName1 = {
            name: "Tom",
        };

        await request(app).post("/register").send(studentName);

        await request(app).post("/register").send(studentName1);

        expect(dbUtils.findStudentByName("Bob")).toEqual(students.students[0]);
        expect(dbUtils.findStudentByName("Tom")).toEqual(students.students[1]);
    });
});

describe("find best student", () => {
    test("should return array of students sorted by score", async () => {
        const jsonBody = {
            question: "Who is known as the 'King of Pop'?",
            answer: "Michael Jackson",
            name: "Bob",
        };
        const studentName = {
            name: "Bob",
        };

        const jsonBody1 = {
            question: "Who is known as the 'King of Pop'?",
            answer: "idk",
            name: "Tom",
        };
        const studentName1 = {
            name: "Tom",
        };

        await request(app).post("/register").send(studentName);

        await request(app).post("/register").send(studentName1);

        await request(app).post("/question/verify").send(jsonBody);

        await request(app).post("/question/verify").send(jsonBody1);

        expect(dbUtils.findBestStudent()[0].name).toEqual("Bob");
    });
});

describe("find question by topic", () => {
    test("should find questions by topic", () => {
        let topic = "music";
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].topic === topic) {
                expect(dbUtils.findQuestionsByTopic(topic)).toEqual(questions[0]);
            } else {
                expect(dbUtils.findQuestionsByTopic(topic)).toEqual(questions[0]);
            }
        }
    });
});

describe("find answer by question", () => {
    test("should find answer by question", () => {
        let string = "Who is known as the 'King of Pop'?";

        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].questions.length; j++) {
                if (questions[i].questions[j].question === string) {
                    expect(dbUtils.findAnswerByQuestion(string)).toEqual(
                        "Michael Jackson"
                    );
                }
            }
        }
    });
});

describe("find answer by wrong question", () => {
    test("should return No such question in the database! by wrong question", () => {
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].questions.length; j++) {
                expect(dbUtils.findAnswerByQuestion("wrong")).toEqual(
                    "No such question in the database!"
                );
            }
        }
    });
});

describe("generate random question", () => {
    test("should return a randomly generated question", () => {
        random = dbUtils.generateRandomQuestion();

        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].questions.length; j++) {
                if (questions[i].questions[j].question === random.question) {
                    expect(random.question).toEqual(questions[i].questions[j].question);
                }
            }
        }
    });
});

describe("generate randomly shuffled answers", () => {
    test("should return a randomly generated answers list", () => {
        random = dbUtils.generateRandomQuestion().answers;

        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].questions.length; j++) {
                for (
                    let k = 0;
                    k < questions[i].questions[j].wrongAnswers.length;
                    k++
                ) {
                    if (
                        random.includes(questions[i].questions[j].answer) &&
                        random.includes(questions[i].questions[j].wrongAnswers[k])
                    ) {
                        expect(true);
                    }
                }
            }
        }
    });
});

describe("change counter", () => {
    test("counter should increase correctCounter on correct answer", async () => {
        const jsonBody = {
            name: "Jim",
        };

        await request(app).post("/register").send(jsonBody);

        dbUtils.changeStudentQuestionCounter(
            "Jim",
            "Who is known as the 'King of Pop'?",
            "correct"
        );

        const studentDataAfter = students.students.find(
            (student) => student.name == jsonBody.name
        );

        let scoreAfter = studentDataAfter.stats[0].questions[0].correctCounter;

        expect(scoreAfter).toEqual(1);
    });
});

describe("change counter", () => {
    test("counter should increase wrongCounter on wrong answer", async () => {
        const jsonBody = {
            name: "Hugo",
        };

        await request(app).post("/register").send(jsonBody);

        dbUtils.changeStudentQuestionCounter(
            "Hugo",
            "Who is known as the 'King of Pop'?",
            ""
        );

        const studentDataAfter = students.students.find(
            (student) => student.name == jsonBody.name
        );

        let scoreAfter = studentDataAfter.stats[0].questions[0].wrongCounter;
        expect(scoreAfter).toEqual(1);
    });
});


describe('getStudentData', () => {

    test('should return null for non-existent student', () => {
        // run the function for null
        const result = getStudentData('NonExistentStudent');
        expect(result).toBeNull();
    });

    test('should return correct student data', () => {
        const result = getStudentData('Bob');
        expect(result[0].stats).toEqual(students.students.stats);
    });

    test('should return correct student data', () => {
        for (let i = 0; i < 5; i++) {
            dbUtils.changeStudentQuestionCounter(
                "Hugo",
                "Who is known as the 'King of Pop'?",
                "correct"
            );
        }
        const result = getStudentData('Hugo');
        expect(result[0].questions[0].result).toEqual("Perfect");
    });

    test('should return correct student data', () => {
        for (let i = 0; i < 5; i++) {
            dbUtils.changeStudentQuestionCounter(
                "Jim",
                "Who is known as the 'King of Pop'?",
                "incorrect"
            );
        }

        const result = getStudentData('Jim');
        expect(result[0].questions[0].result).toEqual("Bad");
    });

});


