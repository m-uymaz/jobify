import mongoose from "mongoose";

const connectDB = (url: any) => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url);
}

export default connectDB;