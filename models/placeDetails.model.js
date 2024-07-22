import { Schema, model } from "mongoose";

const PlaceDetailsSchema = new Schema({
    category: {
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
    listingPhotoPaths: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const PlaceDetails = model("PlaceDetails", PlaceDetailsSchema);
export default PlaceDetails;