import { Schema, model } from "mongoose";

export const ListingSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    aptSuite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    guestCount: {
        type: Number,
        required: true
    },
    bedroomCount: {
        type: Number,
        required: true
    },
    bedCount: {
        type: Number,
        required: true
    },
    bathroomCount: {
        type: Number,
        required: true
    },
    amenities: {
        type: Array,
        default: [],
        required: true
    },
    listingPhotoPaths: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    highlightDesc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Listing = model("Listing", ListingSchema);
export default Listing;