const items = require('../assets/data');

exports.handler = async (event, ctx, cb) => {
  return {
    statusCode: 200,
    body: 'Hello World',
  };
};
