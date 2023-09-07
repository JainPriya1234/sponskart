const express = require("express");
const creator  = require("../controllers/creator.controller");
const router = express.Router();
const fileupload = require('../middleware/fileupload');
const {authorization} = require('../middleware/authorization')


// End Point
// /creator

// router.put('/update',fileupload.fields([
//     {name:'logo'},
//     {name:'backgroundImage'}
// ]),creator.addprofile);
// router.get('/get/:id',creator.getById);
// router.get('/getall',creator.getAll);





module.exports = router;