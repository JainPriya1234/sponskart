const user = require('../models/user');
const User = require('../models/user');
const {createCustomError} = require('../error handler/customApiError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const api_key = process.env.API_KEY ;
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const Email = require('../utils/email');
const jwt = require("jsonwebtoken");
const Organizer = require('../models/Organizer');

const Register = async (req,res,next)=>{
    try{
        const { firstname , lastname ,username , phonenumber , email, password ,location,type,organizationName} = req.body;
        console.log(req.body);
        const exist = await User.findOne({
            email: email
        });
        console.log(exist);
        if (exist) {
            const message = "Email is already registered";
            return next(createCustomError(message, 400));
        }
        const usernameExist = await User.findOne({
            username: username
        }) ;
        if(usernameExist){
            const message = "username is already registered";
            return next(createCustomError(message, 400));
        }
        await  User.create({
            firstname: firstname,
            lastname: lastname,
            username:username,
            phonenumber:phonenumber,
            email: email,
            password: password,
            location: location
        })
        if(type=="Organizer"){
            const neworganizer = await Organizer.create({
                organizationName: organizationName
            })
            await User.findOneAndUpdate({email:email},{type:"Organizer",organizer:neworganizer._id})
            return res.json(sendSuccessApiResponse("Organizer sucessfully registered",200))
        }
        res.json(sendSuccessApiResponse("sucessfully registered",200));
    }
    catch(err){
        console.log(err);
        res.json(next(createCustomError(err)));
    }
}
const signin = async (req,res,next)=>{
    try{
        const { email, password } = req.body;
        console.log(req.body);
        const emailExists = await User.findOne({email:email});
        console.log(emailExists);
        if (!emailExists) {
            const message = "User Not Found";
            return next(createCustomError(message, 404));
        }   
        const isPasswordRight = await emailExists.comparePassword(password);
        console.log(isPasswordRight);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            return next(createCustomError(message, 401));
        }
        const data = {
            email: emailExists.email,
            token: emailExists.generateJWT()
        };
        console.log(data);
        res.json(sendSuccessApiResponse(data,200));
      }
    catch(err){
        return createCustomError(err,400);
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
    console.log(token);
    const payload = await jwt.verify(token,process.env.JWT_SECRET);
    console.log(payload);
    const userExist = await user.findOne({_id : payload.userId})
    console.log(userExist);
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