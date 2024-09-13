const readline = require('readline');
const inquirer = require('inquirer');
const fs = require('fs').promises;
// --------------------------------------------------------------------------------
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

// console.log({ questions, answers })

    return { questions, answers };
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
  }
}

module.exports = {processQuizFile}

