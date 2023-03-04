const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => { console.log(err.message) });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async set(key, value, dur) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, dur, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    };


    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    };
}

const redisClient = RedisClient;
module.exports = redisClient;