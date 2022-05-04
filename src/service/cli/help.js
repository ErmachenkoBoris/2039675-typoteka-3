'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.`));
    console.info(chalk.gray(`Гайд:`));
    console.info(chalk.gray(`service.js <command>`));
    console.info(chalk.gray(`Команды:`));
    console.info(chalk.gray(`--version:            выводит номер версии`));
    console.info(chalk.gray(`--help:               печатает этот текст`));
    console.info(chalk.gray(`--generate <count>    формирует файл mocks.json`));
    console.info(chalk.gray(`--server <port>    запускает http server`));
  }
};
