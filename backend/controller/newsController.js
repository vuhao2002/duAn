const News = require("../models/newsModel");
const asyncHandler = require("express-async-handler");

const ErrorHandler = require("../utils/ErrorHandler");

const createNews = asyncHandler(async (req, res, next) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getNews = await News.findById(id);
    res.json(getNews);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllNews = asyncHandler(async (req, res) => {
  try {
    const allNews = await News.find().sort({ createdAt: -1 });
    res.json(allNews);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteNews = await News.findByIdAndDelete(id);
    res.json(deleteNews);
  } catch (err) {
    throw new Error(err);
  }
});

const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updateNews = await News.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateNews);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  createNews,
  getNews,
  getAllNews,
  deleteNews,
  updateNews,
};
