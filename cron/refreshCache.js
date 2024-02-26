const Users = require('../src/models/User');
const Posts = require('../src/models/Post');
const calculateRecommendations = require('../src/utils/calculateRecommendations');
const calculatePopularityAndInterests = require('../src/utils/calculatePopularity');
const { set } = require('../src/cache/redis');

const { redisClient } = global;

// Refresh cache every 15 minutes

const refreshCache = async () => {
  try {
    console.log('Refreshing recommendations cache...');
    const userCount = await Users.countDocuments({});
    let page = 0;
    const limit = 10;
    while (page < Math.ceil(userCount / limit)) {
      const users = await Users.find()
        .skip(page * limit)
        .limit(limit);
      for (let user of users) {
        const posts = await Posts.find({ user_id: user.user_id }).lean();

        // Calculate popularity score and user interests
        await calculatePopularityAndInterests(user, posts);

        const recommendations = await calculateRecommendations(user);
        set(user.user_id.toString(), 900, recommendations);
      }
      page++;
    }
    console.log('Recommendations cache refreshed...');
  } catch (error) {
    console.error('Error refreshing cache:', error);
  }
};

module.exports = refreshCache;
