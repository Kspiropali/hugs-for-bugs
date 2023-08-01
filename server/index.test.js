const request = require("supertest")
const fs = require('fs');
const app = require("./app");
const questions = require("../database/questions.js");
const students = require("../database/students.js");
const { fileURLToPath } = require("url");


describe("GET /", () => {
    test("should display html site", async () => {

      const response = await request(app).get("/").expect(200);

      fileRead = fs.readFile(__dirname+`/../client/index.html`, 'utf8', (err, data) => {
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

describe("POST /login", () => {
  

test("should return success if name is in students json", async () => {
  const jsonBody = {
      name : "John"
    };
    
        const response = await request(app)
          .post("/login")
          .send(jsonBody)
  
         console.log(response.body)

    expect(response.body.status).toEqual(`Success`)
})

    });
});







