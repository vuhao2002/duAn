const express = require("express");
const router = express.Router();

const { uploadPhoto, productImgResize } = require("../middlewares/multer");

const {
  createProduct,
  getProduct,
  getAllProduct,
  getAllProductAdmin,
  deleteProduct,
  updateProduct,
  rating,
  getAllProductToCategory,
  uploadImages,
  checkUserBuyProduct,
  // getSalesByMonth,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, isAdmin, createProduct);

router.get("/", getAllProduct);
router.get("/products", getAllProductAdmin);
router.get("/check-user/:id", authMiddleware, checkUserBuyProduct);
router.get("/category/:key", getAllProductToCategory);
router.get("/:id", getProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

module.exports = router;
