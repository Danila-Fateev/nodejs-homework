const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (body) => {
  const { email, password } = body;
  const [foundUserByEmail] = await User.find({ email });
  if (!foundUserByEmail.verify) {
    throw new Error("User is not verified");
  }
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
  const userEmail = foundUserByEmail.email;
  const userSubscription = foundUserByEmail.subscription;
  const user = { email: userEmail, subscription: userSubscription };
  const newToken = await jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
  await foundUserByEmail.update({ token: newToken });
  return { newToken, user };
};

module.exports = login;
