import { Types } from "mongoose";
import ApiError from "../libs/apiError.js";
import Listing from "../models/listing.model.js";
import asyncHandler from "../libs/asyncHandler.js";
import PlaceDetails from "../models/placeDetails.model.js";

export const getCategoryList = asyncHandler(async (req, res) => {
    let listings = [];
    const qCategory = req.query.category;

    if (!qCategory) throw new ApiError(400, "No Category selected.");

    if (qCategory?.toLowerCase() === 'all')
        listings = await Listing.find().populate("placeDetails");
    else
        listings = await Listing.find({ category: { $regex: new RegExp(qCategory, 'i') } }).populate("placeDetails");

    res.status(200).json(listings);
});

export const createList = asyncHandler(async (req, res) => {
    const listingPhotos = req.files || [];
    const {
        creatorId, category, type, streetAddress, city, aptSuite, province, country, guestCount, bedroomCount,
        bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price
    } = req.body;

    if ([creatorId, category, type, streetAddress, city, aptSuite, province, country, guestCount, bedroomCount,
        bedCount, bathroomCount, title, description, highlight, highlightDesc, price]
        .every(field => !Boolean(field)))
        throw new ApiError(400, "Some fields are missing.");

    if (!amenities.length) throw new ApiError(400, "Some fields are missing.");
    if (!listingPhotos.length) throw new ApiError(400, "No files are uploaded.");

    const listingPhotoPaths = listingPhotos.map(file => file.path);
    const creator = new Types.ObjectId(String(creatorId));

    const placeDetails = await PlaceDetails.create({ category, city, province, country, listingPhotoPaths, title });

    if (!placeDetails) throw new ApiError(500, "Error while creating Listing Details.");

    const newListing = new Listing.create({
        creator, type, streetAddress, aptSuite, guestCount, bedroomCount, bedCount, bathroomCount, description,
        highlight, highlightDesc, price, placeDetails: placeDetails._id
    });

    if (!newListing) throw new ApiError(500, "Error while creating Listing.");

    res.status(200).json(newListing);
});

export const getListingDetails = asyncHandler(async (req, res) => {
    const { listingId } = req.params;

    if (!listingId) throw new ApiError(400, "Some fields are missing.");

    const listing = await Listing.findById(listingId).populate([{
        path: 'creator',
        model: User,
        select: '_id name avatar email'
    }, {
        path: "placeDetails",
        model: PlaceDetails
    }]);

    if (!listing) throw new ApiError(404, "Listing doesn't exits.");

    res.status(200).json(listing);
});

export const getListingBySearch = asyncHandler(async (req, res) => {
    const { search } = req.params;
    const listings = await Listing.find({
        $or: [
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } }
        ]
    }).populate([{
        path: 'creator',
        model: User,
        select: '_id name avatar email'
    }, {
        path: "placeDetails",
        model: PlaceDetails
    }]);

    res.status(200).json(listings);
});