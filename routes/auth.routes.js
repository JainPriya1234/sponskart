const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post('/register',controller.Register);
router.post('/signin',controller.signin);
router.post('/forgot',controller.forgot);
router.post('/resetpassword',controller.verifyResetPassword);

//search routes

router.get('/brand',controller.getbrand);
router.get('/eventOrganizer',controller.eventorganizer);
router.get('/contentCreator',controller.contentcreator);

module.exports = router;