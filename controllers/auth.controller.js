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
const Brand = require('../models/brand');
const Creator = require('../models/creator');

const brandRegister = async (req,res,next)=>{
    try{
        console.log(1);
        const {Logo,brandName,brandShortDesc,brandLongDesc }=req.body;
        console.log(req.body)
        const  newBrand = await Brand.create({
            brandName:brandName,
            brandShortDesc: brandShortDesc,
            brandLongDesc:brandLongDesc
        })
        // await User.findOneAndUpdate({email:email},{type:"brand",brand:newBrand._id,firstname:brandName})
        return res.json(sendSuccessApiResponse("Brand sucessfully registered",200))
    }
    catch(err) {return next(createCustomError(err,400));}
}
const Register = async (req,res,next)=>{
    try{
        const {firstname , lastname ,username , phonenumber , email, password ,location,organizationName,
        Logo,brandName,HolderName,brandShortDesc,brandLongDesc} = req.body;
        const type = req.body.type || "creator";
        console.log(req.body);
        const exist = await User.findOne({
            email: email
        });
        if (exist) {
            const message = "Email is already registered";
            return next(createCustomError(message, 400));
        }
        // const usernameExist = await User.findOne({
        //     username: username
        // }) ;
        // if(usernameExist){
        //     const message = "username is already registered";
        //     return next(createCustomError(message, 400));
        // }
        
        const user = await User.create({
            username:username,
            phonenumber:phonenumber,
            email: email,
            password: password,
            type:type
        })
        if(type == 'creator'){
            const creator = await Creator.create({
                email:email,
                firstname:firstname,
                lastname:lastname,
                state:location
            })
            user.creator = creator._id;
            await user.save();
            return res.json(sendSuccessApiResponse('Creator Successfully Register',200));
        }
        if(type == "organizer"){
            console.log(1);
            const organizer = await Organizer.create({
                email:email,
                organizationName:organizationName
            })
            user.organizer = organizer._id;
            await user.save();
            return res.json(sendSuccessApiResponse("Organizer sucessfully registered",200))
        }
        // Brand Registration Logic goes Here !
        if(type == "brand"){
            console.log(1);
            const brand = await Brand.create({
                email:email,
                username:username,
                brandName:brandName,
                HolderName:HolderName
            })
            user.brand = brand._id;
            await user.save();
            return res.json(sendSuccessApiResponse("Brand sucessfully registered",200))
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
        console.log(emailExists)
        let data;
        if(emailExists.type=="creator") data = await Creator.findOne({email:email});
        if(emailExists.type =="organizer") data = await Organizer.findOne({email:email});
        if(emailExists.type =="brand") data = await Brand.findOne({email:email});
        
        const response = {
            user:emailExists,
            data : data,
            token: emailExists.generateJWT()
        };
        res.status(200).json(sendSuccessApiResponse(response));
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
    const resetURL = `https://${process.env.BASEURL}/reset-password?token=${resetToken}`;
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
    const userExist = await User.findOne({_id : payload.userId})
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
    verifyResetPassword,
    brandRegister
}