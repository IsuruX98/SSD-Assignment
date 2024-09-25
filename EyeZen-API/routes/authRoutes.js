const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  logoutUser,
  googleAuthUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/google", googleAuthUser);

module.exports = router;
