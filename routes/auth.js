import bcrypt from "bcryptjs";
import { Router } from "express";
import JWT from "jsonwebtoken";
import User from "../models/user.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        /* Check if user exists */
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists!" });

        /* Hash the password */
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        /* Create a new User */
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}).post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        /* Check if user exists */
        const user = await User.findOne({ email });
        if (!user) return res.status(409).json({ message: "User doesn't exist!" });

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials!" });

        /* Generate JWT token */
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;