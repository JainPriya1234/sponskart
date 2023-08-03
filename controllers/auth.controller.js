const user = require('../models/user');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const otp = require('../models/otp')
const {createCustomError} = require('../error handler/customApiError');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const api_key = process.env.API_KEY ;
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const Email = require('../utils/email');
const jwt = require("jsonwebtoken");
const Register = async (req,res,next)=>{
    try{
        const { firstname , lastname ,username , phonenumber , email, password } = req.body;
        console.log(req.body);
        const exist = await User.findOne({
            email: email
        });
        if (exist) {
            return res.json("already exist..please login");
        }
        await  User.create({
            firstname: firstname,
            lastname: lastname,
            username:username,
            phonenumber:phonenumber,
            email: email,
            password: password
        })
        res.json("successfully signed up!");
    }
    catch(err){
        res.json(err);
    }
}
const signin = async (req,res,next)=>{
    try{
        const { email, password } = req.body;
        const emailExists = await User.findOne({email:email});
        if (!emailExists) {
            const message = "Email Not Exist";
            res.json(message);
        }   
        const isPasswordRight = await emailExists.comparePassword(password);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            res.json(message);
        }
       console.log(req.body);
        res.json("successfully signedin! ");
    }
    catch(err){
        res.json(err);
    }
}

const forgot =async(req,res,next)=>{
   try{
    const { email} = req.body;
    const emailExists = await User.findOne({email:email});
    if (!emailExists)
    {
        const message = `No user found with the email: ${email}`;
        return next(createCustomError(message, 400));
    } 
    const resetToken = emailExists.generateJWT();
    const resetURL = `${req.protocol}://${process.env.BASEURL}/resetpassword?token=${resetToken}`;
    const result = await Email.sendEmail(email,resetURL);
    console.log(result);
    res.status(200).json(`Reset link has been sent to ${email}`)
   }
   catch(err){ 
    return createCustomError(err,400);
   }
}

const verifyResetPassword =async(req,res,next)=>{
   try{
    const token = req.query.token;
    const payload = await jwt.verify(token,process.env.JWT_SECRET);
    const userExist = await user.findOne({_id : payload.userId})
    if (!userExist)
    {
        const message = `Invalid Token `;
        return next(createCustomError(message, 400));
    } 
    const password = req.body.password;
    userExist.password = password;
    await userExist.save();
    res.json("password updated !");
   }
   catch(err){ 
    return createCustomError(err,400);
   }
}


module.exports = {
    signin, 
    Register,
    forgot,
    verifyResetPassword
}