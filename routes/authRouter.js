import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription
} from '../controllers/authControllers.js';

import {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
} from '../schemas/authSchemas.js';

import auth from '../middlewares/auth.js';
import validateBody from '../helpers/validateBody.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', auth, logout);
authRouter.get('/current', auth, getCurrent);
authRouter.patch(
  '/subscription',
  auth,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

export default authRouter;