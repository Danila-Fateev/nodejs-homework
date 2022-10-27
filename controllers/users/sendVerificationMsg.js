const { SENDGRID_API_KEY, MAILER } = process.env;
const { User } = require("../../models/user");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationMsg = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ message: "User with such email does not exist" });
  }
  if (user.verify) {
    throw new Error({ message: "Verification has already been passed" });
  }

  const msg = {
    to: email,
    from: MAILER,
    subject: "Verification",
    text: "To verify your account",
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}' target='_blank'>Click here</a>`,
  };

  sgMail
    .send(msg)
    .then(console.log)
    .catch((error) => console.log(error));
};

module.exports = sendVerificationMsg;
