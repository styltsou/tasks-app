const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Thanks for joining us!',
    text: `Welcome, ${name}! Let us know how you get along with our app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Sorry to see you go',
    text: `Goodbye, ${name}! We hope to see you back sometime soon`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
