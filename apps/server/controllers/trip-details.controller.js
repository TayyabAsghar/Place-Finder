import ApiError from "../libs/apiError.js";
import User from "../models/user.model.js";
import asyncHandler from "../libs/asyncHandler.js";
import PlaceDetails from "../models/placeDetails.model.js";

export const getResDetailsById = asyncHandler(async (resId) => {
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

    res.status(202).json(reservation);
});