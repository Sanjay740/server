const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIAJAFQRJ2JKRMKS7AA",
    secretAccessKey: "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",
    region: 'us-east-2',
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'librarydemo/libraryDemo',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        let newfileName = Date.now().toString()+'.jpeg'
        req.newfileName = newfileName;
        cb(null, newfileName)
      }
    })
  })
  module.exports = upload;