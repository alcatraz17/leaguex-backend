const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  post_id: Number,
  text: String,
  sport_id: {
    type: Number,
    ref: 'Sport'
  },
  event_id: {
    type: Number,
    ref: 'Event'
  },
  comments: Number,
  likes: Number,
  user_id: {
    type: Number,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
