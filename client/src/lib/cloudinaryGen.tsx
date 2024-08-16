import { Cloudinary } from "@cloudinary/url-gen";

const cloudinaryGen = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
});

export default cloudinaryGen;