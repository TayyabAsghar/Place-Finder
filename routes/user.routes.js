import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getUserTripList, getUserWishList, getUserPropList, getUserResList, updateUserWishList }
    from "../controllers/user.controller.js";

const router = Router();

router.get("/:userId/trips", verifyJWT, getUserTripList);
router.get("/:userId/wishes", verifyJWT, getUserWishList);
router.get("/:userId/properties", verifyJWT, getUserPropList);
router.get("/:userId/reservations", verifyJWT, getUserResList);
router.patch("/:userId/:listingId", verifyJWT, updateUserWishList);

export default router;