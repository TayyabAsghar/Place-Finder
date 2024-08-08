import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { parse, join } from "path";
import cookieParser from "cookie-parser";
import connectDB from "./database/index.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import tripRouter from "./routes/trip.routes.js";
import baseRouter from "./routes/base.routes.js";
import listingRouter from "./routes/listing.routes.js";

config();
const app = express();
const __dirname = parse(import.meta.dirname).dir;

app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
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
