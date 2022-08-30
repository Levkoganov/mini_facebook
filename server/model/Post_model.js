const mongoose = require('mongoose');
const { Schema } = mongoose;

// Post schema
const postSchema = Schema({
  header: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  
  likes: {
    type: Number,
    default: 0
  },

  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

module.exports = mongoose.model('Post', postSchema);