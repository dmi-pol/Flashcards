const readline = require('readline');
const fs = require('fs').promises;
const Question = require('./question');
const inquirer = require('inquirer');

// -----------------------------------------------------------------------------------------
// Функция для обработки файла
async function processQuizFile(filePath) {
  try {
    // Читаем содержимое файла
    const data = await fs.readFile(filePath, 'utf-8');
    
    // Разбиваем содержимое на строки
    const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');

    const questions = [];
    const answers = [];

    // Проходим по каждой строке, чередуя вопросы и ответы
    for (let i = 0; i < lines.length; i += 2) {
      const question = lines[i];
      const answer = lines[i + 1];
      
      // Добавляем вопрос и ответ в соответствующие массивы
      questions.push(question);
      answers.push(answer);
    }

    return { questions, answers };
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
  }
}
// -----------------------------------------------------------------------------------------
// Класс для вопроса
class Question {
  constructor(text, correctAnswer) {
    this.text = text;
    this.correctAnswer = correctAnswer.toLowerCase(); // Ожидается "да" или "нет"
  }

  // Проверяем ответ пользователя
  checkAnswer(userAnswer) {
    return userAnswer.trim().toLowerCase() === this.correctAnswer;
  }
}
// -----------------------------------------------------------------------------------------
// Класс для квиза
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestionIndex = 0;

    // Настраиваем интерфейс для взаимодействия с пользователем
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Запуск квиза
  start() {
    console.log("Добро пожаловать в квиз! Ответы должны быть 'да' или 'нет'.");
    this.askNextQuestion();
  }

  // Задание следующего вопроса
  askNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.rl.question(currentQuestion.text + ' ', (answer) => {
        // Проверяем ответ пользователя
        if (currentQuestion.checkAnswer(answer)) {
          console.log('Правильно! 👍💃🏻');
          this.score++;
        } else {
          console.log('Неправильно! 💩');
        }

        // Переходим к следующему вопросу
        this.currentQuestionIndex++;
        this.askNextQuestion();
      });
    } else {
      // Если вопросы закончились, завершаем квиз
      this.endQuiz();
    }
  }

  // Завершение квиза
  endQuiz() {
    console.log(`Квиз завершён! Ваш результат: ${this.score} из ${this.questions.length}`);
    this.rl.close();
  }
}
// -----------------------------------------------------------------------------------------
// Основная логика: создание объектов Question и запуск квиза
async function runQuiz() {
  const directoryPath = './topics';
  const files = await fs.readdir(directoryPath);

  const fileChoices = files.map((file) => ({ name: file, value: file }));

 
 const userChose = await inquirer
    .prompt([
       {
        type: 'list',
        name: 'file',
        message: 'Выбери файл из списка:',
        choices: fileChoices,
      },
    ])

  const { questions, answers } = await processQuizFile(`./topics/${userChose.file}`);

  if (!questions || !answers || questions.length !== answers.length) {
    console.error('Ошибка: количество вопросов и ответов не совпадает или файл не был прочитан.');
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
