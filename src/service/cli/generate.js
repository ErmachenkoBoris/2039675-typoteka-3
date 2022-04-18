'use strict';

const {
  getRandomInt,
  shuffle,
  getRandomDate,
} = require(`../../utils`);

const {
  FILE_NAME,
  TITLES,
  CATEGORIES,
  SENTENCES,
  UPPER_TEXT_BOUND,
  DEFAULT_COUNT,
  MAX_COUNT
} = require(`./mocks/mocks`);

const fs = require(`fs`);

const getTitles = () => {
  return TITLES[getRandomInt(0, TITLES.length - 1)];
};

const getCategories = () => {
  const countOfCATEGORIES = getRandomInt(0, CATEGORIES.length - 1);
  return shuffle(CATEGORIES).slice(0, countOfCATEGORIES);
};

const getAnnounce = () => {
  const countOfAnnounce = getRandomInt(1, 5);
  return shuffle(SENTENCES).slice(0, countOfAnnounce).join(` `);
};

const getFulltext = () => {
  let countOfFulltext = getRandomInt(1, UPPER_TEXT_BOUND);

  let resultText = ``;

  while (countOfFulltext >= SENTENCES.length) {
    resultText += shuffle(SENTENCES).join(` `);
    countOfFulltext -= SENTENCES.length;
  }

  return resultText + shuffle(SENTENCES).slice(0, countOfFulltext).join(` `);
};

const getCreatedDate = () => {
  const maxDate = new Date();
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);
  return getRandomDate(minDate, maxDate).toDateString();
};

const generatePublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: getTitles(),
    createdDate: getCreatedDate(),
    announce: getAnnounce(),
    fullText: getFulltext(),
    category: getCategories(),
  })));


const generateCommandMain = (args) => {
  const [count] = args;

  let countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countPublication > MAX_COUNT) {
    countPublication = MAX_COUNT;
  }

  const content = JSON.stringify(generatePublications(countPublication));

  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    generateCommandMain(args);
  }
};
