const User = require('../models/User');
const Post = require('../models/Post');
const Sport = require('../models/Sport');
const Event = require('../models/Event');

// Calculate Popularity Score and User Interests
async function calculatePopularityAndInterests(user, posts) {
  try {
    const sportIds = new Set(posts.map((post) => post.sport_id));

    const sports = await Sport.find({
      sport_id: { $in: [...sportIds] }
    }).lean();
    const events = await Event.find({
      event_id: { $in: posts.map((post) => post.event_id) }
    }).lean();

    // Calculate Popularity Score
    const popularityScore = posts.reduce(
      (acc, post) => acc + post.likes + post.comments,
      0
    );
    user.popularityScore = popularityScore;

    // Map sports and events to user interests
    const userInterests = new Set(user.interests);
    sports.forEach((sport) => userInterests.add(sport.name));
    events.forEach((event) => userInterests.add(event.name));

    user.interests = [...userInterests];
    await user.save();
  } catch (error) {
    console.error('Error calculating popularity and interests:', error);
  }
}

module.exports = calculatePopularityAndInterests;
