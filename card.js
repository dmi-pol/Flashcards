const fs = require("fs").promises;
const inquirer = require("inquirer");
const { EOL } = require("os");
// const func = async () => {
//   const path = "./topics/";
//   const files = await fs.readdir(path);

//   console.log(files);

// console.log(filesPath)
// }

// func();
// ------------------------------------------------------------
class Card {

    static readeFileFunc() {
try{

}

catch (error) {
    console.error("Ошибка при чтении файлов:", error);
  }





    }
}
// --------------------------------------------------
(async () => {
  try {
    const path = "./topics/";
    const files = await fs.readdir(path);
    const readFile = await fs.readFile(path + files[0], "utf8");

    const newArr = readFile.split('\n')
    
    // const arrQuest = readFile.split('\n').map((line => line.trim())).filter(line => line !== '');
        console.log(newArr);
    // };
    

    inquirer
      .prompt([
        { type: "input", name: "username", message: "Введи имя:" },

        { type: "quest", name: "quest", message: "WHAT the fuck is going on?" },
        {
          type: "list",
          name: "bonuses",
          message: "Выберите тему Квиза",
          choices: [
            { name: 'Орлы', value: 1 },
            { name: 'Выдры', value: 2 },
            { name: 'Еноты', value: 3},
          ],
        },
        {
          type: "list",
          name: "punishment",
          message: "Вопрос про орла 1",
          choices: [
            { name: "Писать неделю на промисах", damage: 10 },
            { name: "Писать неделю рекурсию с регуляркой", damage: 20 },
            { name: "Писать только левой рукой", damage: 5 },
          ],
          when: (answers) => answers.bonuses = 1,
        },
        {
            type: "list",
            name: "punishment",
            message: "Вопрос про выдру",
            choices: [
              { name: "Писать неделю на промисах", damage: 10 },
              { name: "Писать неделю рекурсию с регуляркой", damage: 20 },
              { name: "Писать только левой рукой", damage: 5 },
            ],
            when: (answers) => answers.bonuses = 2,
          },
          {
            type: "list",
            name: "punishment",
            message: "Вопрос про енота",
            choices: [
              { name: "Писать неделю на промисах", damage: 10 },
              { name: "Писать неделю рекурсию с регуляркой", damage: 20 },
              { name: "Писать только левой рукой", damage: 5 },
            ],
            when: (answers) => answers.bonuses = 3,
          },
        // {
        //   type: "list",
        //   name: "fileChoice",
        //   message: "Выбери файл из списка:",
        //   choices: fileChoices,
        // },
      ])
      .then((answers) => console.log(answers));
  } catch (error) {
    console.error("Ошибка при чтении файлов:", error);
  }
})();
