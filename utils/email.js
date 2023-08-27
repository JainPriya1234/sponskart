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
    console.log(email);
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
exports.contact = (email,data) =>{
    console.log("mail sent");
    console.log(email);
    transporter.sendMail({
        to: 'Hello@sponskart.in',
        from:'noreplysponskart0@gmail.com',
        subject:`Contact Us `,
        html:`<!DOCTYPE html>
        <html>
        <body>
          <p>User Name: ${data.name}</p> 
          <p>User Email: ${data.email}</p> 
          <p>User Number: ${data.number}</p> 
          <p>Reason: ${data.reason}</p> 
          <p>Message: ${data.message}</p> 
        </body>
        </html>`  
    })
}
exports.sendOtp =(email,OTPgen)=>{
  console.log("mail sent");
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

 
