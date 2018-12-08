module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './rumor.db.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
  },
};
