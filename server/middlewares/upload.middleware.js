import multer from "multer";
import { AcceptedImageTypes } from "../libs/constants.js";

const fileFilter = (req, file, cb) => {
    if (AcceptedImageTypes.includes(file.mimetype)) cb(null, true);
    else cb({ message: "Unsupported File Format." }, false);
};

const upload = multer({ fileFilter: fileFilter });

export default upload;