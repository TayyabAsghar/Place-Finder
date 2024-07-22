import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../libs/apiError.js";
import asyncHandler from "../libs/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(' ')[1];

        if (!token) throw new ApiError(401, "Unauthorized request");

        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("_id");

        if (!user) throw new ApiError(401, "Invalid Access Token");

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export default verifyJWT;