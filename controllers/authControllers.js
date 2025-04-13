import * as authServices from '../services/authServices.js';
import HttpError from '../helpers/HttpError.js';

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { email, subscription } = await authServices.addUser(req.body);

    res.status(201).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { token, user } = await authServices.login(req.body);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    await authServices.logout(req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/current
export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/auth/subscription
export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const updated = await authServices.updateUserSubscription(req.user.id, subscription);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};