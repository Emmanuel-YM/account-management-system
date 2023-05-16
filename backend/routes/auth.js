const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

module.exports = () => {
  router.post("/verify", authController.verifySecret);
  router.post("/generate", authController.generateSecret);
  return router;
};
