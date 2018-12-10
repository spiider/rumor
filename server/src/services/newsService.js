const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('./../models');

const { Op } = Sequelize;

const newsSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.number().required(),
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
        [Op.lte]: {
          votes: 10,
        },
        type: 'news',
      },
      include: [{
        model: models.User,
        attributes: ['firstName', 'lastName'],
      }],
    }).then(news => news);
  },
  getNews: async id => models.Post.findOne({
    where: {
      id,
    },
  }).then(news => news),
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
};

module.exports = NewsService;
