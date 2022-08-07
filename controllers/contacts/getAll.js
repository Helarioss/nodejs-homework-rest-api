const contactsOperations = require("../../models/contacts");

const getAll = async (_, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
};

module.exports = getAll;
