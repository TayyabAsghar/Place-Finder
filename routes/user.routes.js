import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    getUserTripList, getUserWishList, getUserPropList, getUserResList, updateUserWishList, getUserTripDetails,
    getUserWishDetails, getUserResDetails, getUserPropDetails
} from "../controllers/user.controller.js";

const router = Router();

router.get("/trips", verifyJWT, getUserTripList);
router.get("/wishes", verifyJWT, getUserWishList);
router.get("/properties", verifyJWT, getUserPropList);
router.get("/reservations", verifyJWT, getUserResList);
router.patch("/:listingId", verifyJWT, updateUserWishList);
router.get("/trips/:tripId", verifyJWT, getUserTripDetails);
router.get("/wishes/:listingId", verifyJWT, getUserWishDetails);
router.get("/reservations/:resId", verifyJWT, getUserResDetails);
router.get("/properties/:listingId", verifyJWT, getUserPropDetails);

export default router;