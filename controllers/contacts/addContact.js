const { Contact } = require("../../models/contact");

const addContact = async (body, user) => {
  const { _id: owner } = user;
  const identicalContacts = await Contact.findOne({ ...body, owner });
  if (identicalContacts) {
    throw new Error({ message: "Contact already exists" });
  }
  const newContact = await Contact.create({ ...body, owner });

  return newContact;
};

module.exports = addContact;
