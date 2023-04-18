require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('apptZje4geQJJfvlS')
  .table('survey');

exports.handler = async (event, ctx, cb) => {
  const method = event.httpMethod;
  if (method === 'GET') {
    try {
      const { records } = await airtable.list();
      const survey = records.map((item) => {
        const { id, fields } = item;
        const { food, votes } = fields;
        return { id, food, votes };
      });

      return {
        statusCode: 200,
        body: JSON.stringify(survey),
      };
    } catch (error) {}
  }

  return {
    statusCode: 500,
    body: 'Server Error',
  };
};
