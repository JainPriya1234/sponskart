const User = require('../models/user');
const join = async (req,res,next)=>{
    try{
        const { firstname , lastname ,username , phonenumber , email, password } = req.body;
        const exist = await User.findOne({
            email: email
        });
        if (exist) {
            return res.json("already exist..please login");
        }
        await User.create({
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

module.exports = {
    signin, 
    join
}