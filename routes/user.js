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
        const reservations = await Booking.find({ host: userId });
        res.status(202).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find reservations!", error: err.message });
    }
}).get("/:userId/wishes", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("wishList");
        const wishListIds = user.wishList.map(item => item._id);
        res.status(202).json({ wishListIds, wishList: user.wishList });
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
        const user = await User.findById(userId);
        let message = "Listing is removed from wish list";
        const listingObjectId = new Types.ObjectId(listingId);
        const userIndex = user.wishList.indexOf(listingObjectId);

        if (userIndex > -1) user.wishList.splice(userIndex, 1);
        else {
            user.wishList.push(listingObjectId);
            message = "Listing is added to wish list";
        }

        await user.save();
        res.status(200).json({ message: message, list: user.wishList });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;