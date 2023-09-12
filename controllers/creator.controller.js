const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const creator = require("../models/creator");

const  addprofile = async(req,res,next)=>{
    try{
        const {id,email,firstname,lastname,followers, creatorType, preferredGender,
            platform, language,state,city,country,phonenumber,tagline,personOfcontact,
            personOfcontactPhoneNo,personOfcontactEmail,views } = req.body;
        let toAdd = {
            email:email,
            followers:followers,
            creatorType:creatorType,
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
            views:views
        }
        if(req.files.logo){          // If Logo Is present 
            toAdd.logo = `public/${req.files.logo[0].originalname}`;
        }
        if(req.files.backgroundImage){                  // If Background image is Present
            toAdd.backgroundImage = `public/${req.files.backgroundImage[0].originalname}`;
        }
        await creator.findByIdAndUpdate(id,toAdd); 
        const result = await creator.findById(id);
        console.log(id)
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const getById = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const result = await creator.findById(id);
        if(!result) return next(createCustomError(`No User found with Id : ${id}`,404));
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const getAll = async(req,res,next)=>{
    try{
        console.log(12)
        const SearchString = ["firstname"];
        const query = new APIFeatures(creator.find({followers:{$lt:req.query.followers || 1000000}}),req.query)
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

module.exports = {
    getById,
    getAll,
    addprofile
};