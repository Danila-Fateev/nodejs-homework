const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");

const { SENDGRID_API_KEY, MAILER } = process.env;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const signup = async (body) => {
  const { password, email } = body;
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new Error({ status: 409, message: "Email in use" });
  }
  const avatarURL = await gravatar.url(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = await uuid.v4();
  const newUser = await User.create({
    password: hashedPassword,
    email,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: newUser.email,
    from: MAILER,
    subject: "Verification",
    text: "To verify your account",
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Click here</a>`,
  };

  sgMail
    .send(msg)
    .then(console.log)
    .catch((error) => console.log(error));

  return newUser;
};

module.exports = signup;
