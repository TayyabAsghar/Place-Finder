import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getCategoryList, getListingDetails, getListingBySearch, createList } from "../controllers/listing.controller.js";

const router = Router();

router.get("/", getCategoryList);
router.get("/:listingId", getListingDetails);
router.get("/search/:search", getListingBySearch);
router.post("/create", verifyJWT, upload.array("listingPhotos"), createList);

export default router;