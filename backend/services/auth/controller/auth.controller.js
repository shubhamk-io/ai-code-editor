import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import crypto from "crypto"
import redis from "../../../shared/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = await getAuth(app).verifyIdToken(token);
    console.log(decoded)

  const user = await User.findOne({
    firebaseUid : decoded.uid
  })

  // TODO: DB mein user find/create karo (uid ya email se)
  

if(!user){
//create user
const newUser = await User.create({
  firebaseUid:decoded.uid,
  name : decoded.name,
  email : decoded.email,
  avatar : decoded.picture
})

return newUser;

}
    return res.json({decoded})

    // generate session for user 
const sessionId = crypto.randomUUID() // rrandoumUUI using for generate uniqe id

await redis.set(`session-${sessionId}`,JSON.stringify( {  // set userData in redis
  name:user.name,
  userId:user._id,
  email:user.email,
  avatar:user.avatar
}))

// using json.stringify pass/send data json to string 

  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};