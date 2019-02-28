const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);
