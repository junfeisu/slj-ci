import io from './io'
import statusRoom from './status'
import logRoom from './log'
import query from '../utils/mysql/query'

let id = ''

const onConnection = socket => {
  console.log('connected in', socket.id)

  id = socket.id

  socket.on('disconnect', async () => {
    try {
      const removeNoticeSql = 'delete from notice where socket_id = ?'
      const removeNoticeParams = [socket.id]

      await query(removeNoticeSql, removeNoticeParams)
    } catch (err) {
      console.log('socket remove notice err', err.message)
    }
  })
}

const init = () => {
  io.on('connection', onConnection)
}

export default init
