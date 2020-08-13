const server = require('../../server');
const io = server.getSocket();

exports.notifyUsers = (department, data) => {
  io.emit(department, data);
}