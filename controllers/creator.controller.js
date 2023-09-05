const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const creator = require("../models/creator");

const getById = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const result = await User.findById(id);
        if(!result) return next(createCustomError(`No User found with Id : ${id}`,404));
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
}

const getAll = async(req,res,next)=>{
    try{
        const SearchString = ["username"];
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
    getAll
};