const fs = require("fs").promises;
const inquirer = require("inquirer");
const { EOL } = require("os");

// ------------------------------------------------------------
class CardQuestion {

    static async readeFileFunc() {
try{
    const pathQuest = "./topics/";
    const files1 = await fs.readdir(pathQuest);
    const readQuest = await fs.readFile(pathQuest + files1[0], "utf8");
    const newArr1 = readQuest.split('\n');
    return newArr1
   
}
catch (error) {
    console.error("Ошибка при чтении файлов:", error);
  }
    }
}
// --------------------------------------------------

class CardAnswer {

    static async readeFileFunc() {
try{
    
    const pathAnswer = "./answer/";
    const files2 = await fs.readdir(pathAnswer);
    const readAnswer = await fs.readFile(pathAnswer + files2[0], "utf8");
    const newArr2 = readAnswer.split('\n');
    return newArr2
}
catch (error) {
    console.error("Ошибка при чтении файлов:", error);
  }
    }
}

(async ()=> {

    try{
    CardQuestion.readeFileFunc();
    CardAnswer.readeFileFunc();
    
    inquirer
      .prompt([
        { type: "input", name: "username", message: "Квиз Квиз Квиз !" },

        { type: "quest", name: "quest", message: "WHAT the fuck is going on?" },
        {
          type: "list",
          name: "bonuses",
          message: "Выбери тему",
          choices: [
            { name: 'Орлы', value: 1 },
            { name: 'Выдры', value: 2 },
            { name: 'Еноты', value: 3},
          ],
        },
        {
          type: "list",
          name: "punishment",
          message: `${newArr1[0]}`,
          choices: [
            { name: "пончики", value: 2 },
            { name: "насекомые", value: 1 },
            { name: "Писать только левой рукой", value: 3 },
          ],
          when: (answers) => answers.bonuses > 1,
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
      ]).then((answers) => console.log(answers));
    } catch (error) {
        console.log("errorr")
    }
})
