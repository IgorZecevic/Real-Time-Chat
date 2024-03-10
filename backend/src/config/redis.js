const Redis = require('ioredis');
const redisClient = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = redisClient;
