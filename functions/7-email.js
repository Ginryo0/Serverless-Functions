require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

// nodemailer doesn't work
// const nodemailer = require('nodemailer');
// const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   host: EMAIL_HOST,
//   port: EMAIL_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: EMAIL_USER, // generated ethereal user
//     pass: EMAIL_PASSWORD, // generated ethereal password
//   },
// });

exports.handler = async (event, ctx, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    };
  }
  const { name, email, subject, msg } = JSON.parse(event.body);

  if (!name || !email || !subject || !msg) {
    return {
      statusCode: 422,
      body: 'Please Fill All Fields',
    };
  }

  const mail = {
    to: email,
    from: process.env.EMAIL_HOST,
    subject: subject,
    html: `<h2>Hey ${name}!</h2>
    <p>${msg}</p>`,
  };

  console.log(mail);
  // send mail with defined transport object
  try {
    let info = await sgMail.send(mail);

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    // console.log(error.response.body.errors);
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.body.errors),
    };
  }
};
