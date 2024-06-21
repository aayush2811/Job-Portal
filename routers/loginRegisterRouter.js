const express = require('express');
const router = express.Router();
const loginRegisterController = require('../controllers/loginRegisterController');
const authentication = require('../auth/authentication');

router.get('/login', loginRegisterController.login);
router.get('/register', loginRegisterController.register);
router.post('/signup', loginRegisterController.registerPost);
router.post('/login', loginRegisterController.loginPost);

//forget password
router.post('/send-email', loginRegisterController.sendEmail);

router.get('/forget-password-2', authentication.user , loginRegisterController.forgetPass);
router.post('/forget-pass', loginRegisterController.forgetPassPost);


module.exports = router;