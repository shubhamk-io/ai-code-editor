import "dotenv/config"
import express from "express"
import { connectDb } from "./config/db.js"
import cookieParser from "cookie-parser"



const port = process.env.PORT || 8002

const app = express()

app.use(express.json());
app.use(cookieParser())


app.use("/api/project", (req, res) => {
    res.json(
        {
            Message: "Hello from project page"
        }
    )
})

app.listen(port, () => {
    connectDb()
    console.log(`Project Services started at ${port}`)
})