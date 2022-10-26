const { User } = require("../../models/user");

const verify = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new Error("No user found with such verification token");
  }
  await user.update({ verify: true, verificationToken: null });
};

module.exports = verify;
