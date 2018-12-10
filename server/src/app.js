const express = require('express');
const httpStatus = require('http-status');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const logger = require('./lib/logger');
const auth = require('./routes/auth');
const index = require('./routes/index');
const user = require('./routes/user');
const news = require('./routes/news');
const votes = require('./routes/votes');

const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./lib/passport');

// we are not using session so we need do this trick
app.use(async (req, res, next) => {
  // eslint-disable-next-line no-shadow
  passport.authenticate('jwt', { session: false }, (err, user) => {
    req.isAuthed = !((err, !user));
    next();
  })(req, res, next);
});

app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);
app.use('/news', news);
app.use('/vote', votes);

app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, _req, res) => {
    logger.error(err);
    res
      .status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
      .send('Internal Error');
  });
}

module.exports = app;
