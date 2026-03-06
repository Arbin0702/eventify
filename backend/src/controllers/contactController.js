const ContactMessage = require("../models/ContactMessage");
const { contactSchema } = require("../validations/contactValidation");

exports.submitContact = async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const saved = await ContactMessage.create(value);
    res.status(201).json({ message: "Message received", id: saved._id });
  } catch (e) {
    next(e);
  }
};

exports.listMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (e) {
    next(e);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};