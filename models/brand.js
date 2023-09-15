const mongoose = require("mongoose")
const path = require("path");
const brandprofileschema = new mongoose.Schema({
    Logo:[{
        type: String,
        default: path.join('logo','Allow in .jpg')
    }],
    backgroundImage:{
        type:String,
     },
    facebook:{
        type:String
     },
     insta:{
        type:String
     },
     twitter:{
        type:String
     },
     follower:{
        type:Number
     },
     language:{
        type:String
     },
     //backgroundimage , fb ,insta , 
    //twitter,followers,brandtype,language,
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
    }
})

module.exports = mongoose.model("brand",brandprofileschema);