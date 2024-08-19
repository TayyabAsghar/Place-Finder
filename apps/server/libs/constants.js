import { config } from "dotenv";
config();

export const options = {
    path: "/",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,  // 1 year
    secure: process.env.NODE_ENV === "PROD",
    sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
    domain: process.env.NODE_ENV === "PROD" ? process.env.CLIENT_BASE_URL.split("://")[1] : "localhost"
};

export const AcceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];