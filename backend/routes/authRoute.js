const express = require("express");
const router = express.Router();

const {
  registerUser,
  activateUser,
  loginUserController,
  // loginAdminController,

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
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/activation", activateUser);
router.post("/login-user", loginUserController);
router.post("/forgot-password-token", forgotPasswordToken);

router.get("/logout", authMiddleware, logout);
router.get("/get-user", authMiddleware, getUser);
router.get("/user-info/:id", authMiddleware, getInfoUser);
router.get("/get-all-users", authMiddleware, isAdmin, getAllUsers);

router.put("/reset-password", resetPassword);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/update-user-password", authMiddleware, updateUserPassword);
router.put("/update-user-addresses", authMiddleware, updateUserAddress);

router.delete("/delete-user-addresses/:id", authMiddleware, deleteUserAddress);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
