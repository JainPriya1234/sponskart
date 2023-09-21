const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const Brand = require("../models/brand");
const brandPost = require("../models/post");
const user = require("../models/user");


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

const   addprofile = async(req,res,next)=>{
    try{
        const {id,facebook,username,phonenumber,instagram,linkedin ,brandType, HolderName,twitter,follower,language,email,brandName,shortDescription,longDescription,websiteLink,location} = req.body;
        let toAdd = {
            email:email,
            brandName:brandName,
            shortDescription:shortDescription,
            longDescription:longDescription,
            websiteLink:websiteLink,
            location:location,
            facebook:facebook,
            instagram:instagram,
            twitter:twitter,
            follower:follower,
            language:language,
            HolderName:HolderName,
            brandType:brandType,
            linkedin:linkedin,
            phonenumber:phonenumber,
            username:username
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
        const {date,brandId,postfor,describe,targetAudience,pricing,miniFollower,chooseLocation,payType,platform,categories} = req.body;
        // if(req.files.logo){          // If Logo Is present 
        //     toAdd.logo = `public/${req.files.logo[0].originalname}`;
        // }
        // if(req.files.backgroundImage){                  // If Background image is Present
        //     toAdd.backgroundImage = `public/${req.files.backgroundImage[0].originalname}`;
        // }
        const post = await brandPost.create({
            date:date,
            brandId:brandId,
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
        return res.json(sendSuccessApiResponse(post,200))
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

//delete the post by id
const deletePost = async(req,res,next)=>{
    try{
        const id = req.query.postId; 
        // check if the post available or not else throw error (have to be done)
        await brandPost.findByIdAndDelete(id);
        return res.json(sendSuccessApiResponse("Brandpost sucessfully deleted",200));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

//get posts
const getPost = async(req,res,next)=>{
    try{
        const postId = req.query.postId;
        console.log(postId)
        const get = await brandPost.findById(postId);
        if(!get) return res.json(createCustomError('Post not Found', 404));
        return res.json(sendSuccessApiResponse(get,200));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

// getAll Post
const getAllPost = async(req,res,next)=>{
    try{
        const brandId = req.query.brandId;
        // can be populate for getting brand detailes by using ( .populate('brandId'); )
        const get = await brandPost.find({brandId:brandId})
        return res.json(sendSuccessApiResponse(get,200));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}


const updatepost = async(req,res,next)=>{
    try{
        const {id,postfor,describe,targetAudience,pricing,miniFollower,chooseLocation,payType,platform,categories} = req.body;
        console.log(req.body);
        await brandPost.findByIdAndUpdate(id,{
            postfor:postfor,
            describe:describe,
            miniFollower:miniFollower,
            chooseLocation:chooseLocation,
            payType:payType,
            platform:platform,
            targetAudience:targetAudience,
            pricing:pricing,
            categories:categories
        });
        const post = await brandPost.findById(id);
       // await brandPost.findByIdAndUpdate(id,post); 
       // const result = await brandPost.findById(id);
        console.log(post)
        res.json(sendSuccessApiResponse(post));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

module.exports = {
    getAll,
    getById,
    addprofile,
    addPost,
    deletePost,
    getPost,
    updatepost,
    getAllPost
};