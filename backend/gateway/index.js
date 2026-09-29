import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();
import cors from "cors"
import morgan from "morgan";
import proxy from "express-http-proxy";
import { protectMiddleware } from "./middleware/protectMiddleware.js";
import { getCurrentUser } from "./controller/user.controller.js";

const port = process.env.PORT || 8000;

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

// ---------Cookie Parser--------//
app.use(cookieParser());
app.use(morgan("dev"));

// ---------------- Route-------------

app.use("/auth",proxy(process.env.AUTH_SERVIECE))
app.get("/api/me", protectMiddleware,getCurrentUser)

app.get("/", (req, res) => {
    res.json({ message: "Hellow from gateway" });
});

app.listen(port, () => {
    console.log(`gateway started at ${port}`);
});
