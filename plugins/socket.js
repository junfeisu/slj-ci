const socketPlugin = {
  name: 'socketPlugin',
  register: (server, options) => {
    const io = require('socket.io')(server.listener)

    io.sockets.on('connection', socket => {
      socket.on('some event', data => {
        socket.broadcast.emit('hello')
      })

    })
  }
}

export default socketPlugin
