const express = require("express");
const organizercontroller = require("../controllers/organizer.controller");
const router = express.Router();
const fileupload = require('../middleware/fileupload');
const {authorization} = require('../middleware/authorization')
// End Point
// /organizer

router.put('/update',fileupload.fields([
    {name:'logo'},
    {name:'backgroundImage'}
]),organizercontroller.addprofile);

router.get('/:id',organizercontroller.getById);
router.get('/getall',organizercontroller.getAll);




module.exports = router;