const readline = require("readline");
const chalk = require("chalk");

// --------------------------------------------------------------------------------

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestionIndex = 0;

    // Настраиваем интерфейс для взаимодействия с пользователем

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
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
      this.rl.question(currentQuestion.text + " ", (answer) => {
        // Проверяем ответ пользователя
        if (currentQuestion.checkAnswer(answer)) {
          console.log("Правильно! 👍💃🏻");
          this.score++;
        } else {
         
          console.log("Неправильно! 💩");
         
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
    console.log(
      `Квиз завершён! Ваш результат: ${this.score} из ${this.questions.length}`
    );
    this.rl.close();
  }
}

module.exports = Quiz;
