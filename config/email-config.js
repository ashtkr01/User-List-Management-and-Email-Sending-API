const nodemailer = require("nodemailer");

const {EMAIL_USER, EMAIL_PASS} = require("./server-config");
/* This transporter i.e mailsender is used in our Node.js application to send emails.  */
const mailsender = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : EMAIL_USER,
        pass : EMAIL_PASS
    }
});

module.exports = mailsender;