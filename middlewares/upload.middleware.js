import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/listings/"),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${new Date().now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    }
});

const upload = multer({ storage });

export default upload;