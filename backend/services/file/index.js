import "dotenv/config"
import express from "express"

import cookieParser from "cookie-parser"
import { connectDb } from "./config/db.js";
import router from "./routes/file.route.js";

const port = process.env.PORT || 8003;

const app = express();
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        message: "Hello from file service"
    });
});
app.use("/api/file", (req, res) => {
    res.json({
        message: "Hello from file page"
    })
})

app.use("/",router)

app.listen(port, () => {
    connectDb();
    console.log(`File services started on PORT: ${port}`)
})