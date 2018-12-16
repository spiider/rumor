const express = require('express');
const passport = require('passport');
const httpStatus = require('http-status');
const NewsService = require('./../services/newsService');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const newNews = await NewsService.createNews(req.body, req.user.id);
  if (newNews) {
    return res.status(httpStatus.BAD_REQUEST).json(newNews);
  }
  return res.json('ok');
});

router.patch('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const newNews = await NewsService.editNews(req.body);
  if (newNews) {
    return res.status(httpStatus.BAD_REQUEST).json(newNews);
  }
  return res.json('ok');
});

router.get('/list', async (req, res) => res.json(await NewsService.getAllNews(req.isAuthed)));

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => res.json(await NewsService.addComment(req.body, req.user.id, req.params.id)));
router.get('/comments/:id', async (req, res) => res.json(await NewsService.getComments(req.params.id)));
router.get('/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => res.json(await NewsService.getPost(req.params.id)));
router.get('/drafts', passport.authenticate('jwt', { session: false }), async (req, res) => res.json(await NewsService.getDrafts(req.user.id, req.user.role)));
router.get('/:id', async (req, res) => res.json(await NewsService.getNews(req.params.id, req.isAuthed, req.userId)));

module.exports = router;
