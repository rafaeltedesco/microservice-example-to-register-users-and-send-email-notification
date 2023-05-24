const express = require('express');
const { registerMember } = require('./services/register.service');
const { sendMail } = require('./services/sendMail.service');

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, cep } = req.body;
  try {
    const newCustomer = await registerMember({ firstName, lastName, email, cep });
    await sendMail({ fullName: `${firstName} ${lastName}`, email, message: 'Welcome to your Gym!'});
    return res.json(newCustomer);
  } catch(err) {
    console.log(err)
    return res.status(err.cause).json({
      message: err.message
    })
  }
})

module.exports = app;