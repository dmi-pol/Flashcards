const readline = require("readline");
const inquirer = require("inquirer");
const fs = require("fs").promises;
const chalk = require("chalk");

const Question = require("./question");
const Quiz = require("./quizClass");
const { processQuizFile } = require("./readQuizFile");

// Основная логика: создание объектов Question и запуск квиза
async function runQuiz() {
  const directoryPath = "./topics";
  const files = await fs.readdir(directoryPath);

  const fileChoices = files.map((file) => ({ name: file, value: file }));

  fileChoices.map((elem) => {
    if (elem.value === "topic-1.txt") {
      elem.name = "Вопросики про Ястребов";
    }
    if (elem.value === "topic-2.txt") {
      elem.name = "Вопросики про Racoons";
    }
    if (elem.value === "topic-3.txt") {
      elem.name = "Вопросики про Выдр(ов?)";
    }
  });

  const userChose = await inquirer.prompt([
    {
      type: "list",
      name: "file",
      message: "Выбери файл из списка:",
      choices: fileChoices,
    },
  ]);

  const { questions, answers } = await processQuizFile(
    `./topics/${userChose.file}`
  );

 
  if (!questions || !answers || questions.length !== answers.length) {
    console.error(
      "Ошибка: количество вопросов и ответов не совпадает или файл не был прочитан."
    );
    return;
  }

  const questionObjects = [];

  // Создаем объекты Question
  for (let i = 0; i < questions.length; i++) {
    const question = new Question(questions[i], answers[i]);
    questionObjects.push(question);
  }

  // Запускаем квиз
  const quiz = new Quiz(questionObjects);
  quiz.start();
}

// -----------------------------------------------------------------------------------------
// Запускаем квиз

runQuiz();
