import { Router } from "express";
import Booking from "../models/Booking.js";

const router = Router();

router.post("/create", async (req, res) => {
    try {
        const newBooking = new Booking({ ...req.body });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
    }
});

export default router;