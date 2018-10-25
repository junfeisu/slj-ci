import io from './io'
import query from '../utils/mysql/query'

const statusRoom = io.of('/status')
  .on('connection', socket => {
    let socketId = socket.id.split('#')[1]

    socket.on('build', async data => {
      try {
        const { userId, historyId } = data
        const addNoticeSql = 'insert into notice (room, user_id, history_id, socket_id) values (?, ?, ?, ?)'
        const addNoticeParams = ['status', userId, historyId, socketId]

        await query(addNoticeSql, addNoticeParams)
      } catch (err) {
        console.log('add status notice err', err.message)
      }
    })

    socket.on('disconnect', async () => {
      try {
        const removeNoticeSql = 'delete from notice where room = "status" and socket_id = ?'
        const removeNoticeParams = [socketId]

        await query(removeNoticeSql, removeNoticeParams)
      } catch (err) {
        console.log('remove status notice err', err.message)
      }
    })
  })

const sendMessage = async (eventName, data = null, historyId = null) => {
  if (!historyId) {
    statusRoom.emit(eventName, data)
    return
  }

  const searchSocketSql = 'select socket_id from notice where room = "status" and history_id = ?'
  const results = await query(searchSocketSql, historyId)

  if (results.length) {
    results.forEach(result => {
      io.to(result.socket_id).emit('updateStatus', data)
    })
  }
}

export { sendMessage }

export default statusRoom
