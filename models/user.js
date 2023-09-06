const mongoose = require("mongoose")
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
    // firstname:{
    //     type: String,
    // },
    // lastname:{
    //     type: String,
    // },
    username:{
        type: String,
        unique:[true,'Username Already Exist']
    },
    phonenumber:{
        type: Number,
    },
    email: {
        type: String,
        unique:[true,"Email already Exist, please Login"],
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            "Please provide valid email",
        ],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        match:[
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Minimum eight characters, at least one letter and one number is Required"
        ],
    },
    // location: {
    //     type: String,
    // },
    brand : {
        type:mongoose.Types.ObjectId,
        ref:"brand"
    },
    creator : {
        type:mongoose.Types.ObjectId,
        ref:"creator"
    },
    organizer : {
        type:mongoose.Types.ObjectId,
        ref:"Organizer"
    },
    type:{
        type:String,
        enum: ["creator","brand","organizer"],
        default: "creator"
    }
},
{
    methods:{
        generateJWT(){
            return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });         
        }
    }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports =  mongoose.model("user", userSchema, "user");