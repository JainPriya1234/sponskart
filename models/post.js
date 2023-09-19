const mongoose = require("mongoose")
const path = require("path");
const postSchema = new mongoose.Schema({
    brandId:{
        type:mongoose.Types.ObjectId,
        ref:"brand"
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
    payType:{
        type:String
    },
    platform:{
        type:Array
    },
    categories:{
        type:Array
    },
    targetAudience:{
        type:String
    },
    pricing:{
        type:Number
    }
})

module.exports = mongoose.model("post",postSchema);