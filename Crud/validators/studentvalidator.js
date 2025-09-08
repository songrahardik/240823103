const Joi = require("joi");

exports.createValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(50).required(),
});
exports.updateValidator = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  city: Joi.string().min(3).max(50).optional(),
});

exports.validate = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    return {
      success: false,
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    };
  }
  return { success: true, value };
};