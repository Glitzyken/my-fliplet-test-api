/* eslint-disable */

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.beforeAll = () => {
  return before((done) => {
    done();
  });
};

exports.afterEachOne = () => {
  return afterEach((done) => {
    done();
  });
};

exports.afterAll = () => {
  return after((done) => {
    done();
  });
};
