const jwt = require('jsonwebtoken');
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Custom = require('../utils/custom_error');
var Messages = require('../utils/message').Messages;
var errorStatus = require('../utils/error_status');
var config = require('../config/key');

module.exports.signup = function (req, res) {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            let obj = {
                dataExist: true,
                data: req.body.email,
                success :false
            }
            return res.status(400).json(obj);
        }
        else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {

                    const newUser = new User({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address,
                        contactNo: req.body.contactNo,
                        userType : req.body.userType
                    });
                    newUser.save().then(user => { 
                        let obj = {
                            dataExist: false,
                            data: user,
                            success :true
                        }
                        res.json(obj)
                    }
                    ).catch(err => {
                        res(new Custom(errorStatus.ErrorMessages.internalServer, errorStatus.ErrorCode.internalServerError));
                    });

                });
            });
        }
    })    
}

// };

exports.login = function (req, res) {
    if (!!req.body.email && !!req.body.password) {
        User.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                let obj = {
                    emailExist: false,
                    success: false,
                    message :"Email does not exist"
                }
                return res.status(400).json(obj);
            }
            else
            {
                // let isValid = bcrypt.compare(req.body.password, user.password);
                // console.log(isValid)
                bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    console.log(isMatch)
                    if (isMatch) {
                      // Sign Token
                      let payload = { email: req.body.email };
                      let jwt_token = jwt.sign(payload, config.secret, { expiresIn: 60000 });
                      let obj = {
                          data : {                            
                            userName: user.userName,
                            userId: user._id,
                            userType : user.userType,
                            isLogin: true,
                            token: jwt_token                            
                          },
                          success: true,
                          message :"Successfully Login"
                      }
                      res.json(obj)
                    } else {
                        let obj = {
                            emailExist: true,
                            success: false,
                            message :"Password does not match"
                        }
                        return res.status(400).json(obj);
                    }
                   });
            }

    })
}
}