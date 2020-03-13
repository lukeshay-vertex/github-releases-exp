const config = require('@lukeshay/jest-config');

config['globals'] = {
  'ts-test': {
    tsconfigfile: './jest.tsconfig.json',
  },
};

module.exports = config;
