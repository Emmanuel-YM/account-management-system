const express = require("express");
const router = express.Router();
const recaptchaController = require("../controllers/recaptchaController");

module.exports = () => {
  router.post("/verify", recaptchaController.verifyRecaptcha);
  return router;
};
