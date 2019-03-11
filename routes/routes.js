var express = require('express');
var router = express.Router();
const authentication = require('../model/authentication');
const admin = require('../model/admin.js');
var auth = require('../utils/auth')

router.post('/signup',authentication.signup);
router.post('/login', authentication.login);
router.post('/upload',admin.upload);
router.post('/fetchAllUser',admin.fetchAllUser);
router.post('/fetchAllBook',admin.fetchAllBook);
router.get('/editBook/:id',admin.editBook);
router.post('/updateBook', admin.updateBook)
module.exports = router;
