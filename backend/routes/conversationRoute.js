const express = require("express");
const router = express.Router();

const {
  createConversation,
  getAllConversationsShop,
  getAllConversationsUser,
  uploadLastMessage,
} = require("../controller/conversationController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-new-conversation", authMiddleware, createConversation);

router.get(
  "/get-all-conversation-shop/:id",
  authMiddleware,
  isAdmin,
  getAllConversationsShop
);

router.get(
  "/get-all-conversation-user/:id",
  authMiddleware,
  getAllConversationsUser
);

router.put("/update-last-message/:id", authMiddleware, uploadLastMessage);

module.exports = router;
