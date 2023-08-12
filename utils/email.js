const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
    api_key: process.env.API_KEY
  }
}))
exports.sendEmail = (email,resetlink) =>{
    console.log("mail sent");
    transporter.sendMail({
        to: email,
        from:'noreplysponskart0@gmail.com',
        subject:`Reset link (valid for 15 minutes)`,
        html:`<!DOCTYPE html>
        <html>
        <body>
           ${resetlink}
        </body>
        </html>`   
    })
}
exports.sendOtp =(email,OTPgen)=>{
  transporter.sendMail({
    to:email,
    from:'noreplysponskart0@gmail.com',
    subject:'your OTP for sponskart',
    html:`<!DOCTYPE html>
    <html>
    <body>
       ${OTPgen}
    </body>
    </html>` 
  })
}

 
