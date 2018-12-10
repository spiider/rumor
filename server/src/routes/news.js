const express = require('express');
const httpStatus = require('http-status');
const NewsService = require('./../services/newsService');

const router = express.Router();

router.get('/list', async (req, res) => {
  return res.json(await NewsService.getAllNews(req.isAuthed));
});

router.get('/:id', async (req, res) => res.json(await NewsService.getNews(req.params.id)));
module.exports = router;
