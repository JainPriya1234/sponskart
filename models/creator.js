const mongoose = require("mongoose")
const path = require("path");
const creatorSchema = new mongoose.Schema({
   firstname:{
      type:String
   },
   lastname:{
      type:String
   },
   followers:{
      type:Number,
      default :0
   },
   creatorType:{
      type:String
   },
   preferredGender:{
      type:String
   },
   platform:{
      type:String
   },
   language:{
      type:String
   },
   state:{
      type:String
   }
   // location:{
   //    type:String
   // },
//    tagline:{
//       type:String
//    },
//    personOfcontact:{
//       type:String
//    },
//    personOfcontactPhoneNo:{
//       type:Number
//    },
//    personOfcontactEmail:{
//       type:String
//    },
//    views:{
//       type:Number,
//       default:0
//    },
//    backgroundImage:{
//       type:String,
//    },
//    logo:{
//       type:String
//    }
})

module.exports = mongoose.model("creator",creatorSchema);