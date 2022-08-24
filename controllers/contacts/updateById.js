const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) throw createError(404, "Not found");

  res.json(updatedContact);
};

module.exports = updateById;
