'use strict';

module.exports = {
  name: `--help`,
  run() {
    console.info(`Программа запускает http-сервер и формирует файл с данными для API.`);
    console.info(`Гайд:`);
    console.info(`service.js <command>`);
    console.info(`Команды:`);
    console.info(`--version:            выводит номер версии`);
    console.info(`--help:               печатает этот текст`);
    console.info(`--generate <count>    формирует файл mocks.json`);
  }
};
