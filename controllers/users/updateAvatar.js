const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { User } = require("../../models/user");
const storeImage = path.join(process.cwd(), "public", "avatars");

const updateAvatar = async (req) => {
  const userFoundById = await User.findById(req.user._id);
  const { path: temporaryName, originalname } = req.file;
  const extension = originalname.split(".").pop();
  const avatarName = `${userFoundById._id}.${extension}`;
  const fileName = path.join(storeImage, avatarName);

  await fs.rename(temporaryName, fileName);
  const avatarURL = path.join(storeImage, avatarName);

  await userFoundById.update({ avatarURL });
  await Jimp.read(avatarURL).then((image) => image.resize(250, 250));
  return avatarURL;
};

module.exports = updateAvatar;
