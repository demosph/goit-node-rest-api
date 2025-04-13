import Joi from "joi";
import { PASSWORD_MIN, SUBSCRIPTIONS } from '../constants/auth.js';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
    password: Joi.string().min(PASSWORD_MIN).required(),
    subscription: Joi.string().valid(...SUBSCRIPTIONS),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...SUBSCRIPTIONS).required(),
});