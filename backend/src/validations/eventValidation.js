const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(3).required(),
  location: Joi.string().min(2).required(),
  date: Joi.string().min(6).required(),
  description: Joi.string().min(5).required()
});

// Update: allow partial update, but at least one field must exist
const updateEventSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  location: Joi.string().min(2).optional(),
  date: Joi.string().min(6).optional(),
  description: Joi.string().min(5).optional()
}).min(1);

module.exports = { createEventSchema, updateEventSchema };