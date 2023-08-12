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

function generateJWT(user){
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}
const refreshToken= async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        const message = "Unauthenticaded No Bearer";
        return next(createCustomError(message, 401));
    }

    let data;
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        data = await getNewToken(payload);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            const payload = jwt.decode(token, { complete: true }).payload;
            data = await getNewToken(payload);

            if (!data) {
                const message = "Authentication failed invalid JWT";
                return next(createCustomError(message, 401));
            }
        } else {
            const message = "Authentication failed invalid JWT";
            return next(createCustomError(message, 401));
        }
    }

    res.status(200).json(sendSuccessApiResponse(data, 200));
};

generateJWT = function (user) {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

const Register = async (req,res,next)=>{
    try{
        const { firstname , lastname ,username , phonenumber , email, password ,location} = req.body;
        console.log(req.body);
        const exist = await User.findOne({
            email: email
        });
        console.log(exist);
        if (exist) {
            return res.json("already exist..please login");
        }
       const newuser =  await  User.create({
            firstname: firstname,
            lastname: lastname,
            username:username,
            phonenumber:phonenumber,
            email: email,
            password: password,
            location: location
        })
        console.log(newuser);
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
            const message = "User Not Found";
            return next(createCustomError(message, 404));
        }   
        const isPasswordRight = await emailExists.comparePassword(password);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            return next(createCustomError(message, 401));
        }
        const data = {
            Name: emailExists.Name,
            email: emailExists.email,
            token: generateJWT(emailExists),
            role:emailExists.role
        };
        const message = "successfully logged in ! ";
        res.status(200).json(message);
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