const Users = require('../models/User');

async function getRecommendations(user, limit = 15, page = 1, pageSize = 10) {
  const recommendations = await Users.find(
    {
      user_id: { $ne: user.user_id }, // Exclude the current user
      popularityScore: {
        $gte: user.popularityScore - 500,
        $lte: user.popularityScore + 500
      }, // Adjust the range as needed
      interests: { $in: user.interests }
    },
    {
      _id: 0,
      __v: 0,
      interests: 0,
      popularityScore: 0
    }
  )
    .sort({ popularityScore: -1 })
    .skip((page - 1) * pageSize)
    .limit(limit)
    .lean();

  return recommendations;
}

module.exports = getRecommendations;
