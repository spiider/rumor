const http = require('http');
const myEmitter = require('./lib/eventemmit');
const app = require('./app');

const server = http.createServer(app);
// eslint-disable-next-line import/order
const io = require('socket.io')(server);
const models = require('./models');

models.sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  server.listen(app.get('port'), () => console.log(`server running at ${app.get('host')}:${app.get('port')}`));

  io.on('connection', (socket) => {
    myEmitter.on('notification', (data) => {
      socket.emit('notification', data);
    });
  });
});
