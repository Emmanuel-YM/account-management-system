const jwt = require("jsonwebtoken");
const generateToken = (username, password, limit) =>
  jwt.sign(
    {
      username,
      password,
    },
    process.env.SECRET_JWT,
    { expiresIn: !!limit ? limit : "3h" }
  );
module.exports = generateToken;
