const mongoose = require("mongoose")
const path = require("path");
const organizerSchema = new mongoose.Schema({
   organizationName : {
    type: String,
    required: [true,"please provide name"]
   }
})

module.exports = mongoose.model("Organizer",organizerSchema);