const express = require('express');
const httpStatus = require('http-status');
const UserService = require('./../services/userService');

const router = express.Router();

router.post('/', (req, res) => {
  const newUser = UserService.createUser(req.body);
  if (newUser) {
    return res.status(httpStatus.BAD_REQUEST).json(newUser);
  }
  return res.json('ok');
});

module.exports = router;
