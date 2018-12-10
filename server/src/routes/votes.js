const express = require('express');
const VoteService = require('./../services/voteService');

const router = express.Router();

router.post('/', async (req, res) => {
  res.json(await VoteService.addVote(req.body.id));
});

module.exports = router;
