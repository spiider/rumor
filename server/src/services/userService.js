const Joi = require('joi');
const models = require('./../models');
const logger = require('./../lib/logger');

const userSchema = Joi.object().keys({
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

const UserService = {
  // eslint-disable-next-line consistent-return
  createUser: (body) => {
    const {
      firstName, lastName, email, password,
    } = body;
    const userValidation = UserService.validateUser(body);
    if (userValidation) {
      return userValidation.message;
    }
    if (UserService.findUserByEmail(body.email)) {
      return 'User already exist';
    }

    models.User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'user',
    }).then((user) => {
      if (user) {
        return null;
      }
      return 'Something went wrong';
    });
  },
  findUserByEmail: (email) => {
    models.User.findByEmail(email).then(user => user);
  },
  validateUser: (data) => {
    const {
      firstName, lastName, email, password,
    } = data;
    const result = Joi.validate({
      firstName, lastName, email, password,
    }, userSchema);
    return result.error;
  },
};

module.exports = UserService;
