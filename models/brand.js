const mongoose = require("mongoose")
const path = require("path");
const brandprofileschema = new mongoose.Schema({
    Logo:[{
        type: String,
        default: path.join('logo','Allow in .jpg')
    }],
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
    }
})

module.exports = mongoose.model("brand",brandprofileschema);