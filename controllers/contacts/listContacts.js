const { Contact } = require("../../models/contact");

const listContacts = async (page, limit, favorite) => {
  const contacts = await Contact.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  if (favorite) {
    const favoriteContacts = await Contact.find({ favorite: true });
    return favoriteContacts;
  }
  return contacts;
};

module.exports = listContacts;
