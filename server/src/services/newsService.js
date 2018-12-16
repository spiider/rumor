const Joi = require('joi');
const Sequelize = require('sequelize');
const myEmitter = require('./../lib/eventemmit')
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
  getDrafts: async (userId, role) => {
    if (role === 'admin') {
      return models.Post.findAll({
        where: {
          type: 'news',
          status: 2,
        },
        include: [{
          model: models.User,
          attributes: ['firstName', 'lastName'],
        }],
      }).then((news) => {
        if (!news) {
          return [];
        }
        return news;
      });
    }
    return models.Post.findAll({
      where: {
        type: 'news',
        status: 2,
        user_id: userId,
      },
      include: [{
        model: models.User,
        attributes: ['firstName', 'lastName'],
      }],
    }).then((news) => {
      if (!news) {
        return [];
      }
      return news;
    });
  },
  getAllNews: async (isAuth) => {
    if (isAuth) {
      return models.Post.findAll({
        where: {
          type: 'news',
          status: 1,
        },
        include: [{
          model: models.User,
          attributes: ['firstName', 'lastName'],
        }],
      }).then((news) => {
        if (!news) {
          return [];
        }
        return news;
      });
    }
    return models.Post.findAll({
      where: {
        votes: {
          [Op.gte]: 10,
        },
        type: 'news',
        status: 1,
      },
      include: [{
        model: models.User,
        attributes: ['firstName', 'lastName'],
      }],
    }).then((news) => {
      if (!news) {
        return [];
      }
      return news;
    });
  },
  getNews: async (id, isAuth, userId) => {
    if (isAuth) {
      return models.Post.findOne({
        where: {
          id,
          type: 'news',
        },
      }).then(async (news) => {
        if (!news) {
          return {};
        }
        await models.View.findOne({
          where: {
            viewValue: 1,
            user_id: userId,
            post_id: id,
          },
        }).then((view) => {
          if (!view) {
            return models.View.create({
              viewValue: 1,
              user_id: userId,
              post_id: id,
            });
          }
          return null;
        });
        return news;
      }).catch((e) => {
        console.log(e)
      });
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
    }).then((news) => {
      if (!news) {
        return {};
      }
      return news;
    }).catch(() => ({}));
  },
  getPost: async id => models.Post.findOne({
    where: {
      id,
      type: 'news',
    },
  }).then((news) => {
    if (!news) {
      return {};
    }
    return news;
  }).catch(() => ({})),
  getComments: async id => models.Post.findAll({
    where: {
      newsId: id,
    },
  }).then(news => news).catch(() => ([])),
  addComment: (body, userId, newsId) => {
    const content = body.comment;
    const result = Joi.validate({
      content,
    }, commentSchema);

    if (result.error) {
      return result.message;
    }

    return models.Post.create({
      content,
      type: 'comment',
      votes: 0,
      status: 1,
      newsId,
      user_id: userId,
    }).then(() => ({}));
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
    }).then(() => ({}));
  },
};

module.exports = NewsService;
