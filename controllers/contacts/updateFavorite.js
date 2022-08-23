const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await updateStatusContact(contactId, req.body);
  if (!updatedContact) throw createError(404, "Not found");

  res.json(updatedContact);
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = updateFavorite;
