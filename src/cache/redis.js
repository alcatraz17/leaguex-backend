const redis = require('redis');

const redisClient = async () => {
  const redisClient = await redis
    .createClient()
    .on('error', (err) => {
      console.error('Redis error:', err);
    })
    .connect();

  return redisClient;
};

const set = async (key, time, value) => {
  const cache = await redisClient();
  const response = await cache.set(JSON.stringify(key), JSON.stringify(value), {
    EX: time
  });

  return response;
};

const get = async (key) => {
  const cache = await redisClient();
  const response = await cache.get(key);

  return response;
};

module.exports = { redisClient, set, get };
