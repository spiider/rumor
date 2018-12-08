const app = require('./app');
const models = require('./models');

models.sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  app.listen(app.get('port'), () => console.log(`server running at ${app.get('host')}:${app.get('port')}`));
});
