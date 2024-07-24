import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    wishList: [{
        default: [],
        ref: "Listing",
        type: Schema.Types.ObjectId
    }],
    refreshToken: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return JWT.sign({
        _id: this._id,
        email: this.email
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    });
};

UserSchema.methods.generateRefreshToken = function () {
    return JWT.sign({ _id: this._id },
        process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
    });
};

const User = model("User", UserSchema);
export default User;