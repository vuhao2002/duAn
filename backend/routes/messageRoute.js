const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllMessages,
} = require("../controller/messageController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-new-message", authMiddleware, createMessage);

router.get("/get-all-messages/:id", authMiddleware, getAllMessages);

module.exports = router;
