const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (body) => {
  const { password, email } = body;
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new Error({ status: 409, message: "Email in use" });
  }
  const avatarURL = await gravatar.url(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    password: hashedPassword,
    email,
    avatarURL,
  });

  return newUser;
};

module.exports = signup;
