import "dotenv/config"
import express from "express" 
import {connectDb} from "/config/db.js"
import cookieParser from "cookie-parser"



const port = process.env.PORT 

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/"router) // es router ko import kerna hai  ------------ imp
app.use("/api/file", (req , res) => {
    res.json(
        Message: "Hello from file page"
    )
})

app.listen(port, () => {
    connectDb();
    console.log(`File services started on PORT: ${port}`)
})