import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
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
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Booking = model("Booking", BookingSchema);
export default Booking;