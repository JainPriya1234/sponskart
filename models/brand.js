const mongoose = require("mongoose")
const path = require("path");
const brandprofileschema = new mongoose.Schema({
    Logo:[{
        type: String,
        default: path.join('logo','Allow in .jpg')
    }],
    email: {
       type:String
    },
    brandName:{
        type: String,
    },
    brandShortDesc:{
        type: String,
    },
    brandLongDesc:{
        type: String,
    },
    pageHolder:{
        type: String,
    },
    HolderName : {
        type:String
    },
    websiteLink :{
        type:String
    },
    location:{
        type:String
    },
    postfor:{
        type:String
    },
    describe:{
        type:String
    },
    miniFollower:{
        type:Number
    },
    chooseLocation:{
        type:String
    },
    want:{
        type:String
    },
    platform:{
        type:String
    },
    categories:{
        type:String
    }
})

module.exports = mongoose.model("brand",brandprofileschema);