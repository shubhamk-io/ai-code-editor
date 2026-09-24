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

  let user = await User.findOne({
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

user = newUser;   // <-- yahan "return newUser" ki jagah user ko assign karo taaki neeche wala cookie-setting code chale

}


 // generate session for user 
const sessionId = crypto.randomUUID() // randoumUUI using for generate uniqe id

await redis.set(`session-${sessionId}`,JSON.stringify( {  // set userData in redis
  name:user.name,
  userId:user._id,
  email:user.email,
  avatar:user.avatar
}), "EX",7*24*60*60) // SETTING FOR EXPIRE SESSION ID
// using json.stringify pass/send data json to string 


// store session Id in cookie not data  or // using session id  to get data easily
res.cookie("session", sessionId,{
httpOnly:true,
secure:false,
sameSite:"strict",   // <-- "samesite" lowercase tha, express/cookie package sirf "sameSite" (camelCase) ko recognize karta hai
maxAge:7*24*60*60*1000
})

// return response and user.
return res.status(200).json(user)

  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


// Logout function create
export const logOut = async (req, res) => { // req uising to get data  
  // res using to set data.

  try { // 1. get session id in cookies
    const sessionId = req.cookies?.session

    // using key to delete session id
    await redis.del(`session-${sessionId}`)
res.clearCookie("session") // delete cookie in cookies 

return res.status(200).json({message:"Logout successfully"})

  } catch (error) {
    return res.status(500).json({message:`Logout error ${error}`})
  }
}