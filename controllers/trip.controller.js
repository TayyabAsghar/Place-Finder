import Trip from "../models/trip.model.js";
import ApiError from "../libs/apiError.js";
import Listing from "../models/listing.model.js";
import asyncHandler from "../libs/asyncHandler.js";
import PlaceDetails from "../models/placeDetails.model.js";

export const createTrip = asyncHandler(async (req, res) => {
    const { customer, listing, host, endDate, startDate, totalPrice, days } = req.body;

    if ([customer, listing, host, endDate, startDate, totalPrice, days].every(field => !Boolean(field)))
        throw new ApiError(400, "Some fields are missing.");

    const placeDetails = await Listing.findById(listing).select("placeDetails");

    if (!placeDetails) throw new ApiError(404, "Listing not found.");

    const booking = await Trip.create({ customer, listing, host, endDate, startDate, totalPrice, days, placeDetails: placeDetails._id });

    if (!booking) throw new ApiError(500, "Something went wrong while creating the trip.");

    res.status(200).json({ booking, message: "Trip created successfully" });
});

export const getTripDetails = asyncHandler(async (req, res) => {
    const { tripId } = req.params;

    if (!tripId) throw new ApiError(400, "Some fields are missing.");

    const trip = await Trip.findById(tripId).populate({
        path: "listing",
        populate: [{
            path: "creator",
            model: User,
            select: "_id name avatar email"
        }, {
            path: "placeDetails",
            model: PlaceDetails
        }]
    });

    if (!trip) throw new ApiError(404, "Can not find trip.");
    res.status(202).json(trip);
});

export const getResDetails = asyncHandler(async (req, res) => {
    const { resId } = req.params;

    if (!resId) throw new ApiError(400, "Some fields are missing.");

    const reservation = await Trip.findById(resId).populate({
        path: 'customer',
        model: User,
        select: '_id name avatar email'
    }).populate({
        path: "listing",
        populate: {
            path: "placeDetails",
            model: PlaceDetails
        }
    });

    if (!reservation) throw new ApiError(404, "Can not find reservation.");

    res.status(202).json(trips);
});