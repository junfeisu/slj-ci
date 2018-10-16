import io from './io'
import statusRoom from './status'
import logRoom from './log'

const onConnection = socket => {
  console.log('connected in', socket.id)
}

const init = () => {
  io.sockets.on('connection', onConnection)
}

export default init
