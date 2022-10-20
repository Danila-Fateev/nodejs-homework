const { Contact } = require("../../models/contact");

const listContacts = async (page, limit) => {
  const contacts = await Contact.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  return contacts;
};

module.exports = listContacts;
