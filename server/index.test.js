const request = require("supertest")
const fs = require('fs');
const app = require("./app");
const questions = require("../database/questions.js");
const students = require("../database/students.js");
const { fileURLToPath } = require("url");


describe("GET /", () => {
    test("should display home html site", async () => {

      const response = await request(app).get("/").expect(200);

      fileRead = fs.readFile(__dirname+`/../client/index.html`, 'utf8', (err, data) => {
        expect(response.text).toEqual(data);
      });

    }); 
  });

  describe("GET /", () => {
    test("should display questions html site", async () => {

      const response = await request(app).get("/question").expect(200);

      fileRead = fs.readFile(__dirname+`/../client/questions.html`, 'utf8', (err, data) => {
        expect(response.text).toEqual(data);
      });

    }); 
  });


describe("POST /login", () => {
    test("should return name is needed on empty string", async () => {
      const jsonBody = {
        name: ""
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

test("should return success if name is in students json", async () => {
  const jsonBody = {
      name : "John"
    };
    
        const response = await request(app)
          .post("/login")
          .send(jsonBody)


    expect(response.body.status).toEqual(`Success`)
})

    });

describe("POST /login", () => {

  test("should return Student's name does not exist in the database!", async () => {
    const jsonBody = {
        name : "bob"
      };
      
          const response = await request(app)
            .post("/login")
            .send(jsonBody)
    
  
      expect(response.text).toEqual(`Student's name does not exist in the database!`)
  });
  
  });


describe("GET /admin/students" , () => {

  test("should return students json", async () => {
    const response = await request(app).get("/admin/students");
  
    expect(response.body).toEqual(students)

  });
});


describe("GET /admin/questions" , () => {

  test("should return questions json", async () => {
    const response = await request(app).get("/admin/questions");
  
    expect(response.body).toEqual(questions)

  });
});


describe("POST /question/random", () => {

  test("should return a random quesiton", async () => {
    const response = await request(app).post("/question/random");

    for(let i = 0; i < questions.length;i++) {

      if (questions[i].questions[0].question == response.body.question) {
        
        expect(response.body.question).toEqual(questions[i].questions[0].question)
      }
    };
    

  });
});


describe("POST /question/verify", () => {

  test("should return Please provide a valid question! if !question", async () => {


    

        
          
    
    console.log(response.text)

  })



})








