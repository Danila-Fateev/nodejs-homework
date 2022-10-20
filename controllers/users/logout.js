const { User } = require("../../models/user");

const logout = async (userId) => {
  const userFoundById = await User.findById(userId);
  if (!userFoundById) {
    throw new Error({ status: 401, message: "Not authorized" });
  }
  await userFoundById.update({ token: "" });
  return userFoundById;
};

module.exports = logout;
