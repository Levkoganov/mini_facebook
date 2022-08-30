const mongoose = require('mongoose');
const { Schema } = mongoose;

// Users schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    default: "USER"
  },

});

module.exports = mongoose.model('User', userSchema);