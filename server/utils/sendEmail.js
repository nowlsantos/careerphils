const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
        secure: false,
        ignoreTLS: true,
        tls: {
            rejectUnauthorized: false
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: '"Lawrence Saints" <lawrence@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3) Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
