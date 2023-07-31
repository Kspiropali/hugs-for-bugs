let students = require("./students");
let questions = require("./questions");

const findStudentByName = (name) => {
  let foundStudent = students.find((student) => student.name === name);
  return foundStudent ? foundStudent : null;
};

const findStudentBySchool = (schoolName) => {
  return students.find((student) => student.school === schoolName);
};

const findBestStudent = () => {
  // TODO: decide on a stats object layout
};

const findQuestionsByTopic = (topic) => {
  return questions.find((question) => question.topic === topic);
};

const findAnswerByQuestion = (question) => {
  for (const topic of questions) {
    const foundQuestion = topic.questions.find(
      (question) => question.question === questionToFind
    );
    if (foundQuestion) {
      return foundQuestion.answer;
    }
  }
  return "No such question in the database!";
};

module.exports = {
  findStudentByName,
  findStudentBySchool,
  findBestStudent,
  findQuestionsByTopic,
  findAnswerByQuestion,
};
