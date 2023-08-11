const mongoose = require("mongoose")
const path = require("path");
const brandprofileschema = new mongoose.Schema({
    Logo:[{
        type: String,
        default: path.join('logo','Allow in .jpg')
    }],
    brandName:{
        type: String,
        required: [true, "Please provide brand name"],
    },
    brandShortDesc:{
        type: String,
        required: [true, "Please provide description"],
    },
    brandLongDesc:{
        type: String,
        required: [true, "Please provide description"],
    }
})

module.exports = mongoose.model("brand",brandprofileschema);