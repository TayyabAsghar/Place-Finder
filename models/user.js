import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImagePath: {
        type: String,
        default: "",
    },
    tripList: {
        type: Array,
        default: [],
    },
    wishList: {
        type: Array,
        default: [],
    },
    propertyList: {
        type: Array,
        default: [],
    },
    reservationList: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

const User = model("User", UserSchema);
export default User;