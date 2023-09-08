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

module.exports = {
    getAll
};