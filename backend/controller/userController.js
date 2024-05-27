const User = require("../models/userModel");

const sendMail = require("../utils/sendEmail");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const asyncHandler = require("express-async-handler");

// create the activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h",
  });
};

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create a new user
    const user = req.body;
    console.log(user);
    const activationToken = createActivationToken(user);
    console.log(activationToken);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    console.log(activationUrl);
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } else {
    // User already exists
    throw new Error("User Already Exists");
  }
});

// activate user
const activateUser = catchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log(newUser);
    if (!newUser) {
      return next(new ErrorHandler("Invalid activation token", 400));
    }

    const { name, email, phoneNumber, password } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
      name,
      email,
      password,
      phoneNumber,
    });
    sendToken(user, 201, res);
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

// login user
const loginUserController = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please fill all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(password === user.password);
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    sendToken(user, 201, res);
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

// logout
const logout = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

// get user
const getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

// find user infoormation with the userId
const getInfoUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update info user
const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, phoneNumber, name } = req.body;

    const user = await User.findById(_id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateUserPassword = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password doesn't matched with each other!", 400)
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user addresses
const updateUserAddress = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const existsAddress = user.addresses.some((address) => {
      return address._id == req.body._id;
    });
    if (existsAddress) {
      Object.assign(user.addresses[0], req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete user address
const deleteUserAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    console.log(addressId);

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete user address
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User is not available with this id", 400));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(201).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("Không tìm thấy người dùng với email này!");

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `
    Mã xác thực của bạn là: ${token}. Mã này có hiệu lực trong vòng 10 phút.`;
    const data = {
      email: email,
      subject: "Mã xác thực quên mật khẩu",
      message: `Mã xác thực của bạn là: ${token}. Mã này có hiệu lực trong vòng 10 phút.`,
    };
    sendMail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

module.exports = {
  registerUser,
  activateUser,
  loginUserController,
  logout,
  getUser,
  getInfoUser,
  getAllUsers,
  forgotPasswordToken,
  resetPassword,
  updateUser,
  updateUserPassword,
  updateUserAddress,
  deleteUserAddress,
  deleteUser,
};
