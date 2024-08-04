import cors from "cors";
import { join } from "path";
import express from "express";
import { config } from "dotenv";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import connectDB from "./database/index.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import tripRouter from "./routes/trip.routes.js";
import baseRouter from "./routes/base.routes.js";
import listingRouter from "./routes/listing.routes.js";

config();
const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(join("public", "favicon.ico"), {
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRY
}));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL
}));

/* Routes */
app.use('/', baseRouter);
app.use('/auth', authRouter);
app.use('/trip', tripRouter);
app.use('/user', userRouter);
app.use('/listing', listingRouter);

const PORT = process.env.PORT || 4000;

connectDB().then(() =>
    app.listen(PORT, () => console.log(`Server is up and listing on port ${PORT} ...`))
);
