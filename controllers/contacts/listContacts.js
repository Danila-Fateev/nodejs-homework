const { Contact } = require("../../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

module.exports = listContacts;
