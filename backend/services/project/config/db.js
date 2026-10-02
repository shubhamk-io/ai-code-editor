import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected 🚀");
    } catch (error) {
        console.log("MongoDB connection Failed:", error);
        process.exit(1);
    }
};
