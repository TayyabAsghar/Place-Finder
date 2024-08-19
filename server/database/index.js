import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`, {
            dbName: process.env.DATABASE_NAME
        });
        console.log(`Connected Host: ${connectionInstance.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;