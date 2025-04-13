import HttpError from '../helpers/HttpError.js';
import { findUserById } from '../services/authServices.js';
import { verifyToken } from '../helpers/jwt.js';

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, 'Not authorized'));
  }
  const user = await findUserById(payload.id);
  if (!user || !user.token) {
    return next(HttpError(401, 'Not authorized'));
  }

  req.user = user;

  next();
};

export default auth;