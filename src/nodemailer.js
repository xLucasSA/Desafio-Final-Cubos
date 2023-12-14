const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function send(to, subject, body) {
    transport.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text: body
    })
}

module.exports = send