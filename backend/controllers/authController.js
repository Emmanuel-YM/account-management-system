const speakeasy = require("speakeasy");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate and send the secret key for a user
const generateSecret = async (request, response) => {
  const token = request.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, async (err, decodedToken) => {
      if (err) {
        response.send(false);
      } else {
        const { username } = request.body;
        const secret = speakeasy.generateSecret();
        const existingUser = await User.findOne({ username });
        //check if user has secret set
        if (!existingUser.secret) {
          const updatedUser = await User.findOneAndUpdate(
            { username },
            { $set: { secret: secret.base32 } }
          );
          if (updatedUser) {
            response.json({ secret: secret.base32 });
          } else {
            response.status(500).json({ message: "An error occurred" });
          }
        } else {
          response.json({ secret: existingUser.secret });
        }
      }
    });
  }
};

// Verify the 2FA code provided by the user
const verifySecret = async (request, response) => {
  try {
    const { code, username } = request.body;
    const token = request.cookies.token;
    if (!token) {
      response.send(false);
      return;
    }

    try {
      jwt.verify(token, process.env.SECRET_JWT);
    } catch (error) {
      response.send(false);
      return;
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      response.send(false);
      return;
    }

    const verified = speakeasy.totp.verify({
      secret: existingUser.secret,
      encoding: "base32",
      token: code,
      window: 1, // Allow previous and next codes in case of time sync issues
    });

    if (verified) {
      // Token decoded successfully and verification successful
      response.json({ success: true });
    } else {
      // Token decoded successfully but verification failed
      response.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying secret:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateSecret,
  verifySecret,
};
