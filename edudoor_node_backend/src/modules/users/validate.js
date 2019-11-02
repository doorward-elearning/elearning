import bcrypt from 'bcrypt';
import models from '../../database/models';

export const validateLogin = async req => {
  const existing = await models.User.unscoped().findOne({ where: { username: req.body.username } });
  const validPassword = existing && (await bcrypt.compare(req.body.password, existing.password));

  const username = req.checkBody('username');
  const password = req.checkBody('password');
  username
    .notEmpty()
    .withMessage('Username is required')
    .custom(() => existing)
    .withMessage('User with this username does not exist.');

  password.notEmpty().withMessage('Password is required');
  if (existing) {
    password.custom(() => validPassword).withMessage('Wrong password');
  }
};

export const validateCreateUser = async req => {
  const existing = await models.User.findOne({ where: { username: req.body.username } });
  const existingEmail = await models.User.findOne({ where: { email: req.body.email } });
  const username = req.checkBody('username');
  const email = req.checkBody('email');

  username
    .notEmpty()
    .withMessage('Username is required')
    .custom(() => !existing)
    .withMessage('A user with this username already exist');
  email
    .notEmpty()
    .withMessage('Email is required')
    .custom(() => !existingEmail)
    .withMessage('A user with this email already exists');
};
