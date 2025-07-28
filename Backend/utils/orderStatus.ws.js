let io;
const init = (server) => {
  io = require("socket.io")(server, { cors: { origin: "*" } });
};

const broadcastOrderUpdate = (order) => {
  if (io) io.emit("order-status-update", order);
};
export { init, broadcastOrderUpdate };
