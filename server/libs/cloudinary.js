import pLimit from 'p-limit';
import { config } from "dotenv";
import { unlinkSync } from "fs";
import ApiError from "../libs/apiError.js";
import { v2 as cloudinary } from 'cloudinary';

config();
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const deleteLocalImage = (localImagePath) => {
    try {
        unlinkSync(localImagePath);
    } catch (error) {
        console.error("Error deleting local file: ", error);
    }
};

export const UploadSingleImage = async (localImage) => {
    if (!localImage) return;

    try {
        const uploadedImage = await cloudinary.uploader.upload(localImage.path, {
            resource_type: "auto",
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
        });
        return uploadedImage.public_id;
    } catch (err) {
        console.error(err);
        throw new ApiError(500, err.message, "", localImage.originalname);
    } finally {
        deleteLocalImage(localImage.path);
    }
};

export const UploadMultipleImages = async (localImages) => {
    if (!localImages.length) return;

    try {
        const limit = pLimit(localImages.length < 10 ? localImages.length : 10);
        const imagesToUpload = localImages.map(image => limit(async () => await UploadSingleImage(image)));
        const settledPromises = await Promise.allSettled(imagesToUpload);
        const cloudinaryIds = settledPromises.filter(result => result.status === "fulfilled").map(result => result.value);
        const failedFiles = settledPromises.filter(result => result.status === "rejected")
            .map(result => { return { fileName: result.reason.error, message: result.reason.message }; });
        return { cloudinaryIds, failedFiles };
    } catch (err) {
        console.error(err);
    }
};
