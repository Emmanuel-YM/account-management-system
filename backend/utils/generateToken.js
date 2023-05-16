const jwt = require("jsonwebtoken");
const generateToken = (username, password) =>
  jwt.sign(
    {
      username,
      password,
    },
    process.env.SECRET_JWT,
    { expiresIn: "3h" }
  );
module.exports = generateToken;
