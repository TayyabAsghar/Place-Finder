import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`, {
            dbName: process.env.DATABASE_NAME
        });
        if (process.env.NODE_ENV !== "PROD")
            console.log(`Connected Host: ${connectionInstance.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;