const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const ErrorHandler = require("../utils/ErrorHandler");
const { cloudinaryUploadImg } = require("../config/cloudinary");
const fs = require("fs");
const validateMongoDbId = require("../utils/validateMongodbid");

const createProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      const productData = req.body;
      productData.shop = shop;

      const product = await Product.create(productData);
      res.status(201).json(product);
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getProduct = await Product.findById(id).populate("ratings.postedBy");
    res.json(getProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    console.log(req.query);
    const keyword = req.query.title
      ? {
          title: {
            $regex: req.query.title,
            $options: "i",
          },
        }
      : {};
    // const products = await Product.find({ ...keyword });
    // loại trừ các trường hợp đặc biệt
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    // let query = Product.find(JSON.parse(queryStr));
    let query = Product.find({ ...keyword });

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination (phân trang)
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit ? req.query.limit : 12;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    console.log(page, limit, skip);
    const productCount = await Product.countDocuments({ ...keyword });
    if (req.query.page) {
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const products = await query;
    res.json({ products, page, pages: Math.ceil(productCount / limit) });
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProductToCategory = asyncHandler(async (req, res) => {
  try {
    const allProduct = await Product.find({
      $or: [
        {
          category: {
            $regex: req.params.key,
            $options: "i",
          },
        },
        {
          name: {
            $regex: req.params.key,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });
    res.json(allProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProductAdmin = asyncHandler(async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });
    res.json(allProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const checkUserBuyProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Tìm kiếm đơn hàng có sản phẩm có _id là id, thuộc user có _id là userId, và có status là "Delivered"
    const order = await Order.findOne({
      "cart._id": id,
      "user._id": `${userId}`,
      status: "Delivered",
    });
    if (order) {
      // Nếu tìm thấy đơn hàng, tìm kiếm sản phẩm trong đơn hàng
      const product = order.cart.find((item) => item._id === id);

      if (product) {
        // Nếu sản phẩm được tìm thấy trong đơn hàng, trả về thông tin đơn hàng
        res.json(order);
      } else {
        // Nếu không tìm thấy sản phẩm trong đơn hàng, trả về lỗi
        res.status(404).json({ message: "Product not found in order" });
      }
    } else {
      // Nếu không tìm thấy đơn hàng, trả về lỗi
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    // Nếu có lỗi xảy ra trong quá trình xử lý, trả về lỗi
    res.status(500).json({ message: err.message });
  }
});

const rating = asyncHandler(async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user: req?.user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = Math.round((avg / product.reviews.length) * 10) / 10;

    await product.save({ validateBeforeSave: false });

    res.status(200).json(product);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports = {
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
  //   getSalesByMonth,
};
