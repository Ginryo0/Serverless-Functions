require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('apptZje4geQJJfvlS')
  .table('products');

exports.handler = async (event, ctx, cb) => {
  try {
    const { records } = await airtable.list();
    const products = records.map((prod) => {
      const { id } = prod;
      const { name, img, price } = prod.fields;
      const url = img[0].url;
      return { id, name, url, price };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server error',
    };
  }
};
