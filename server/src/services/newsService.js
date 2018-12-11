const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('./../models');

const { Op } = Sequelize;

const newsSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.number().required(),
});

const commentSchema = Joi.object().keys({
  content: Joi.string().required(),
});

const NewsService = {
  getAllNews: async (isAuth) => {
    if (isAuth) {
      return models.Post.findAll({
        where: {
          type: 'news',
        },
        include: [{
          model: models.User,
          attributes: ['firstName', 'lastName'],
        }],
      }).then(news => news);
    }
    return models.Post.findAll({
      where: {
        votes: {
          [Op.gte]: 10,
        },
        type: 'news',
      },
      include: [{
        model: models.User,
        attributes: ['firstName', 'lastName'],
      }],
    }).then(news => news);
  },
  getNews: async (id, isAuth) => {
    if (isAuth) {
      return models.Post.findOne({
        where: {
          id,
          type: 'news',
        },
      }).then(news => news);
    }
    return models.Post.findOne({
      where: {
        id,
        votes: {
          [Op.gte]: 10,
        },
        status: 1,
        type: 'news',
      },
    }).then(news => news)
      .catch(() => ({}));
  },
  getComments: async id => models.Post.findOne({
    where: {
      news_id: id,
    },
  }).then(news => news).catch(() => ([])),
  addComment: (body, userId) => {
    const content = body.comment;
    const result = Joi.validate({
      content,
    }, newsSchema);

    if (result.error) {
      return result.message;
    }

    return models.Post.create({
      content,
      type: 'news',
      votes: 0,
      status: 1,
      user_id: userId,
    }).then(() => null);
  },
  createNews: (body, userId) => {
    const { title, content, status } = body;
    const result = Joi.validate({
      title, content, status,
    }, newsSchema);

    if (result.error) {
      return result.message;
    }

    return models.Post.create({
      title,
      content,
      type: 'news',
      votes: 0,
      status,
      user_id: userId,
    }).then(() => null);
  },
  editNews: (body) => {
    const {
      id, title, content, status,
    } = body;
    const result = Joi.validate({
      title, content, status,
    }, newsSchema);

    if (result.error) {
      return result.message;
    }
    return models.Post({
      title,
      content,
      status,
    }, {
      returning: true,
      where: {
        id,
      },
    }).then(() => null);
  },
};

module.exports = NewsService;
