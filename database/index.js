let students = require("./students");
let questions = require("./questions");

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const findStudentByName = (name) => {
  let foundStudent = students.find((student) => student.name === name);
  return foundStudent ? foundStudent : null;
};

const findStudentBySchool = (schoolName) => {
  return students.find((student) => student.school === schoolName);
};

const findBestStudent = () => {
  const studentPoints = [];

  students.forEach((student) => {
    let totalPoints = 0;

    student.stats.forEach((subject) => {
      subject.questions.forEach((question) => {
        totalPoints += question.correctCounter;
        totalPoints -= question.wrongCounter * 0.5;
      });
    });

    studentPoints.push({ name: student.name, points: totalPoints.toFixed(2) });
  });

  studentPoints.sort((a, b) => b.points - a.points);
  return studentPoints;
};

const findQuestionsByTopic = (topic) => {
  return questions.find((question) => question.topic === topic);
};

const findAnswerByQuestion = (questionToFind) => {
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

const generateRandomQuestion = () => {
  const randomTopicIndex = Math.floor(Math.random() * questions.length);
  const randomTopic = questions[randomTopicIndex];
  const randomQuestionIndex = Math.floor(
    Math.random() * randomTopic.questions.length
  );

  let questionObj = randomTopic.questions[randomQuestionIndex];
  let allAnswers = [
    questionObj.answer,
    questionObj.wrongAnswers[0],
    questionObj.wrongAnswers[1],
    questionObj.wrongAnswers[2],
  ];

  return {
    question: questionObj.question,
    answers: shuffle(allAnswers),
  };
};

const changeStudentQuestionCounter = (studentName, question, counter) => {
  // studentName is already valid and exists in database, no need to check //

  // Find the student in the 'students' array based on the given name
  const student = findStudentByName(studentName);

  // If the student is found, find the specific question within the 'stats' array
  if (student) {
    student.stats.forEach((stat) => {
      const specificQuestion = stat.questions.find(
        (q) => q.question === question
      );
      if (specificQuestion) {
        counter === "correct"
          ? specificQuestion.correctCounter++
          : specificQuestion.wrongCounter++;
      }
    });
  }
};

const getStudentData = (studentName) => {
  const student = findStudentByName(studentName);
  if (!student) {
    return null;
  }

  const result = student.stats.map((stat) => {
    const questions = stat.questions.map((question) => {
      if (question.correctCounter + question.wrongCounter === 0) {
        return {
          question: question.question,
          result: "Skipped",
        };
      }

      const percentage =
        (question.correctCounter /
          (question.wrongCounter + question.correctCounter)) *
        100;

      const result =
        percentage >= 70 ? "Perfect" : percentage > 40 ? "Normal" : "Bad";

      return {
        question: question.question,
        result: result,
      };
    });
    return {
      topic: stat.topic,
      questions: questions,
    };
  });

  return result;
};

module.exports = {
  findStudentByName,
  findStudentBySchool,
  findBestStudent,
  findQuestionsByTopic,
  findAnswerByQuestion,
  generateRandomQuestion,
  changeStudentQuestionCounter,
  findBestStudent,
  getStudentData,
};
