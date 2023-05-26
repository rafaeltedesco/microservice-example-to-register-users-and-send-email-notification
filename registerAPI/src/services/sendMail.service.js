const axios = require('axios');

const sendMail = async ({ fullName, email, message }) => {
  console.log(`Sending email through microservice to ${email}...`);
  try {
    const result = await axios.post('http://mailer_api:3000/send-mail', { fullName, email, message });
    return result.data;
  } catch(err) {
    console.error(err.message);
  }
}

module.exports = {
  sendMail,
};
