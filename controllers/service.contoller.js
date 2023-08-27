const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const user = require("../models/user");
const Email = require('../utils/email');


const searchservice = async (req,res,next)=>{
   try{
    const SearchString = ["firstname"];
    const query = new APIFeatures(user.find().populate("organizer brand"),req.query)
    .filter()
    .search(SearchString)
    const data = await query.query;
    const response = sendSuccessApiResponse(data);
    res.json(response);
   }
   catch(err){
    return createCustomError(err,400);
   }
}

const contactUs =async(req,res,next)=>{
  try{
     const {name,email,number,reason,message}=req.body;
     console.log(req.body);
     const data = {
        name: name,
        number: number,
        email:email,
        reason:reason,
        message:message
     }
     console.log(data);
     const result = await Email.contact(email,data);
  }
  catch(err){
   return createCustomError(err,400);
  }
}

module.exports = {
   searchservice,
   contactUs
};