/* eslint-disable linebreak-style */
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient()
      .on('error', (err) => {
        console.log(err);
      });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(value) {
    const data = await this.client.GET(value);
    return data;
  }

  async set(key, value, duration) {
    await this.client.SETEX(key, value, duration);
    const data = await this.client.GET(key);
    return data;
  }

  async del(key) {
    this.client.DEL(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
