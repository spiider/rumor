
const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => res.json('alive'));

module.exports = router;
