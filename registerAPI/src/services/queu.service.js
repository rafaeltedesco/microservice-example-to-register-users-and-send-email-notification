const Queue = require('bull');
const { sendMail } = require('./sendMail.service');

const emailQueue = new Queue('emailNotification', {
  redis: {
    host: 'redis_compose',
    port: 6379
  }
});

emailQueue.process(async (job) => {
  try {
    console.log(`New data to process arrived: ${JSON.stringify(job.data)}`);
    const result = await sendMail(job.data);
    console.info(`Request to send an email to ${mail.email} response: `, result);
  } catch(err) {
    console.error(`Error while sending email to ${mail.email}...\nError: ${err.message}`);
  }
});

module.exports = {
  emailQueue,
};