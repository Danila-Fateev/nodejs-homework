const { Contact } = require("../../models/contact");

const updateStatusContact = async (contactId, body) => {
  if (!body) throw new Error({ message: "missing field favorite" });

  const contacts = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contacts;
};

module.exports = updateStatusContact;
