const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  updateOrderStatus,
  giveRefund,
  acceptRefundRequest,
} = require("../controller/orderController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-order", authMiddleware, createOrder);

router.get("/get-order/:id", getOrder);
router.get("/get-all-orders/:userId", authMiddleware, getAllOrders);

router.get(
  "/get-admin-all-orders",
  authMiddleware,
  isAdmin,
  getAllOrdersForAdmin
);

router.put(
  "/update-order-status/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

router.put("/order-refund/:id", authMiddleware, giveRefund);

router.put(
  "/order-refund-success/:id",
  authMiddleware,
  isAdmin,
  acceptRefundRequest
);

module.exports = router;
