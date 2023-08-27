const express = require("express");
const controller = require('../controllers/auth.controller');
const upload = require('../middleware/fileupload');
const router = express.Router();

router.post('/register',controller.Register);
router.post('/signin',controller.signin);
router.post('/forgot',controller.forgot);
router.post('/resetpassword',controller.verifyResetPassword);
//router.post('/register/brand',controller.brandRegister);
router.post('/register/brand', upload.single('file'),controller.brandRegister);
module.exports = router;