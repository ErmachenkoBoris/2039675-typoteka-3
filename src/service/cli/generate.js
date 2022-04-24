'use strict';

const {
  getRandomInt,
  shuffle,
  getRandomDate,
} = require(`../../utils`);

const {
  FILE_NAME,
  UPPER_TEXT_BOUND,
  DEFAULT_COUNT,
  MAX_COUNT
} = require(`../../constants`);

const CATEGORIES_FILE_PATH = `./data/categories.txt`;
const SENTENCES_FILE_PATH = `./data/sentences.txt`;
const TITLES_FILE_PATH = `./data/titles.txt`;

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const readFileByPath = async (filePath) => {
  try {
    const text = await fs.readFile(filePath, `utf-8`);
    return text.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(`Can't read data from file...`, err));
    return [];
  }
};

const getTitles = (titles) => {
  return titles[getRandomInt(0, titles.length - 1)];
};

const getCategories = (categories) => {
  const countOfCATEGORIES = getRandomInt(1, categories.length - 1);
  return shuffle(categories).slice(0, countOfCATEGORIES);
};

const getAnnounce = (sentences) => {
  const countOfAnnounce = getRandomInt(1, 5);
  return shuffle(sentences).slice(0, countOfAnnounce).join(` `);
};

const getFulltext = (sentences) => {
  let countOfFulltext = getRandomInt(1, UPPER_TEXT_BOUND);

  let resultText = ``;

  while (countOfFulltext >= sentences.length) {
    resultText += shuffle(sentences).join(` `);
    countOfFulltext -= sentences.length;
  }

  return resultText + shuffle(sentences).slice(0, countOfFulltext).join(` `);
};

const getCreatedDate = () => {
  const maxDate = new Date();
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);
  return getRandomDate(minDate, maxDate).toDateString();
};

const generatePublications = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: getTitles(titles),
    createdDate: getCreatedDate(),
    announce: getAnnounce(sentences),
    fullText: getFulltext(sentences),
    category: getCategories(categories),
  })));


const generateCommandMain = async (args, titles, categories, sentences) => {
  const [count] = args;

  let countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countPublication > MAX_COUNT) {
    countPublication = MAX_COUNT;
  }

  const content = JSON.stringify(generatePublications(countPublication, titles, categories, sentences));

  try {
    await fs.writeFile(FILE_NAME, content);
    return console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    return console.error(chalk.red(`Can't write data to file...`));
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readFileByPath(SENTENCES_FILE_PATH);

    const titles = await readFileByPath(TITLES_FILE_PATH);

    const categories = await readFileByPath(CATEGORIES_FILE_PATH);

    await generateCommandMain(args, titles, categories, sentences);
  }
};
