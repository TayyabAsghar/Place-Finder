import multer from "multer";
import { Router } from "express";
import { Types } from "mongoose";
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
        let listings;
        const qCategory = req.query.category;

        if (qCategory)
            listings = await Listing.find({ category: qCategory }).populate("creatorId");
        else
            listings = await Listing.find().populate("creatorId");

        res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Fail to fetch listings", error: err.message });
    }
}).post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const listingPhotos = req.files;
        const creatorId = new Types.ObjectId(String(req.body.creatorId));

        if (!listingPhotos) return res.status(400).send("No files uploaded.");

        const listingPhotoPaths = listingPhotos.map(file => file.path);
        const newListing = new Listing({ creatorId, listingPhotoPaths, ...req.body });

        await newListing.save();

        res.status(200).json(newListing);
    } catch (err) {
        console.error(err);
        res.status(409).json({ message: "Failed to create Listing", error: err.message });
    }
});

export default router;