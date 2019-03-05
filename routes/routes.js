var express = require('express');
var router = express.Router();
const authentication = require('../model/authentication');
const admin = require('../model/admin.js');
var auth = require('../utils/auth')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("hiisdsssi",req.body)
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({
    storage
})

router.post('/signup',authentication.signup);
router.post('/login', authentication.login);
router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file)
        res.json({
            imageUrl: `images/uploads/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.");
});
module.exports = router;
