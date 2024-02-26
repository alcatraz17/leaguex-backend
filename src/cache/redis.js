const redis = require('redis');
const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = async () => {
  const redisClient = await redis
    .createClient({
      password: REDIS_PASSWORD,
      socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
      }
    })
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

  await cache.disconnect();

  return response;
};

const get = async (key) => {
  const cache = await redisClient();
  const response = await cache.get(key);

  return response;
};

module.exports = { redisClient, set, get };
