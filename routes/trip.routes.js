import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createTrip, getTripDetails, getResDetails } from "../controllers/trip.controller.js";

const router = Router();

router.post("/create", verifyJWT, createTrip);
router.get("/trips/:tripId", verifyJWT, getTripDetails);
router.get("/reservations/:resId", verifyJWT, getResDetails);

export default router;