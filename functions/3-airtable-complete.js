require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('apptZje4geQJJfvlS')
  .table('products');

exports.handler = async (event, ctx, cb) => {
  const { id } = event.queryStringParameters;
  // if id get product
  if (id) {
    try {
      const product = await airtable.retrieve(id);
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

  // if no id return all prods
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
