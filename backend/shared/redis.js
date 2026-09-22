// config redis

import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL);

// if redis connect console(redis connected)
redis.on("connect", () => {
    console.log("redis connected")
})

export default redis