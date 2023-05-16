const { User } = require("../models/User");
const { responseMessage } = require("../utils/responses");
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const userCreation = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      age,
      dateOfBirth,
      maritalStatus,
      nationality,
      nationalIdNumber,
      passport,
      username,
      password,
    } = request.body;

    // Access the uploaded files
    const officialDocumentFile = request.files["officialDocument"][0];
    const profilePhotoFile = request.files["profilePhoto"][0];
    const hashedPassword = hashPassword(password);

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    console.log(existingUser, email, "existingUser");

    if (existingUser) {
      // User with the same username already exists
      return responseMessage(response, 500, "Username already exists");
    }
    // creating an object of the model
    const user = new User({
      profilePhoto: profilePhotoFile.filename,
      firstName,
      lastName,
      email,
      gender,
      age,
      dateOfBirth,
      maritalStatus,
      nationality,
      nationalIdNumber,
      passport,
      officialDocument: officialDocumentFile.filename,
      username,
      password: hashedPassword,
    });
    // adding the user to the db
    await user.save();

    return responseMessage(response, 200, "Account created successfully");
  } catch (err) {
    // Handle error
    response.status(500).json({ message: "An error occurred" });
  }
};

const userLogin = async (request, response) => {
  try {
    const { username, password } = request.body;
    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      //check user password
      const existingUserPasswordHash = existingUser.password;
      bcrypt
        .compare(password, existingUserPasswordHash)
        .then(async (result) => {
          if (result) {
            const token = generateToken(
              existingUser.username,
              existingUserPasswordHash
            );
            // Send the token in an HTTP-only cookie
            response.cookie("token", token, { httpOnly: false }).send();
          } else {
            return responseMessage(
              response,
              400,
              "Incorrect Username/Password!"
            );
          }
        });
    }
  } catch (err) {
    // Handle error
    response.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  userCreation,
  userLogin,
};
