import multer from "multer";
import { Router } from "express";
import { Types } from "mongoose";
import User from "../models/User.js";
import Listing from "../models/Listing.js";

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/listings/"),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const router = Router();
const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        let listings = [];
        const qCategory = req.query.category;

        if (!qCategory) return res.status(200).json(listings);

        if (qCategory?.toLowerCase() === 'all')
            listings = await Listing.find();
        else
            listings = await Listing.find({ category: { $regex: new RegExp(qCategory, 'i') } });

        res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}).post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const listingPhotos = req.files;
        const creator = new Types.ObjectId(String(req.body.creatorId));

        if (!listingPhotos) return res.status(400).json({ message: "No files uploaded." });

        const listingPhotoPaths = listingPhotos.map(file => file.path);
        const newListing = new Listing({ creator, listingPhotoPaths, ...req.body });
        await newListing.save();

        res.status(200).json(newListing);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}).get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId).populate({
            path: 'creator',
            model: User,
            select: '_id name profileImagePath email'
        });

        if (!listingPhotos) return res.status(404).json({ message: "No Listing found with such id." });
        res.status(200).json(listing);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}).get("/search/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const listings = await Listing.find({
            $or: [
                { category: { $regex: search, $options: "i" } },
                { title: { $regex: search, $options: "i" } }
            ]
        });

        res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;