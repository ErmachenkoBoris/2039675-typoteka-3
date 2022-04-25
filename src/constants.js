'use strict';

module.exports.DEFAULT_COUNT = 1;

module.exports.MAX_COUNT = 1000;

module.exports.FILE_NAME = `mocks.json`;

module.exports.UPPER_TEXT_BOUND = 100;

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.USER_ARGV_INDEX = 2;

module.exports.ExitCode = {
  error: 1,
  success: 0,
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
