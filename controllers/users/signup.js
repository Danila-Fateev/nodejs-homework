const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const signup = async (body) => {
  const { email, password } = body;
  const emailInUse = User.find({ email });
  if (emailInUse) {
    throw new Error({ status: 409, message: "Email in use" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ password: hashedPassword, ...body });
  return newUser;
};

module.exports = signup;
