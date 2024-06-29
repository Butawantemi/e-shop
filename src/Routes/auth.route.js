const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware")
const {
  createUser,
  loginUser,
  getallUsers,
  getsingleUser,
  updateUser,
  deleteUser,
  verifyEmail,
  blockUser, 
  unblockUser,
  changeUserRole
} = require("../Controllers/auth.controller");

// Route for user registration (with email verification)
router.post("/register", createUser);

// Route for user login
router.post("/login", loginUser);

// Route to verify email
router.get("/verify-email", verifyEmail);

// Route to get all users
router.get("/users", getallUsers);

// Route to get a single user by ID
router.get("/:id", getsingleUser);

// Route to update a user by ID
router.put("/:id", updateUser);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

// Change admin role 
router.put('/change-role/:id', protect, admin, changeUserRole);

//block and unblock user 
router.put('/block/:id', protect, admin, blockUser);
router.put('/unblock/:id', protect, admin, unblockUser);

module.exports = router;
