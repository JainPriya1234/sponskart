const mongoose = require("mongoose")
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "Please provide first name"],
    },
    lastname:{
        type: String,
        required: [true, "Please provide last name"],
    },
    username:{
        type: String,
        unique: [true, "Please provide unique name , this usernam already exist ! "],
        required: [true, "Please provide username"],
    },
    phonenumber:{
        type: Number,
        required: [true, "Please provide phonenumber"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
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
        required: [true, "Please provide password"],
    },
    location: {
        type: String,
        required: [true, "Please provide a location"],
    },
    isVerified: {
        type:Boolean,
        default:false
    },isActive: {
        type: Boolean,
        default: true,
    },
    brand : {
        type:mongoose.Types.ObjectId,
        ref:"brand"
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