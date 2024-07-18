import cors from "cors";
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import tripRouter from "./routes/trip.js";
import userRouter from "./routes/user.js";
import listingRouter from "./routes/listing.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* Routes */
app.use('/auth', authRouter);
app.use('/trip', tripRouter);
app.use('/users', userRouter);
app.use('/listing', listingRouter);

config();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DATABASE_NAME
}).then(() => {
    app.listen(PORT, () => console.log(`Server is up and listing on port ${PORT} ...`));
}).catch(err => console.error(err));

