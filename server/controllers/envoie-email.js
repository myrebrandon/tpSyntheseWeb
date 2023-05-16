const nodemailer = require("nodemailer");
require("dotenv").config()

const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MDPEMAIL
    }
}

const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            return info.response;
        }
    })
}

module.exports.send = send;