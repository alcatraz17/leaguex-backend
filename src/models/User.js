const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  interests: [String],
  user_id: Number
});

const User = mongoose.model('User', userSchema);
module.exports = User;
//
