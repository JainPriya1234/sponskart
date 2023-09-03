const express = require("express");
const organizercontroller = require("../controllers/organizer.controller");
const router = express.Router();
const fileupload = require('../middleware/fileupload');
// End Point
// /organizer

router.post('/profile/add',fileupload.fields([
    {name:'logo'},
    {name:'backgroundImage'}
]),organizercontroller.addprofile);
router.get('/getall',organizercontroller.getAll)



module.exports = router;