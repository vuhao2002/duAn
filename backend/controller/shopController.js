const Shop = require("../models/shopModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createInfoShop = asyncHandler(async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    res.json(newShop);
  } catch (error) {
    throw new Error(error);
  }
});

const getShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getShop = await Shop.findById(id);
    res.json(getShop);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllShop = asyncHandler(async (req, res) => {
  try {
    const getAllShop = await Shop.find().sort({
      createdAt: -1,
    });
    res.json(getAllShop);
  } catch (error) {
    throw new Error(error);
  }
});

const updateInfoShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateShop = await Shop.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateShop);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteShop = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteShop = await Shop.findByIdAndDelete(id);
    res.json(deleteShop);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createInfoShop,
  getShop,
  getAllShop,
  updateInfoShop,
  deleteShop,
};
