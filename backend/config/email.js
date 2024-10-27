require('dotenv').config();
const nodemailer = require('nodemailer');
const { secret } = require('./secret');


// sendEmail
module.exports.sendEmail = (body, res, message) => {
  const transporter =nodemailer.createTransport({
    host: secret.email_host,
    service: secret.email_service, // comment this line if you use a custom server/domain
    port: secret.email_port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: secret.email_user,
      pass: secret.email_pass,
    },
  });

  // Verify the transporter configuration
  transporter.verify((err) => {
    if (err) {
      console.error('Error verifying SMTP transport:', err.message);
      return res.status(403).send({
        message: `Error verifying SMTP transport: ${err.message}`,
      });
    }
    console.log('SMTP transporter is ready to send messages.');

    // Send the email
    transporter.sendMail(body, (err, data) => {
      if (err) {
        console.error('Error sending email:', err.message);
        return res.status(403).send({
          message: `Error sending email: ${err.message}`,
        });
      }
      console.log('Email sent successfully:', data);
      res.send({ message: message });
    });
  });
};
