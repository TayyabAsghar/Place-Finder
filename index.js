import cors from "cors";
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import listingRouter from "./routes/listing.js";
import bookingRouter from "./routes/booking.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* Routes */
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/listing', listingRouter);
app.use('/booking', bookingRouter);

config();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DATABASE_NAME
}).then(() => {
    app.listen(PORT, () => console.log(`Server is up and listing on port ${PORT} ...`));
}).catch(err => console.error(err));

