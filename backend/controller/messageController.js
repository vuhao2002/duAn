const Messages = require("../models/messagesModel");

const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");

// create new message
const createMessage = asyncHandler(async (req, res, next) => {
  try {
    const messageData = req.body;

    //   if (req.file) {
    //     const filename = req.file.filename;
    //     const fileUrl = path.join(filename);
    //     messageData.images = fileUrl;
    //   }

    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.user._id;
    messageData.text = req.body.text;

    const message = new Messages({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      // images: messageData.images ? messageData.images : undefined,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});
// get all messages with conversation id
const getAllMessages = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params.id);
    const messages = await Messages.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

module.exports = {
  createMessage,
  getAllMessages,
};
