const Contact = require("../../models/contact");

const updateContact = async (contactId, body) => {
  const contacts = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contacts;
};

module.exports = updateContact;
