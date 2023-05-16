const express = require("express");
const router = express.Router();
const cors = require("cors");
const bp = require("body-parser");

router.use(express.json());
router.use(cors());
router.use(bp.urlencoded({ extended: false }));

module.exports = router;
