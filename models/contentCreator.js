const mongoose = require("mongoose")
const path = require("path");
const contentCreatorSchema = new mongoose.Schema({
   organizationName : {
    type: String,
    required: [true,"please provide name"]
   }
})

module.exports = mongoose.model("contentCreator",contentCreatorSchema);