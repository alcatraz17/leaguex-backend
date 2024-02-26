const router = require('express-promise-router')();

const { set, get } = require('../cache/redis');
const User = require('../models/User');
const getRecommendations = require('../utils/calculateRecommendations');

router.get('/recommendations', async (req, res) => {
  const { user_id } = req.query;

  try {
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cachedData = await get(`${user_id}`);

    if (cachedData) {
      const recommendations = JSON.parse(cachedData);
      return res.json(recommendations);
    }


    // If not in cache, calculate recommendations
    const recommendations = await getRecommendations(user);

    // Cache recommendations
    await set(user_id, 900, recommendations);

    return res.json(recommendations);
  } catch (error) {
    console.error('Recommendation API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
