import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImagePath: {
        type: String,
        default: ""
    },
    wishList: [{
        default: [],
        ref: "Listing",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

const User = model("User", UserSchema);
export default User;