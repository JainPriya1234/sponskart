const express = require("express");
const servicecontroller = require("../controllers/service.controller");
const router = express.Router();

//search routes

router.get('/search',servicecontroller.searchservice);
router.post('/contactUs',servicecontroller.contactUs);
router.post('/status',servicecontroller.changeStatus);


module.exports = router;