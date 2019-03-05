const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body)
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({
    storage
})

module.exports.addBook = function (req, res) {
    upload.single('image')
//     console.log(req.body)
//     if (req.file)
//     res.json({
//         imageUrl: `images/uploads/${req.file.filename}`
//     });
// else
//     res.status("409").json("No Files to Upload.");
}