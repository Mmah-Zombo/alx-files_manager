/* eslint-disable linebreak-style */
import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.connected = true;
    this.client.on('error', (err) => {
      console.log(err.message);
      this.client.connected = false;
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    return promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
