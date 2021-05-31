const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = (email, body) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirm your email',
        html: body
    };

    return transporter.sendMail(mailOptions);
};


