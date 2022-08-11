const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await contactsOperations.removeContact(contactId);
  if (!deletedContact) throw createError(404, "Not found");

  res.json({ message: "contact deleted" });
};

module.exports = removeById;
