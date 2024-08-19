import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import cookieParser from "cookie-parser";
import ApiError from "./libs/apiError.js";
import connectDB from "./database/index.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import tripRouter from "./routes/trip.routes.js";
import baseRouter from "./routes/base.routes.js";
import asyncHandler from "./libs/asyncHandler.js";
import listingRouter from "./routes/listing.routes.js";

config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "..", "client", "build")));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL
}));
app.set('trust proxy', 1);

/* Routes */
app.use('/api/', baseRouter);
app.use('/api/auth', authRouter);
app.use('/api/trip', tripRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);
app.use('/api/*', asyncHandler(async (req, res) => {
    throw new ApiError(404, "Route doesn't exist.");
}));
app.use('*', (req, res) => {
    res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

connectDB().then(() =>
    app.listen(PORT, () => console.log(`Server is up and listing on port ${PORT} ...`))
);
