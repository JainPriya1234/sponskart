const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const Brand = require("../models/brand");
const brandPost = require("../models/post");

const getAll = async(req,res,next)=>{
    try{
        console.log(12)
        const SearchString = ["brandName"];
        const query = new APIFeatures(Brand.find({followers:{$lt:req.query.followers || 1000000}}),req.query)
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
        const result = await Brand.findById(id);
        if(!result) return next(createCustomError(`No Brand found with Id : ${id}`,404));
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const  addprofile = async(req,res,next)=>{
    try{
        const {id,email,brandName,shortDesc,longDesc,websiteLink,location} = req.body;
        let toAdd = {
            email:email,
            brandName:brandName,
            shortDesc:shortDesc,
            longDesc:longDesc,
            websiteLink:websiteLink,
            location:location
        }
        if(req.files.logo){          // If Logo Is present 
            toAdd.logo = `public/${req.files.logo[0].originalname}`;
        }
        if(req.files.backgroundImage){                  // If Background image is Present
            toAdd.backgroundImage = `public/${req.files.backgroundImage[0].originalname}`;
        }
        await Brand.findByIdAndUpdate(id,toAdd); 
        const result = await Brand.findById(id);
        console.log(id)
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const addPost= async(req,res,next)=>{
    try{
        const {postfor,describe,targetAudience,pricing,miniFollower,chooseLocation,payType,platform,categories} = req.body;
        // if(req.files.logo){          // If Logo Is present 
        //     toAdd.logo = `public/${req.files.logo[0].originalname}`;
        // }
        // if(req.files.backgroundImage){                  // If Background image is Present
        //     toAdd.backgroundImage = `public/${req.files.backgroundImage[0].originalname}`;
        // }
        const post = await brandPost.create({
            postfor:postfor,
            describe:describe,
            miniFollower:miniFollower,
            chooseLocation:chooseLocation,
            payType:payType,
            platform:platform,
            targetAudience:targetAudience,
            pricing:pricing,
            categories:categories
        })
        return res.json(sendSuccessApiResponse("Brandpost sucessfully created",200))
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

module.exports = {
    getAll,
    getById,
    addprofile,
    addPost

};