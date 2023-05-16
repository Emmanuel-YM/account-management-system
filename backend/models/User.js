const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profilePhoto: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  gender: { type: String },
  age: { type: String },
  dateOfBirth: { type: String },
  maritalStatus: { type: String },
  nationality: { type: String },
  nationalIdNumber: { type: String },
  passport: { type: String },
  officialDocument: { type: String },
  username: { type: String },
  password: { type: String },
  secret: { type: String },
  resetToken: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
