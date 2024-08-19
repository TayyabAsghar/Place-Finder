import { Schema, model } from "mongoose";

const TripSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    placeDetails: {
        type: Schema.Types.ObjectId,
        ref: "PlaceDetails",
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Trip = model("Trip", TripSchema);
export default Trip;