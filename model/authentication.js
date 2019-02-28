const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signup = function(req, res) {
    console.log(req.body)
    // User.findOne({ email: req.body.email }).then(user => {
    //     if (user) {
    //         return res.status(400).json(errors);
    //     }
    //     else {
    //         bcrypt.genSalt(saltRounds, function (err, salt) {
    //             bcrypt.hash(req.body.password, salt, function (err, hash) {
    //                 // Store hash in your password DB.

    //                 const newUser = new User({
    //                     userName: req.body.name,
    //                     email: req.body.email,
    //                     password: hash,
    //                     address: req.body.address,
    //                     contactNo: req.body.contactNo
    //                 });

    //                 newUser.save().then(user =>{
    //                     console.log(user)
    //                      res.json(user)}
    //                      )
    //                 .catch(err => console.log(err));

    //         });
    //     });
}
        //     if (user) {
        //       errors.email = 'Email already exists';
        //       return res.status(400).json(errors);
        //     } else {
        //       const avatar = gravatar.url(req.body.email, {
        //         s: '200', // Size
        //         r: 'pg', // Rating
        //         d: 'mm' // Default
        //       });

        //       const newUser = new User({
        //         name: req.body.name,
        //         email: req.body.email,
        //         password: req.body.password
        //       });

        //       bcrypt.genSalt(10, (err, salt) => {
        //         bcrypt.hash(newUser.password, salt, (err, hash) => {
        //           if (err) throw err;
        //           newUser.password = hash;
        //           newUser
        //             .save()
        //             .then(user => res.json(user))
        //             .catch(err => console.log(err));
        //         });
        //       });
        //     }
    // });
// };

exports.login = function (req, response) {

    // const { email, password } = req.body;
    // const user = userData.list().find((user) => user.email === email);
    // if (!(user && user.password === password)) {
    //     res.sendStatus(401);
    //     return;
    // }
    // const token = jwt.sign({ sub: user.userId }, jwtSecret,  { algorithm: 'RS256'});
    // console.log(token)
    // response.send({ token });
}