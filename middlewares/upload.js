const path = require("path");
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "tmp");

const multerConfig = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
