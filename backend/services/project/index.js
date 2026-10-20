import "dotenv/config"
import express from "express"
import { connectDb } from "./config/db.js"
import cookieParser from "cookie-parser"
import router from "./Routes/project.route.js"



const port = process.env.PORT || 8002

const app = express()

app.use(express.json());
app.use(cookieParser())


app.use("/", router)

app.listen(port, () => {
    connectDb()
    console.log(`Project Services started at ${port}`)
})