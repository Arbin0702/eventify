const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("").max(30),
  company: Joi.string().allow("").max(80),
  service: Joi.string().allow("").max(80),
  budget: Joi.string().allow("").max(80),
  message: Joi.string().min(10).required()
});

module.exports = { contactSchema };