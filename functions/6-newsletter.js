require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

// const url = 'https://api.buttondown.email/v1/subscribers'; -> API for paid plans only
const url = 'https://buttondown.email/api/emails/embed-subscribe/gryox2'; // using "the free way -> sending form data"

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Invalid Method',
    };
  }
  const { email } = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 422,
      body: 'Please provide valid email',
    };
  }

  // creating x-www-urlencoded form data
  const formData = qs.stringify({
    email: email,
    embed: '1',
  });
  try {
    const data = await axios.post(
      url,
      formData
      // if API -> API Key in Auth
      // {
      //   headers: {
      //     Authorization: `Token ${process.env.EMAIL_KEY}`,
      //   },
      // }
    );
    console.log(data);
    return {
      statusCode: 201,
      body: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.data),
    };
  }
};
