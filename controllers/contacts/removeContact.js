const Contact = require("../../models/contact");

const removeContact = async (contactId) => {
  const contacts = await Contact.findByIdAndRemove(contactId);
  return contacts;
};

module.exports = removeContact;
