const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const user = require("../models/user");
const Email = require('../utils/email');
const Organizer = require("../models/organizer");


const addprofile = async(req,res,next)=>{
    try{
        const {email,organizationName,followers, eventType, preferredGender,
            platform, language,state,city,country,phonenumber,tagline,personOfcontact,
            personOfcontactPhoneNo,personOfcontactEmail,views } = req.body;
        const toAdd = {
            email:email,
            organizationName:organizationName,
            followers:followers,
            eventType:eventType,
            preferredGender:preferredGender,
            platform:platform,
            language:language,
            state:state,
            city:city,
            country:country,
            tagline:tagline,
            personOfcontact:personOfcontact,
            personOfcontactPhoneNo:personOfcontactPhoneNo,
            personOfcontactEmail:personOfcontactEmail,
            views:views,
            logo:`public/${req.files.logo[0].filename}`,
            backgroundImage:`public/${req.files.backgroundImage[0].filename}`
        }
        await Organizer.findOneAndUpdate({organizationName:organizationName},toAdd); 
        const response = await Organizer.findOne({organizationName:organizationName});
        res.json(sendSuccessApiResponse(response));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const getAll = async(req,res,next)=>{
    try{
        const SearchString = ["organizationName"];
        const query = new APIFeatures(Organizer.find({followers:{$lt:req.query.followers || 1000000}}),req.query)
        .filter()
        .search(SearchString)
        const data = await query.query;
        const response = sendSuccessApiResponse(data);
        res.json(response);
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const getById = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const result = await Organizer.findById(id);
        if(!result) return next(createCustomError(`No Organization found with Id : ${id}`,404));
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}
module.exports = {
    addprofile,
    getAll,
    getById,
};