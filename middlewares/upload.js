import multer from "multer";
import path from "node:path";

import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, callback)=> {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB
};

const fileFilter = (req, file, callback) => {
  const allowedExts = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = file.originalname.split('.').pop().toLowerCase();

  if (!allowedExts.includes(extension)) {
    return callback(HttpError(400, `Only images (${allowedExts.join(', ')}) are allowed`));
  }

  callback(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;