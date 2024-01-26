import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'files');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "--" + file.originalname);
    }
});

export default storage;