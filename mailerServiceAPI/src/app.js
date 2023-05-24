const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
})

app.post('/send-mail', async (req, res) => {
  const { email, fullName, message } = req.body;
  await transport.sendMail({
    from: 'no-reply@myecommerce.com',
    to: email,
    subject: `Hello ${fullName}!`,
    html: `<h1>Hello ${fullName}</h1><hr>How you doing?<br>${message}`
  });

  return res.json({
    message: `Email sent to ${email}`
  })
})

module.exports = app;