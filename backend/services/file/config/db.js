import mongoose  from "mongoose";

export const connectDb = async () => {
    try {
        const connetion = await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected 🚀")
    } catch (error) {
        console.log( `File Db connection Error: ${error.message}`)
    }
}