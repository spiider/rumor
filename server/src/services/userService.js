const Joi = require('joi');
const models = require('./../models');

const userSchema = Joi.object().keys({
  password: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

const UserService = {
  createUser: (body) => {
    const userValidation = UserService.validateUser(body);
    if (userValidation) {
      return userValidation.message;
    }
    if (UserService.findUserByEmail(body.email)) {
      return 'User already exist';
    }
    return 'ok';
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
