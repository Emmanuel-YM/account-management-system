const { User } = require("../models/User");
const { responseMessage } = require("../utils/responses");
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

const generatePasswordToken = async (request, response) => {
  try {
    const { email } = request.body;
    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      response.send(false);
      return;
    }
    if (existingUser.email !== email) {
      response.send(false);
      return;
    }

    //Generate reset token
    const token = generateToken(existingUser.username, existingUser.password);
    //save reset token to db
    await User.findOneAndUpdate({ email }, { $set: { resetToken: token } });

    const resetLink = ` http://localhost:3000/changePin?token=${token}`;

    // Set up your email configuration for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Define the email content
    const mailOptions = {
      from: "ymannor44@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .json({ message: "Failed to send reset link email" });
      } else {
        console.log("Email sent: " + info.response);
        response.json({ message: `Reset link sent to ${email}` });
      }
    });
  } catch (err) {
    // Handle error
    response.status(500).json({ message: "An error occurred" });
  }
};

const resetPassword = async (request, response) => {
  try {
    const { newPassword, token } = request.body;
    // Check if the user exists in the database
    const existingUser = await User.findOne({ resetToken: token });
    if (!existingUser) {
      response.send(false);
      return;
    }
    //update reset token to db
    const hashedPassword = hashPassword(newPassword);
    await User.findOneAndUpdate(
      { resetToken: token },
      { $set: { password: hashedPassword } }
    );
    response.status(200).json({ message: `Password changed successfully` });
  } catch (err) {
    // Handle error
    response.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  userCreation,
  userLogin,
  resetPassword,
  generatePasswordToken,
};
