const { User } = require("../../models/user");

const showCurrentUser = async (authorization) => {
  const [bearer = "", token = ""] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Error({ status: 401, message: "Not authorized" });
  }
  const { email, subscription } = await User.findOne({ token });
  const result = { email, subscription };
  return result;
};

module.exports = showCurrentUser;
