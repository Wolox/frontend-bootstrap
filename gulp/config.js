import notifier from 'node-notifier';
import { argv } from 'yargs';

export default {
  environment: argv.env || 'development',
  errorHandler (error) {
    notifier.notify({
      title: 'Gulp error',
      message: error.message
    });
    console.error(error.message);
    this.emit('end');
  },
  readKeys (filename) {
    let keys;
    try {
      keys = require(filename)
    } catch (e) {
      console.error(`No config file found at: ${filename}`);
      keys = {};
    }
    return keys;
  },
  getConfigKeys () {
    const keys = this.readKeys(`../config/${this.environment}`);
    keys.environment = this.environment;
    return keys;
  },
  getSecretKeys () {
    const keys = this.readKeys(`../config/secrets.${this.environment}`);
    keys.environment = this.environment;
    return keys;
  }
};
