const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const httpStatus = require('http-status');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'justCh3ckTh!s0ut!#';

router.post('/login', (req, res) => {
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
      const token = jwt.sign(user, jwtSecret);
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
