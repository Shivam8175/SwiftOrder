import multer from "multer";

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (/image\/.*/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File is not an image"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export default upload;
