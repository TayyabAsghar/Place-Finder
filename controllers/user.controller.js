import { Types } from "mongoose";
import User from "../models/user.model.js";
import ApiError from "../libs/apiError.js";
import Trip from "../models/trip.model.js";
import Listing from "../models/listing.model.js";
import asyncHandler from "../libs/asyncHandler.js";
import PlaceDetails from "../models/placeDetails.model.js";
import { getListingDetailsByID, getListingDetailsByCreatorID } from "./listing-details.controller.js";

export const getUserTripList = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "User id is missing.");

    const trips = await Trip.find({ customer: userId }).populate({
        path: "placeDetails",
        model: PlaceDetails
    });

    res.status(202).json(trips);
});

export const getUserResList = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "User id is missing.");

    const reservations = await Trip.find({ host: userId }).populate({
        path: "placeDetails",
        model: PlaceDetails
    });

    res.status(202).json(reservations);
});

export const getUserWishList = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "User id is missing.");

    const user = await User.findById(userId).populate({
        path: "wishList",
        populate: {
            path: "placeDetails",
            model: PlaceDetails
        }
    });
    const wishListIds = user.wishList.map(item => item._id);

    res.status(202).json({ wishListIds, wishList: user.wishList });
});

export const getUserPropList = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "User id is missing.");

    const properties = await Listing.find({ creator: userId }).populate({
        path: "placeDetails",
        model: PlaceDetails
    });

    res.status(202).json(properties);
});

export const updateUserWishList = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { listingId } = req.params;
    let message = "Listing is removed from wish list";

    if (!(userId && listingId)) throw new ApiError(400, "Some fields are missing.");

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User doesn't exists.");

    const listingObjectId = new Types.ObjectId(`${listingId}`);
    const userIndex = user.wishList.indexOf(listingObjectId);

    if (userIndex > -1) user.wishList.splice(userIndex, 1);
    else {
        user.wishList.push(listingObjectId);
        message = "Listing is added to wish list";
    }

    await user.save();
    res.status(200).json({ message: message, list: user.wishList });
});

export const getUserWishDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { listingId } = req.params;

    if (!(userId && listingId)) throw new ApiError(400, "Some fields are missing.");

    const user = await User.findOne({ _id: userId, wishList: { $in: [listingId] } });

    if (!user) throw new ApiError(404, "WishList doesn't have such list.");

    const listing = await getListingDetailsByID(listingId);

    if (!listing) throw new ApiError(404, "Listing doesn't exits.");

    res.status(200).json(listing);
});

export const getUserPropDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { listingId } = req.params;

    if (!(userId && listingId)) throw new ApiError(400, "Some fields are missing.");

    const listing = await getListingDetailsByCreatorID(listingId, userId);

    if (!listing) throw new ApiError(404, "Listing doesn't exits.");

    res.status(200).json(listing);
});

export const getUserResDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { resId } = req.params;

    if (!(userId && resId)) throw new ApiError(400, "Some fields are missing.");

    const reservation = await Trip.findOne({ _id: resId, host: userId }).populate({
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

    if (!reservation) throw new ApiError(404, "Listing doesn't exits.");

    res.status(200).json(reservation);
});

export const getUserTripDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { tripId } = req.params;

    if (!(userId && tripId)) throw new ApiError(400, "Some fields are missing.");

    const trip = await Trip.findOne({ _id: tripId, customer: userId }).populate({
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

    if (!trip) throw new ApiError(404, "Listing doesn't exits.");

    res.status(200).json(trip);
});