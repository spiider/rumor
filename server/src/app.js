const express = require('express');
const httpStatus = require('http-status');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('./lib/logger');
const auth = require('./routes/auth');
const index = require('./routes/index');
const user = require('./routes/user');

const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);

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
