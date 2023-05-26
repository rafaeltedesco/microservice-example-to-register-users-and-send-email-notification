const express = require('express');
const { registerMember } = require('./services/register.service');
const { sendMail } = require('./services/sendMail.service');
const { getCachedAddressIfExists } = require('./middlewares/cacheAddress');
const { getAddressFromCEP } = require('./services/address.service');
const { emailQueue } = require('./services/queu.service');

const app = express();

app.use(express.json());

app.post('/register', getCachedAddressIfExists, async (req, res) => {
  const { firstName, lastName, email, cep } = req.body;
  let { address } = res.locals;
  try {
    if (!address) {
      address = await getAddressFromCEP(cep);
    }
    const newCustomer = await registerMember({ firstName, lastName, email, address });
    
    emailQueue.add(
      { fullName: `${firstName} ${lastName}`, email, message: 'Welcome to your Gym!'}
    )
    return res.json({
      newCustomer,
      message: 'Soon you will receive an email! Check your inbox!'
    });
  } catch(err) {
    console.log(err)
    return res.status(err.cause).json({
      message: err.message
    })
  }
})

module.exports = app;