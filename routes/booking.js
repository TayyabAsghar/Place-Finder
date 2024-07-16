import { Router } from "express";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

const router = Router();

router.post("/create", async (req, res) => {
    try {
        const { customer, listing, host, endDate, startDate, totalPrice } = req.body;
        const list = await Listing.findById(listing);
        const newBooking = new Booking({ customer, listing: list, host, endDate, startDate, totalPrice });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
    }
});

export default router;