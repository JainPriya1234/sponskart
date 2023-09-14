const mongoose = require("mongoose")
const path = require("path");
const postSchema = new mongoose.Schema({
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
        type:String
    },
    categories:{
        type:String
    }
})

module.exports = mongoose.model("post",postSchema);