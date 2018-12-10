const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('./../models');
const logger = require('./../lib/logger');

const { Op } = Sequelize; 

const newsSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string(),
});

const NewsService = {
  // eslint-disable-next-line consistent-return
  getAllNews: async (isAuth) => {
    if (isAuth) {
      return models.Post.findAll({
        where: {
          type: 'news',
        },
      }).then(news => news);
    }
    return models.Post.findAll({
      where: {
        [Op.lte]: {
          votes: 10,
        },
        type: 'news',
      },
    }).then(news => news);
  },
  getNews: async id => models.Post.findOne({
    where: {
      id,
    },
  }).then(news => news),
};

module.exports = NewsService;
