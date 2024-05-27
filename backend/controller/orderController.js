const Order = require("../models/orderModel");
const sendMail = require("../utils/sendEmail");

const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const asyncHandler = require("express-async-handler");

const ErrorHandler = require("../utils/ErrorHandler");

// create new order
const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    cart.forEach(async (o) => {
      await updateOrder(o._id, o.qty);
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }
    res.status(201).json({
      success: true,
      orders,
    });
    const orderId = orders[0]._id;

    await sendMail({
      email: user.email,
      subject: "Đặt đơn hàng thành công!",
      message: `Đơn hàng của bạn có ID tra cứu là: "${orderId}" bạn có thể tra cứu nó trong trên trang web của chúng tôi! Cảm ơn!!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get order
const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all orders of user
const getAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// all orders --- for admin
const getAllOrdersForAdmin = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update order status for shop
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// give a refund ----- user

const giveRefund = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    if (order.user._id == JSON.stringify(req.user._id)) {
      return next(new ErrorHandler("You are not the account owner!", 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// accept the refund ---- shop
const acceptRefundRequest = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    if (order.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }
    order.status = req.body.status;

    await order.save();

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  updateOrderStatus,
  giveRefund,
  acceptRefundRequest,
};
