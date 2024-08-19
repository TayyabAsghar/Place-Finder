import ApiError from "../libs/apiError.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import PlaceDetails from "../models/placeDetails.model.js";

export const getListingDetailsByID = async (listingId) => {
    if (!listingId) throw new ApiError(400, "Listing ID is missing.");

    const listing = await Listing.findById(listingId).populate([{
        path: 'creator',
        model: User,
        select: '_id name avatar email'
    }, {
        path: "placeDetails",
        model: PlaceDetails
    }]);

    if (!listing) throw new ApiError(404, "Listing doesn't exits.");

    return listing;
};

export const getListingDetailsByCreatorID = async (listingId, creatorId) => {
    if (!listingId) throw new ApiError(400, "Listing ID is missing.");

    const listing = await Listing.findOne({ _id: listingId, creator: creatorId }).populate([{
        path: 'creator',
        model: User,
        select: '_id name avatar email'
    }, {
        path: "placeDetails",
        model: PlaceDetails
    }]);

    if (!listing) throw new ApiError(404, "Listing doesn't exits.");

    return listing;
};