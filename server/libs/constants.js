export const options = {
    secure: process.env.NODE_ENV === "PROD",
    httpOnly: process.env.NODE_ENV === "PROD",
    sameSite: process.env.NODE_ENV === "PROD" ? "strict" : "none"
};