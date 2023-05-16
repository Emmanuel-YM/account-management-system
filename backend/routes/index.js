const express = require("express");
const router = express.Router();
const cors = require("cors");
const bp = require("body-parser");
const userRoute = require("./user");
const path = require("path");

router.use(express.json());
router.use(cors());
router.use(bp.urlencoded({ extended: false }));

router.use("/api/v1/user", userRoute());

// create a GET route
router.get("*", (request, response) => {
  // update this path to match how you set up express to serve static and where your build is output to
  response.sendFile(path.resolve("../client/build/index.html"));
});
module.exports = router;
