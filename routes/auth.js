import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/user.js";

const router = Router();

/* SignUP */
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        /* Check if user exists */
        const existingUser = await findOne({ email });
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
});

export default router;