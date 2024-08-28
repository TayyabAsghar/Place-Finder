import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getCategoryList, getListingDetails, getListingBySearch, createList } from "../controllers/listing.controller.js";

const router = Router();

router.get("/", getCategoryList);
router.get("/search", getListingBySearch);
router.get("/:listingId", getListingDetails);
router.post("/create", verifyJWT, upload.array("listingPhotos"), createList);

export default router;