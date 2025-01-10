require('dotenv').config();
const nodemailer = require("nodemailer");


let sendSimpleEmail = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "cvoquang2@gmail.com", // generated ethereal user
            pass: "aienvtkfqylactmh", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Võ Quang Chiến" <cvoquang2@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "LOGS", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
   result = `<p>${dataSend.data};</p>` 
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}