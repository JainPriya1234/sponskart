const mongoose = require("mongoose")
const path = require("path");
const organizerSchema = new mongoose.Schema({
   email:{
      type:String
   },
   organizationName : {
    type: String,
    required: [true,"please provide name"]
   },
   followers:{
      type:Number,
      default :0
   },
   eventType:{
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
      type: String
   },
   // city:{
   //    type:String
   // },
   // country:{
   //    type:String
   // },
   // tagline:{
   //    type:String
   // },
   // personOfcontact:{
   //    type:String
   // },
   // personOfcontactPhoneNo:{
   //    type:Number
   // },
   // personOfcontactEmail:{
   //    type:String
   // },
   // views:{
   //    type:Number,
   //    default:0
   // },
   // backgroundImage:{
   //    type:String,
   // },
   // logo:{
   //    type:String
   // }
})

module.exports = mongoose.model("Organizer",organizerSchema);