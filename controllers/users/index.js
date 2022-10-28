const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const showCurrentUser = require("./showCurrentUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const sendVerificationMsg = require("./sendVerificationMsg");

module.exports = {
  signup,
  login,
  logout,
  showCurrentUser,
  updateAvatar,
  verify,
  sendVerificationMsg,
};
