const readline = require('readline');
const fs = require('fs').promises;

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

    console.log('Вопросы:', questions);
    console.log('Ответы:', answers);
    
    return { questions, answers };
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
  }
}

// Запускаем функцию для обработки файла
processQuizFile('./topics/nighthawk_flashcard_data.txt');
//тут мы 
const questionObjects = [];

for (let i = 0; i < questionsArray.length; i++) {
  const questions = questionsArray[i];
  const answers = answersArray[i];
  
  // Создаем новый объект Question и добавляем его в массив
  const question = new Question(questions, answers);
  questionObjects.push(question);
}

// Выводим результат
console.log(questionObjects);




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



// // вопросы
// const questions = [
//   new Question('Что является основным источником пищи для ночных ястребов? ', 'насекомые'),
//   new Question('Ночные ястребы тесно связаны с ястребами! (да/нет)', 'нет'),
//   new Question('Ночные ястребы вьют гнезда.(да/нет)', 'нет'),
//   new Question('Бульбат - другое название обыкновенного ночного ястреба.(да/нет)', 'да'),
//   new Question('Что является основным источником пищи выдры?', 'рыба'),
//   new Question('Верно или нет? Выдры большую часть времени проводят на суше.', 'верно'),
//   new Question('Сколько существует видов выдр?', '13'),
//   new Question('Верно или нет? Выдры родом из Австралии.', 'нет'),
//   new Question('Верно или нет? Выдры изготавливают и используют инструменты.', 'верно'),
//   new Question('Какова средняя продолжительность жизни выдры в дикой природе?', '10'),
//   new Question('Являются ли еноты травоядными, плотоядными или всеядными?', 'всеядными'),
//   new Question('Верно или нет? Еноты ведут ночной образ жизни.', 'верно'),
//   new Question('Верно или нет? Еноты впадают в спячку.', 'нет'),
//   new Question('Верно или нет? Еноты могут бегать со скоростью до 25 км в час.', 'верно'),
//   new Question('Верно или нет? Еноты любят плавать!', 'нет'),
//   new Question('Верно или нет? Свое потомство самка кормит 24 раза в день.', 'верно'),
//   new Question('Верно или нет? Еноты – отдаленные родственники медведей.', 'верно'),
// ];

// Создаём квиз и запускаем его
const quiz = new Quiz(questions);
quiz.start();
