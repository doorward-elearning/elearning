import bcrypt from 'bcrypt';
import models from '../../database/models';
import Tools from '../../utils/Tools';

export const validateLogin = async req => {
  const existing = await models.User.unscoped().findOne({ where: { username: req.body.username } });

  const username = req.checkBody('username');
  const password = req.checkBody('password');
  username
    .notEmpty()
    .withMessage('Username is required')
    .custom(() => existing)
    .withMessage('User with this username does not exist.');

  password.notEmpty().withMessage('Password is required');
};

export const validateRegistration = async req => {
  const existing = await models.User.findOne({ where: { email: req.body.email } });
  const existingUsername = await models.User.findOne({ where: { username: req.body.username } });

  req
    .checkBody('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom(() => !existingUsername)
    .withMessage('This username is taken');

  req
    .checkBody('password')
    .notEmpty()
    .withMessage('Password is required.');
  req
    .checkBody('email')
    .notEmpty()
    .withMessage('Email is required')
    .custom(() => !existing)
    .withMessage('User with this email already exists.');
};

export const validateCreateUser = exclude => async req => {
  let existing = await models.User.findOne({ where: { username: req.body.username || '' } });
  let existingEmail = await models.User.findOne({ where: { email: req.body.email || '' } });
  const username = req.checkBody('username');
  const email = req.checkBody('email');

  if (existing && exclude && exclude.username === existing.username) {
    existing = null;
  }
  if (existingEmail && exclude && exclude.email === existingEmail.email) {
    existingEmail = null;
  }

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

export const validateUpdateAccount = async req => {
  return validateCreateUser(req.user)(req);
};

export const validatePassword = async req => {
  const username = req.body.username || req.user.username;
  const existing = await models.User.unscoped().findOne({ where: { username } });
  const password = req.checkBody('password');

  password.custom(() => existing.password).withMessage('Your password has not been set.');
  if (existing.password) {
    const validPassword = existing && (await bcrypt.compare(req.body.password, existing.password));
    password.custom(() => validPassword).withMessage('Wrong password');
  } else {
    return [422, { changePassword: true }];
  }
};

export const validateResetToken = async req => {
  const { resetToken, resetTokenBuffer } = req.body;

  const email = Tools.decrypt(decodeURIComponent(resetTokenBuffer));

  if (resetToken && email) {
    const user = await models.User.findOne({
      where: { email },
      include: [
        {
          model: models.PasswordResets,
          as: 'passwordResets',
          where: {
            token: decodeURIComponent(resetToken),
          },
        },
      ],
    });
    if (!user) {
      return [404, undefined, 'The password reset token is invalid'];
    }
    req.user = user;
  } else {
    return [404, undefined, 'The password reset token is invalid'];
  }
};

export const validateHasPassword = async req => {
  const { username } = req.body;
  const user = await models.User.unscoped().findOne({ where: { username } });

  if (user.password) {
    return [200, undefined, 'Cannot create a password since you already have one'];
  }
};

export const validateUserExistsByEmail = async req => {
  const { email } = req.body;
  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  req.checkBody('email', 'No user exists with this email').custom(() => user);
};
