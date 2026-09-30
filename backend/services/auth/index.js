import "dotenv/config"
import express from "express"
import { connectDb } from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/auth.route.js";

const port = process.env.PORT || 8001

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", router)
app.get("/api/auth", (req, res) => {
  res.json({ Message: "Hello from Auth services" })
})

app.listen(port, () => {
  connectDb()
  console.log(`Auth services started at ${port}`)
})
