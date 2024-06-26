const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getallUsers,
  getsingleUser,
  updateUser,
  deleteUser,
} = require("../Controllers/auth.controller");

/* Routes for creating a new user, login, get all users, 
get a single user, and update a user */

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getallUsers);
router.get("/:id", getsingleUser);
router.put("/user-update/:id", updateUser);
router.delete("/user-delete/:id", deleteUser);

module.exports = router;
