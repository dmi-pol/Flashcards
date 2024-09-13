const readline = require('readline');
const inquirer = require('inquirer');
const fs = require('fs').promises;
// --------------------------------------------------------------------------------
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

  module.exports = Question