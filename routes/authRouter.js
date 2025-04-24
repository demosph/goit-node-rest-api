import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail
} from '../controllers/authControllers.js';

import {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    verifyAuthSchema
} from '../schemas/authSchemas.js';

import auth from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
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
authRouter.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  updateAvatar
);

authRouter.get('/verify/:verificationToken', verifyEmail);
authRouter.post('/verify', validateBody(verifyAuthSchema), resendVerificationEmail);

export default authRouter;