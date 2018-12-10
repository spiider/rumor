const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const httpStatus = require('http-status');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'justCh3ckTh!s0ut!#';

router.post('/login', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }

    req.login(user, { session: false }, (errLogin) => {
      if (errLogin) {
        return res.send(errLogin);
      }
      const {
        id, email, firstName, lastName, role,
      } = user;
      const token = jwt.sign({
        id, email, firstName, lastName, role,
      }, jwtSecret);
      return res.json({
        id, email, firstName, lastName, role, token,
      });
    });
  })(req, res, next);
});

module.exports = router;
