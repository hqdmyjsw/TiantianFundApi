
const logger = require('./myLogger');

function log(...arg) {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  logger.info(...arg);
}

module.exports = {
  log,
};
