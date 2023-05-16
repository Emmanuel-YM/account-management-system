const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware");

module.exports = () => {
  router.post(
    "/sign-up",
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "officialDocument", maxCount: 1 },
    ]),
    userController.userCreation
  );
  return router;
};
