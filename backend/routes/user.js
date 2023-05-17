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
  router.post("/login", userController.userLogin);
  router.post("/generate-token", userController.generatePasswordToken);
  router.post("/reset-password", userController.resetPassword);
  router.post("/logout", userController.userLogout);
  router.get("/userDetails", userController.userDetails);
  router.post("/photo", userController.getProfilePhoto);
  return router;
};
