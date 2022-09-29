const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = await contacts.filter((el) => el.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
