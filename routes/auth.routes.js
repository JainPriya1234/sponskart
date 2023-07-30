const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();
router.post('/register',controller.Register);
router.post('/signin',controller.signin);

module.exports = router;