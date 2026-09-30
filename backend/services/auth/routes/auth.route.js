import express from "express"
import { login, logOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login",login)
router.post("/logout",logOut)

export default router;