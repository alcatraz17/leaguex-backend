const mongoose = require('mongoose');
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: String,
  sport_id: Number
});

const Sport = mongoose.model('Sport', sportSchema);
module.exports = Sport;
