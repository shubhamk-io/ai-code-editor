// config redis
import "dotenv/config"   // first load env this config redis 
import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL);

// if redis connect console(redis connected)
redis.on("connect", () => {
    console.log("redis connected")
})

// error chhupna nahi chahiye, ye add karo
redis.on("error", (err) => {
    console.error("redis error:", err.message)
})

export default redis