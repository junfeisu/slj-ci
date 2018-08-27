const socketPlugin = {
  name: 'socketPlugin',
  register: (server, options) => {
    const io = require('socket.io')(server.listen)
  }
}

export default socketPlugin
