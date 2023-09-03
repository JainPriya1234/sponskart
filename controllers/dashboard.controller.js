const user = require('../models/user');
const User = require('../models/user');
const {createCustomError} = require('../error handler/customApiError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
const bcrypt = require('bcryptjs');
const Organizer = require('../models/Organizer');
const brand = require('../models/brand');


const Dashboard = async (req,res,next)=>{
    try{
        const {phonenumber,location,socialmedia,follower,links,} = req.body;
        const type = req.body.type || "user";
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

module.exports = {
    Dashboard
}