import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

import User from '../db/models/user.js';
import HttpError from '../helpers/HttpError.js';
import { generateToken, generateVerificationToken } from '../helpers/jwt.js';
import { sendVerificationEmail } from './emailServices.js';

const findUserByEmail = async email => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

const findUser = query =>
  User.findOne({
    where: query,
  });

export const findUserById = async userId => {
  return await User.findByPk(userId);
};

export const addUser = async payload => {
  const { email } = payload;
  const user = await findUserByEmail(email);
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const password = await bcrypt.hash(payload.password, 10);
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const verificationToken = generateVerificationToken();

  await sendVerificationEmail(email, verificationToken);

  return await User.create({ ...payload, password, avatarURL, verificationToken });
};

export const login = async payload => {
  const { email, password } = payload;
  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const token = generateToken({ id: user.id });
  const updatedUser = await user.update({ token }, { returning: true });

  return {
    token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  };
};

export const logout = async id => {
  const user = await findUserById(id);

  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  await user.update({ token: null });
};

export const updateUserSubscription = async (id, subscription) => {
  const user = await findUserById(id);
  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  await user.update({ subscription });
  return {
    email: user.email,
    subscription: user.subscription,
  };
};

export const verifyUser = async verificationToken => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  user.update({
    verificationToken: null,
    verify: true,
  });
};

export const sendVerification = async email => {
  const user = await findUserByEmail(email);;
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendVerificationEmail(email, user.verificationToken);
};