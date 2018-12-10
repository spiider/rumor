const Joi = require('joi');
const models = require('./../models');

const commentSchema = Joi.object().keys({
  content: Joi.string(),
});

const CommentService = {
  getAllCommentForNews: async id => models.Post.findAll({
    where: {
      newsId: id,
    },
  }).then(news => news),
  createComment: async id => models.Post.findOne({
    where: {
      id,
    },
  }).then(news => news),
};

module.exports = CommentService;
