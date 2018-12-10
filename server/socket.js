const io = require('socket.io')();

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = socket => {
  socket.emit("notfication", 'lel');
};

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
