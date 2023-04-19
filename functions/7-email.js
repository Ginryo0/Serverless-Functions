require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.handler = async (event, ctx, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    };
  }
  const { name, email, subject, message } = JSON.parse(event.body);
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 422,
      body: 'Please Fill All Fields',
    };
  }

  const emailMsg = {
    from: '"Captain Potato 🥔" <potata@farm.com>', // sender address
    to: `${name} <${email}>`, // list of receivers
    subject: subject, // Subject line
    html: `<p style={color: blue}>${message}</p>`, // html body
  };
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      ...emailMsg,
    });

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
