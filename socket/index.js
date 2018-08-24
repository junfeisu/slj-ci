exports.register = (server, options, next) => {
  const io = require('socket.io')(server.listen)
}

exports.name = 'slj-ci-socket'
