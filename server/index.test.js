const request = require("supertest")
const fs = require('fs');
const app = require("./app");
const questions = require("../database/questions.js");
const students = require("../database/students.js");
const {fileURLToPath} = require("url");
const {json} = require("express");


describe("GET /", () => {
    test("should display home webpage", async () => {

        const response = await request(app).get("/").expect(200);

        let fileRead = fs.readFile(__dirname + `/../client/index.html`, 'utf8', (err, data) => {
            expect(response.text).toEqual(data);
        });

    });
});

describe("GET /question", () => {
    test("should display questions webpage", async () => {

        const response = await request(app).get("/question").expect(200);

        fileRead = fs.readFile(__dirname + `/../client/questions.html`, 'utf8', (err, data) => {
            expect(response.text).toEqual(data);
        });

    });
});


describe("POST /login", () => {
    test("should return name is needed when name not given!", async () => {
        const jsonBody = {
            name: undefined
        };

        const response = await request(app)
            .post("/login")
            .send(jsonBody)
            .expect(400)


        expect(response.status).toEqual(400);
        expect(response.text).toEqual("Name is needed!")

    });
});


describe("POST /login", () => {

    test("should return a valid string is needed on wrong type of name given!", async () => {
        const jsonBody = {
            name: 7
        };

        const response = await request(app)
            .post("/login")
            .send(jsonBody)


        expect(response.text).toEqual("A valid string is needed!")
    })

});

describe("POST /login", () => {

    test("should return student's name does not exist in the database!", async () => {
        const jsonBody = {
            name: "bob"
        };

        const response = await request(app)
            .post("/login")
            .send(jsonBody)


        expect(response.text).toEqual(`Student's name does not exist in the database!`)
    });

});


describe("POST /register", () => {
    test("should return name is needed on wrong type of name given!", async () => {
        const jsonBody = {
            name: undefined
        };

        const response = await request(app)
            .post("/register")
            .send(jsonBody)
            .expect(400)


        expect(response.status).toEqual(400);
        expect(response.text).toEqual("Name is needed!")

    });
});


describe("POST /register", () => {

    test("should return a valid string is needed on type difference!", async () => {
        const jsonBody = {
            name: 7
        };

        const response = await request(app)
            .post("/register")
            .send(jsonBody)


        expect(response.text).toEqual("A valid string is needed!")
    })

});

describe("POST /register", () => {

    test("should add a non-existent name into database!", async () => {
        const jsonBody = {
            name: "bob"
        };

        const response = await request(app)
            .post("/register")
            .send(jsonBody)


        expect(response.text).toEqual("User bob has been successfully added in the database!")
    });

});

describe("POST /register", () => {

    test("should return name already in database!", async () => {
        const jsonBody = {
            name: "bob"
        };

        const response = await request(app)
            .post("/register")
            .send(jsonBody)


        expect(response.text).toEqual("Student's name already exist in the database!")
    });

});


describe("GET /admin/students", () => {

    test("should return all students in a json!", async () => {
        const response = await request(app).get("/admin/students");

        expect(response.body).toEqual(students.students)

    });
});


describe("GET /admin/questions", () => {

    test("should return all questions in a json!", async () => {
        const response = await request(app).get("/admin/questions");

        expect(response.body).toEqual(questions)

    });
});


describe("POST /question/random", () => {

    test("should return a random question!", async () => {
        const response = await request(app).post("/question/random");

        for (let i = 0; i < questions.length; i++) {

            if (questions[i].questions[0].question == response.body.question) {

                expect(response.body.question).toEqual(questions[i].questions[0].question)
            }
        }
        ;


    });
});


describe("POST /question/verify", () => {

    test("should return question does not exist on non-existent question given!", async () => {

        const jsonBody = {
            question: undefined
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Question is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should return a valid string is needed if question is of wrong type!", async () => {

        const jsonBody = {
            question: 3
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("A valid question string is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should return answer does not exist if an answer not given!", async () => {

        const jsonBody = {
            question: "random question",
            answer: undefined
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Answer is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should return a valid string is needed if answer is of wrong type!", async () => {

        const jsonBody = {
            question: "random question",
            answer: 3
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("A valid answer string is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should return name does not exist!", async () => {

        const jsonBody = {
            question: "random question",
            answer: "ok",
            name: undefined
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Name is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should a valid string is needed if name is of wrong type!", async () => {

        const jsonBody = {
            question: "random question",
            answer: "ok",
            name: 3
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("A valid name string is needed!")

    });

});


describe("POST /question/verify", () => {

    test("should return student's name does not exist in database!", async () => {

        const jsonBody = {
            question: "random question",
            answer: "ok",
            name: "tom"
        }


        const response = await request(app)
            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Student's name does not exist in the database!")

    });

});


describe("POST /question/verify", () => {

    test("should return question could not be found in the database!", async () => {

        const jsonBody = {
            question: "random question",
            answer: "ok",
            name: "Bob"
        }
        const studentName = {
            name: "Bob"
        }

        await request(app)
            .post("/register")
            .send(studentName)

        const response = await request(app)

            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Question could not be found in the database!")

    });

});

describe("POST /question/verify", () => {

    test("should return Incorrect! on wrong answer given!", async () => {

        const jsonBody = {
            question: "Who is known as the 'King of Pop'?",
            answer: "ok",
            name: "Bob"
        }
        const studentName = {
            name: "Bob"
        }

        await request(app)
            .post("/register")
            .send(studentName)

        const response = await request(app)

            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Incorrect!")

    });

});

describe("POST /question/verify", () => {

    test("should return Correct! on right answer given!", async () => {

        const jsonBody = {
            question: "Who is known as the 'King of Pop'?",
            answer: "Michael Jackson",
            name: "Bob"
        }
        const studentName = {
            name: "Bob"
        }

        await request(app)
            .post("/register")
            .send(studentName)

        const response = await request(app)

            .post("/question/verify")
            .send(jsonBody)


        expect(response.text).toEqual("Correct!")

    });

});

describe("POST /statistics/best", () => {
    test("should return array of students sorted by score!", async () => {

        const jsonBody = {
            question: "Who is known as the 'King of Pop'?",
            answer: "Michael Jackson",
            name: "Bob"
        }
        const studentName = {
            name: "Bob"
        }

        const jsonBody1 = {
            question: "Who is known as the 'King of Pop'?",
            answer: "idk",
            name: "Tom"
        }
        const studentName1 = {
            name: "Tom"
        }


        await request(app)
            .post("/register")
            .send(studentName)

        await request(app)
            .post("/register")
            .send(studentName1)

        await request(app)
            .post("/question/verify")
            .send(jsonBody)

        await request(app)
            .post("/question/verify")
            .send(jsonBody1)

        response = await request(app)
            .post("/statistics/best")


        expect(response.body[0].name).toEqual("Bob")

    });
});







