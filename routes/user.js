import { Types } from "mongoose";
import { Router } from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

const router = Router();

router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params;
        const trips = await Booking.find({ customer: userId });

        res.status(202).json(trips);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
}).get("/:userId/reservations", async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Booking.find({ host: userId }).populate({
            path: 'customer',
            model: User,
            select: '_id name profileImagePath email'
        });
        res.status(202).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find reservations!", error: err.message });
    }
}).get("/:userId/wishes", async (req, res) => {
    try {
        const { userId } = req.params;
        const wishList = await Listing.find({ likedBy: { $in: [new Types.ObjectId(userId)] } });
        res.status(202).json(wishList);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find reservations!", error: err.message });
    }
}).get("/:userId/properties", async (req, res) => {
    try {
        const { userId } = req.params;
        const properties = await Listing.find({ creator: userId });
        res.status(202).json(properties);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find reservations!", error: err.message });
    }
}).patch("/:userId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const list = await Listing.findById(listingId);
        let message = "Listing is removed from wish list";
        const index = list.likedBy.indexOf(new Types.ObjectId(userId));

        if (index > -1) list.likedBy.splice(index, 1);
        else {
            list.likedBy.push(userId);
            message = "Listing is added to wish list";
        }

        await list.save();
        res.status(200).json({ message: message, list: list });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message });
    }
});

export default router;