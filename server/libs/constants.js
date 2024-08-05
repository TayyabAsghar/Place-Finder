export const options = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,  // 1 year
    domain: process.env.CLIENT_BASE_URL,
    secure: process.env.NODE_ENV === "PROD"
};