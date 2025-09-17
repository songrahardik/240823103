const Joi = require("joi");

exports.createValidator = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  artist: Joi.string().min(3).max(50).required(),
  category: Joi.string().min(3).max(50).required(),
  album: Joi.string().min(3).max(50).required(),
  url: Joi.string().required(),
  photo: Joi.string().required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
});
exports.updateValidator = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  artist: Joi.string().min(3).max(50).optional(),
  category: Joi.string().min(3).max(50).optional(),
  album: Joi.string().min(3).max(50).optional(),
  url: Joi.string().uri().optional(),
  photo: Joi.string().uri().optional(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).optional(),
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