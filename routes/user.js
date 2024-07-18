import { Router } from "express";
import User from "../models/User.js";
import Trip from "../models/Trip.js";
import Listing from "../models/Listing.js";

const router = Router();

router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params;
        const trips = await Trip.find({ customer: userId });

        res.status(202).json(trips);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
}).patch("/:userId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const favoriteListing = user.wishList.find(item => item.toString() === listingId);
        let message = "Listing is removed from wish list";

        if (favoriteListing)
            user.wishList = user.wishList.filter(item => item.toString() !== listingId);
        else {
            user.wishList.push(listingId);
            message = "Listing is added to wish list";
        }

        await user.save().populate({ path: 'wishList', model: Listing });
        res.status(200).json({ message: message, wishList: user.wishList });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message });
    }
}).get("/:userId/reservations", async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Trip.find({ host: userId }).populate("customerId hostId listingId");
        res.status(202).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Can not find reservations!", error: err.message });
    }
});;

export default router;