const Joi = require("joi");

const createBookingSchema = Joi.object({
  eventId: Joi.string().required(),
  selectedDate: Joi.string().required(),
  attendees: Joi.number().integer().min(1).required(),
  foodPackage: Joi.string().valid("standard", "premium", "vip").required(),
  photographySelected: Joi.boolean().required()
});

module.exports = { createBookingSchema };