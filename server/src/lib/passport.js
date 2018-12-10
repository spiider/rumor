const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

const { ExtractJwt } = passportJWT;
const JWTStrategy = passportJWT.Strategy;
const jwtSecret = process.env.JWT_SECRET || 'justCh3ckTh!s0ut!#';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => models.User.findOne({ where: { email } })
      .then(async (user) => {
        if (!user || !await user.checkPassword(password)) {
          return cb(null, false);
        }
        return cb(null, user);
      }).catch(err => cb(err)),
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    }, (jwtPayload, cb) => models.User
      .findById(jwtPayload.id)
      .then((user) => {
        const {
          id, firstName, lastName, email, role,
        } = user;
        cb(null, {
          id, firstName, lastName, email, role,
        });
      }).catch(err => cb(err)),
  ),
);
