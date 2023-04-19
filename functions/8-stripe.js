require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.handler = async (event, ctx, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: '405',
      body: 'Only Accepts POST Requests',
    };
  }
  const { purchase, total_amount } = JSON.parse(event.body);
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return Math.ceil(total_amount * 1.14);
  };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
