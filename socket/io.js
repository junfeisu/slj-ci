import socketIO from 'socket.io'
import server from '../server'

const io = socketIO(server.listener)

export default io
