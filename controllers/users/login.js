const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (body) => {
  const { email, password } = body;
  const [foundUserByEmail] = await User.find({ email });
  const correctPassword = await bcrypt.compare(
    password,
    foundUserByEmail.password
  );
  if (!foundUserByEmail || !correctPassword) {
    throw new Error({ status: 401, message: "Email or password is wrong" });
  }
  const payload = {
    id: foundUserByEmail._id,
    email: foundUserByEmail.email,
  };

  const newToken = await jwt.sign(payload, SECRET_KEY);
  await foundUserByEmail.update({ token: newToken });
  return newToken;
};

module.exports = login;
