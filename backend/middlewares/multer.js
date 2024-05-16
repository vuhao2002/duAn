const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const productImgResize = async (req, res, next) => {
  console.log(req.files);
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
        fs.unlinkSync(`public/images/products/${file.filename}`); // Xóa tệp đầu vào sau khi xử lý
      })
    );
    next();
  } catch (error) {
    console.error(error);
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
};

module.exports = { uploadPhoto, productImgResize };
