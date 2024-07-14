import { Router } from "express";
import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";

const router = Router();

router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params;
        const trips = await Booking.find({ customerId: userId }).populate("customer host listing");
        res.status(202).json(trips);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
}).patch("/:userId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");

        const favoriteListing = user.wishList.find(item => item._id.toString() === listingId);

        if (favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList });
        } else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList });
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message });
    }
});

export default router;