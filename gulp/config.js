import notifier from 'node-notifier';
import { argv } from 'yargs';

export const env = argv.env || 'development';

export function errorHandler (error) {
  notifier.notify({
    title: 'Gulp error',
    message: error.message
  });
  console.error(error.message);
  this.emit('end');
}

function readKeys (filename) {
  let keys;
  try {
    keys = require(filename)
  } catch (e) {
    console.error(`No config file found at: ${filename}`);
    keys = {};
  }
  return keys;
}

export function getConfigKeys () {
  const keys = readKeys(`../config/${env}`);
  keys.environment = env;
  return keys;
}

export function getSecretKeys () {
  const keys = readKeys(`../config/secrets.${env}`);
  keys.environment = env;
  return keys;
}
