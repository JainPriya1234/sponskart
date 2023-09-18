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
 router.post('/add/post',brand.addPost);
 router.put('/update',fileupload.fields([
    {name:'logo'},
    {name:'backgroundImage'}
]),brand.addprofile);
 router.delete('/postdelete/:id',brand.deletePost);
 router.get('/posts',brand.getPost);


module.exports = router;