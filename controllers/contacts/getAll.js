const { Contact } = require("../../models/contacts");

const getAll = async (_, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = getAll;
