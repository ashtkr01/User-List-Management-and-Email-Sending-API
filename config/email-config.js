const nodemailer = require("nodemailer");

const {EMAIL_USER, EMAIL_PASS} = require("./server-config");

const mailsender = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : EMAIL_USER,
        pass : EMAIL_PASS
    }
});

module.exports = mailsender;