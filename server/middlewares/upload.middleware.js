import multer from "multer";
import { AcceptedImageTypes } from "../libs/constants.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/"),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const fileFilter = (req, file, cb) => {
    if (AcceptedImageTypes.includes(file.mimetype)) cb(null, true);
    else cb({ message: "Unsupported File Format." }, false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;