import User from "../models/user.model.js";
import ApiError from "../libs/apiError.js";
import { options } from "../libs/constants.js";
import { hashPassword } from "../libs/utils.js";
import asyncHandler from "../libs/asyncHandler.js";

const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token.");
    }
};

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) throw new ApiError(400, "Some fields are missing.");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, "User already exists.");

    /* Hash the password */
    const hashedPassword = await hashPassword(password);

    const newUser = new User.create({
        name,
        password: hashedPassword,
        email: email.toLowerCase()
    });

    if (!newUser) throw new ApiError(500, "Something went wrong while creating the user.");

    res.status(201).json({ message: "User registered successfully!", user: newUser });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) throw new ApiError(400, "Some fields are missing.");

    const userData = await User.findOne({ email });

    if (!userData) throw new ApiError(400, "User doesn't exist.");

    const isMatch = userData.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Invalid Credentials.");

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(userData);

    const user = {
        _id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        wishList: userData.wishList,
        createdAt: userData.createdAt
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ user, message: "User logged In Successfully" });
});

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    }, {
        new: true
    });

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out Successfully" });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) throw new ApiError(401, "Unauthorized request");

        const decodedToken = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) throw new ApiError(401, "Invalid refresh token");
        if (refreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used");

        const { accessToken, newRefreshToken } = generateAccessAndRefreshTokens(user);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({ message: "Access token refreshed Successfully" });
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});