const express = require("express");
const router = express.Router();

const {
  createInfoShop,
  getShop,
  getAllShop,
  updateInfoShop,
  deleteShop,
} = require("../controller/shopController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-info-shop", authMiddleware, isAdmin, createInfoShop);

router.get("/get-shop/:id", getShop);
router.get("/", getAllShop);

router.put("/update-info-shop/:id", authMiddleware, isAdmin, updateInfoShop);

router.delete("/delete-shop/:id", authMiddleware, isAdmin, deleteShop);

module.exports = router;
