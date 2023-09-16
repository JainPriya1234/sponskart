const mongoose = require("mongoose")
const path = require("path");
const brandprofileschema = new mongoose.Schema({
    logo:[{
        type: String,
        default: path.join('logo','Allow in .jpg')
    }],
    backgroundImage:{
        type:String,
     },
    facebook:{
        type:String
     },
     instagram:{
        type:String
     },
     linkedin:{
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
    shortDescription:{
        type: String,
    },
    longDescription:{
        type: String,
    },
    phonenumber:{
        type:Number
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
    brandType:{
        type:Array
    },
    username:{
        type:String
    }
})

module.exports = mongoose.model("brand",brandprofileschema);