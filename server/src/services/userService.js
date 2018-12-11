const Joi = require('joi');
const models = require('./../models');

const userSchema = Joi.object().keys({
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
});

const UserService = {
  // eslint-disable-next-line consistent-return
  createUser: async (body) => {
    const {
      firstName, lastName, email, password,
    } = body;
    const userValidation = UserService.validateUser(body);
    if (userValidation) {
      return userValidation.message;
    }
    return UserService.findUserByEmail(body.email)
      .then((user) => {
        if (user) {
          return 'User already exist';
        }
        return models.User.create({
          firstName,
          lastName,
          email,
          password,
          role: 'user',
        }).then((newUser) => {
          if (newUser) {
            return null;
          }
          return 'Something went wrong';
        });
      });
  },
  findUserByEmail: async email => models.User.findByEmail(email),
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
