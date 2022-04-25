'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const http = require(`http`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const {HttpCode} = require(`../../constants`);

const sendResponse = (res, code, content) => {
  const template =
    `<!DOCTYPE html>
    <html lang="ru">
        <head>
            <title>With love from Node.js</title>
        </head>
        <body>
        ${content}
        </body>
    </html>
    `.trim();

  res.writeHead(code, {'Content-Type': `text/HTML; charset=UTF-8`});
  res.end(template);
};


const onClientConnect = async (req, res) => {
  const notFoundMessage = `страница не найдена, 404`;

  switch (req.url) {
    case `/`:
      try {
        const publicationsText = await fs.readFile(FILENAME);
        const mocks = JSON.parse(publicationsText);
        const response = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${response}</ul>`);
      } catch (err) {
        console.error(chalk.red(err));
        sendResponse(res, HttpCode.NOT_FOUND, `<h1>${notFoundMessage}</h1>`);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, `<h1>${notFoundMessage}</h1>`);
      break;
  }
};

const runServer = async (args) => {
  const [portNumber] = args;

  const portNumberValue = Number.parseInt(portNumber, 10) || DEFAULT_PORT;

  http.createServer(onClientConnect).listen(portNumberValue).
  on(`listening`, () => console.info(chalk.green(`Ожидаю подключение пользователя на порту: `, portNumberValue))).
  on(`error`, ({message}) => console.info(chalk.red(`Ошибка создания сервера: `, message)));

};

module.exports = {
  name: `--server`,
  async run(args) {
    await runServer(args);
  }
};
