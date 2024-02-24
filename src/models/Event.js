const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  event_id: Number,
  sport_id: {
    type: Number,
    ref: 'Sport'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
