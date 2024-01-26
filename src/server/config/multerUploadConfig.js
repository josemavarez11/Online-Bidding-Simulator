import multer from "multer";
import storage from "./multerStorageConfig.js";

const upload = multer({
    storage: storage
});

export default upload;