import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = await getAuth(app).verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    // TODO: DB mein user find/create karo (uid ya email se)

    return res.status(200).json({ user: { uid, email, name, picture } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};