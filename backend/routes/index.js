const express = require("express");
const router = express.Router();
const cors = require("cors");
const bp = require("body-parser");
const userRoute = require("./user");
const authRoute = require("./auth");
const recaptchaRoute = require("./recaptcha");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(cors());
router.use(bp.urlencoded({ extended: false }));
router.use(cookieParser());

router.use("/api/v1/user", userRoute());
router.use("/api/v1/auth/2fa", authRoute());
router.use("/api/v1/auth/recaptcha", recaptchaRoute());

module.exports = router;
