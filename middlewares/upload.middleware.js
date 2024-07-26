import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/listings/"),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
    }
});

const upload = multer({ storage });

export default upload;