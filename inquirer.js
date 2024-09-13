
      const directoryPath = './topics';
      const files = await fs.readdir(directoryPath);
  
      const fileChoices = files.map((file) => ({ name: file, value: file }));
  
      inquirer
        .prompt([
           {
            type: 'list',
            name: 'fileChoice',
            message: 'Выбери файл из списка:',
            choices: fileChoices,
          },
        ])
        .then((answers) => console.log(answers));
    
