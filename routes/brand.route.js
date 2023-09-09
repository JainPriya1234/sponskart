const express = require("express");
const brand  = require("../controllers/brand.controller");
const router = express.Router();
const fileupload = require('../middleware/fileupload');
const {authorization} = require('../middleware/authorization')


// End Point
// /brand

// router.put('/update',fileupload.fields([
//     {name:'logo'},
//     {name:'backgroundImage'}
// ]),creator.addprofile);
 router.get('/get/:id',brand.getById);
 router.get('/getall',brand.getAll);





module.exports = router;