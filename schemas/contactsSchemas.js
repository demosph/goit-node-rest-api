import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().required(),
  favorite: Joi.boolean(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters.',
    'string.max': 'Name must be at most 50 characters.',
    'string.base': 'Name must be a string.',
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email must be valid.',
    'string.base': 'Email must be a string.',
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be between 7 and 20 characters, including digits, spaces, hyphens, and parentheses.',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'Body must have at least one field.',
    });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});