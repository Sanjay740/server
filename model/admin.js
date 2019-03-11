
const upload = require('./multer');
const Books = require('../schemas/books');
const singleUpload = upload.single('image')
const User =require('../schemas/users')
module.exports.upload = function (req, res) {
  singleUpload(req, res, function (err, some) {
    let requsetedData = JSON.parse(req.body.data);
    if (err) {
      res.status(401).json({
        success: false,
        message: "Failed to add book"
      });
    }
    else {
      const newBooks = new Books({
        title: requsetedData.bookName,
        author: requsetedData.authorName,
        year: requsetedData.year,
        image: req.newfileName,
        inStock: requsetedData.inStock,
        description: requsetedData.description
      });
      newBooks.save().then(book => {
        let obj = {
          success: true,
          message: "Book added successfully",
          data: book
        }
        res.json(obj)
      })
    }
  })
}

module.exports.fetchAllBook = function (req, res) {
  Books.find().then(book => {
    let obj = {
      data: book,
      success: true
    }
    res.json(obj)
  })
}

module.exports.fetchAllUser = function (req, res) {
  User.find({ userType: 'user'} ).then(user => {
    let obj = {
      data: user,
      success: true
    }
    res.json(obj)
  })
}



module.exports.updateBook = function(req ,res) {
  console.log(req.body)
   if(!!req.body.id)
   {
    Books.updateOne
    (
      {
        _id : req.body.id
      },
      {
        $set :
        {
          title : req.body.data.bookName,
          author : req.body.data.authorName,
          year : req.body.data.year,
          inStock : req.body.data.inStock,
          description :req.body.data.description
        }
      }, function(err, result) {
        if (err) throw err;
        else
        {
          let obj = {
            success: true
          } 
      
          res.json(obj) 
        }
      }
    )
   }
}

module.exports.editBook = function (req, res) {
  console.log(req.params)
  if(!!req.params.id)
  {
  Books.findOne({ _id: req.params.id }).then(book => {
    if(!!book)
    {
       let obj = {
      data: book,
      success: true
    } 

    res.json(obj)
    }
    else
    {
      let obj = {
        success: false
      } 
  
      res.json(obj)
    }
   })
}
else
{

}
}