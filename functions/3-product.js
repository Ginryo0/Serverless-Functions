require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('apptZje4geQJJfvlS')
  .table('products');

exports.handler = async (event, ctx, cb) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      console.log(product);
      if (product.error) {
        return {
          statusCode: 404,
          body: 'Product not found! please check product id',
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }
  return {
    statusCode: 404,
    body: 'Product not found! please check product id',
  };
};
