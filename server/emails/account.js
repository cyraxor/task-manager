const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.SG_SENDER,
    subject: 'Wilkommen im Task Manager',
    text: `Welcome to the app, ${name}. Let me know how you get aling with the app.`
  })
}

const sendDeleteEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.SG_SENDER,
    subject: 'Task-Manager Account closed',
    text: `${name}, we are so sad that you are no longer interessted in using the app.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail
}
