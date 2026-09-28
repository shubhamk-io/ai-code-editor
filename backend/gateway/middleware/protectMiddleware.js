import redis from "../../shared/redis.js";

export const protectMiddleware = async (req,res,next) => {
  try {
    // 1. get and check sessionId
    const sessionId = req.cookies?.session; // using req to get session id
    if (!sessionId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // 2. Get data and id by redis set key
    const result = await redis.get(`session-${sessionId}`);
    if(!result){
        return res.status(401).json({message:"Session not found"})
    }

    // redis mai humne json to string mai convert ker ker set kiya tha ab jb dubara hume ese protect middleware mai use kerna hai to usko json mai get ya conver kerna hoga
    // string to json conver suing json.parse method
    const data = JSON.parse(result);

    // create key to set user  and easily to access in user in controller
    req.user = data

    next();

  } catch (error) {
    return res.status(500).json({message:"Protect middleware error", error})
  }
};
