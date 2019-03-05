const jwt = require('jsonwebtoken');
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Custom = require('../utils/custom_error');
var Messages = require('../utils/message').Messages;
var errorStatus = require('../utils/error_status');
var config = require('../config/key');

module.exports.signup = function (req, res) {
    User.findOne({ email: req.body.data.email }).then(user => {
        if (user) {
            let obj = {
                emailExist: true,
                success :false,
                message :"Email already exist"
            }
            res.json(obj);
        }
        else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.data.password, salt, function (err, hash) {

                    const newUser = new User({
                        userName: req.body.data.userName,
                        email: req.body.data.email,
                        password: hash,
                        address: req.body.data.address,
                        contactNo: req.body.data.contactNo,
                        userType : req.body.data.userType
                    });
                    newUser.save().then(user => { 
                        let payload = { email: req.body.data.email };
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
                            message :"Successfully register"
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
    
    if (!!req.body.data.email && !!req.body.data.password) {
        User.findOne({ email: req.body.data.email }).then(user => {
            if (!user) {
                let obj = {
                    emailExist: false,
                    success: false,
                    message :"Email does not exist"
                }
                return res.json(obj);
            }
            else
            {
                bcrypt.compare(req.body.data.password, user.password).then(isMatch => {
                    if (isMatch) {
                      // Sign Token
                      let payload = { email: req.body.data.email };
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
                        return res.json(obj);
                    }
                   });
            }

    })
}
}