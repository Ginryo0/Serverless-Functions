require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('apptZje4geQJJfvlS')
  .table('survey');

exports.handler = async (event, ctx, cb) => {
  // console.log(event);
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
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server Error',
      };
    }
  } else if (method === 'PUT') {
    console.log(event.body);

    try {
      const { id, votes } = JSON.parse(event.body);
      if (!id || !votes) {
        return {
          statusCode: 422,
          body: 'Please provide valid values',
        };
      }
      const fields = { votes: +votes + 1 };
      const item = await airtable.update(id, { fields });
      console.log(item);
      if (item.error) {
        return {
          statusCode: 404,
          body: JSON.stringify(item),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      return {
        statusCode: 422,
        body: 'Please provide valid values',
      };
    }
  }

  // Default Response = InValid Methods
  return {
    statusCode: 405,
    body: 'Please Provide a Valid Method [GET/PUT]',
  };
};
