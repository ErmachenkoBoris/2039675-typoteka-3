'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const {HttpCode} = require(`../../constants`);

const express = require(`express`);

const app = express();

app.use(express.json());

const {Router} = require(`express`);
const myServerRoutes = new Router();
myServerRoutes.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (_err) {
    res.send([]);
  }
})

app.use(``, myServerRoutes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

const runServer = async (args) => {
  const [portNumber] = args;

  const portNumberValue = Number.parseInt(portNumber, 10) || DEFAULT_PORT;

  app.listen(portNumberValue).
  on(`listening`, () => console.info(chalk.green(`Ожидаю подключение пользователя на порту: `, portNumberValue))).
  on(`error`, ({message}) => console.info(chalk.red(`Ошибка создания сервера: `, message)));

};

module.exports = {
  name: `--server`,
  async run(args) {
    await runServer(args);
  }
};
