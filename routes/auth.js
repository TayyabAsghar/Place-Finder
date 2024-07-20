import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { Router } from "express";
import User from "../models/User.js";
import { hashPassword } from "../libs/utils.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists!" });

        /* Hash the password */
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}).post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) return res.status(404).json({ message: "User doesn't exist!" });

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials!" });

        const token = JWT.sign({ id: userData._id }, process.env.JWT_SECRET);
        const user = {
            _id: userData.id,
            name: userData.name,
            email: userData.email,
            wishList: userData.wishList,
            createdAt: userData.createdAt,
            profileImagePath: userData.profileImagePath
        };

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;