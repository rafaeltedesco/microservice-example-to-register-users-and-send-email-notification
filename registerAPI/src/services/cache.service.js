const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://@redis_compose:6379'
});

const cacheData = async (key, data) => {
  await redisClient.connect();
  await redisClient.set(key, JSON.stringify(data));
  console.log('Data persisted in Redis!');
  await redisClient.disconnect();
};

const getCached = async (key) => {
  await redisClient.connect();
  const cachedData = await redisClient.get(key);
  await redisClient.disconnect();
  return cachedData;
};

module.exports = {
  cacheData,
  getCached,
};