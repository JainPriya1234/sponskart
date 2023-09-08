const express = require("express");
const { createCustomError } = require("../error handler/customApiError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const APIFeatures = require("../utils/APIfeatures");
const Brand = require("../models/brand");

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

module.exports = {
    getAll,
    getById
};