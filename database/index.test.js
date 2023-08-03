const app = require("../server/app");
const request = require("supertest");
const questions = require("./questions.js");
const students = require("./students.js");
const { fileURLToPath } = require("url");
const { json } = require("express");
const dbUtils = require("./index.js");



describe("find student by name", () => {
    test("should find student by name", async () => {
       
        const studentName = {
            name: "Bob"
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
          
          expect(dbUtils.findStudentByName("Bob")).toEqual(students.students[0])
          expect(dbUtils.findStudentByName("Tom")).toEqual(students.students[1])
          
          
    });
});


describe("find best student", () => {
    test("should return array of students sorted by score", async() => {
    
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
    
          expect(dbUtils.findBestStudent()[0].name).toEqual("Bob")

    });

});

describe("find question by topic", () => {
    test("should find questions by topic", () =>{
    let topic = "music"
        for (let i =0; i <questions.length; i++){
            if(questions[i].topic === topic){

                
                expect(dbUtils.findQuestionsByTopic(topic)).toEqual(questions[0])
            } else {
                expect(dbUtils.findQuestionsByTopic(topic)).toEqual(questions[0])
            }
        };
        
    });

});
