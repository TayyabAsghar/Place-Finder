import { Router } from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

const router = Router();

router.post("/create", async (req, res) => {
    try {
        const { customer, listing, host, endDate, startDate, totalPrice, days } = req.body;
        const list = await Listing.findById(listing);
        const newBooking = new Booking({ customer, listing: list, host, endDate, startDate, totalPrice, days });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
    }
}).get("/trips/:tripId", async (req, res) => {
    try {
        const { tripId } = req.params;
        const trips = await Booking.findById(tripId).populate({
            path: 'listing',
            populate: {
                path: 'creator',
                model: User,
                select: '_id name profileImagePath email'
            }
        });

        res.status(202).json(trips);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
}).get("/reservations/:resId", async (req, res) => {
    try {
        const { resId } = req.params;
        const trips = await Booking.findById(resId).populate({
            path: 'customer',
            model: User,
            select: '_id name profileImagePath email'
        });

        res.status(202).json(trips);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
});

export default router;