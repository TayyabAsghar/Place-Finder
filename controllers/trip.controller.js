import Trip from "../models/trip.model.js";
import ApiError from "../libs/apiError.js";
import Listing from "../models/listing.model.js";
import asyncHandler from "../libs/asyncHandler.js";

export const createTrip = asyncHandler(async (req, res) => {
    const { customer, listing, host, endDate, startDate, totalPrice, days } = req.body;

    if ([customer, listing, host, endDate, startDate, totalPrice, days].every(field => !Boolean(field)))
        throw new ApiError(400, "Some fields are missing.");

    const list = await Listing.findById(listing).select("-_id placeDetails");

    if (!list) throw new ApiError(404, "Listing not found.");

    const booking = await Trip.create({ customer, listing, host, endDate, startDate, totalPrice, days, placeDetails: list.placeDetails });

    if (!booking) throw new ApiError(500, "Something went wrong while creating the trip.");

    res.status(200).json({ booking, message: "Trip created successfully" });
});
