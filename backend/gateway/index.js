import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { protectMiddleware } from "./middleware/protectMiddleware.js";
import { getCurrentUser } from "./controller/user.controller.js";

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(morgan("dev"));

// send /api/auth/* to auth service (keep full path so /api/auth/login works)
app.use("/api/auth", proxy(process.env.AUTH_SERVIECE, {
  proxyReqPathResolver: (req) => req.originalUrl,
}));


// first check user hai ya nhi using protectMiddleware the next go to project
app.use("/api/project",protectMiddleware, proxy(process.env.PROJECT_SERVIECE, {
  proxyReqPathResolver: (req) => req.originalUrl,
}));

app.get("/api/me", protectMiddleware, getCurrentUser);

app.get("/", (req, res) => {
  res.json({ message: "Hello from gateway" });
});

app.listen(port, () => {
  console.log(`gateway started at ${port}`);
});
