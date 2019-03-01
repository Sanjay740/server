var express = require('express');
var router = express.Router();
const authentication = require('../model/authentication');
var auth = require('../utils/auth')

router.post('/signup',authentication.signup);
router.post('/login', authentication.login);
module.exports = router;
