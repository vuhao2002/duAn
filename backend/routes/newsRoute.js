const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  getAllNews,
  deleteNews,
  updateNews,
} = require("../controller/newsController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-news", authMiddleware, isAdmin, createNews);

router.get("/get-news/:id", getNews);

router.get("/get-all-news", getAllNews);

router.delete("/delete-news/:id", authMiddleware, isAdmin, deleteNews);

router.put("/update-news/:id", authMiddleware, isAdmin, updateNews);

module.exports = router;
